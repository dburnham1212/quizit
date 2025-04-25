const express = require("express");
const server = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Models
const Quiz = require("./models/quiz");
const User = require("./models/user");
const Token = require("./models/token");

const port = 8080;

const { DB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors(corsOptions));
server.use(methodOverride("_method"));

mongoose
    .connect(DB_URI)
    .then(() => {
        server.listen(port, () => {
            console.log(`DB connected \n listening on port ${port}`);
        });
    })
    .catch((error) => console.log(error));

server.get("/quizzes", async (request, response) => {
    const quizzes = await Quiz.find();
    response.json(quizzes);
});

server.post("/token", (request, response) => {
    console.log(JSON.stringify(request.cookies));
    // const refreshToken = request.body.token;
    // if (refreshToken === null) return response.status(401).send({ jwtError: "Access forbidden" });
});

server.post("/login", async (request, response) => {
    const { body } = request;
    console.log(body);
    try {
        // Check if the username already exists in DB
        const foundUser = await User.findOne({ username: body.username });
        if (!foundUser) return response.status(401).send({ error: "Invalid Credentials" });
        // Encrypt the password
        const match = await bcrypt.compare(body.password, foundUser.password);
        if (!match) return response.status(401).send({ error: "Invalid Credentials" });

        // Create json web token (access token)
        let accessToken = jwt.sign(
            {
                username: foundUser.username,
                email: foundUser.email,
            },
            JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        // Create json web token (refresh token)
        let refreshToken = jwt.sign(
            {
                username: foundUser.username,
                email: foundUser.email,
            },
            JWT_REFRESH_SECRET
        );

        response.cookie("qiRefreshToken", refreshToken, {
            httpOnly: true,
        });

        response.status(200).json({
            success: true,
            data: {
                accessToken: accessToken,
            },
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: "Internal server error" });
    }
});

server.post("/register", async (request, response) => {
    const { body } = request;

    // First make sure the passwords match
    if (body.password !== body.confirmPassword) {
        return response.status(401).send({ error: "Password and password confirmation did not match" });
    }

    try {
        // Check if the username already exists in DB
        const foundUserWithUsername = await User.find({ username: body.username });
        if (foundUserWithUsername.length) {
            return response.status(401).send({ error: `User with username ${body.username} already exists` });
        }

        // Check if email already exists in DB
        const foundUserWithEmail = await User.find({ email: body.email });
        if (foundUserWithEmail.length) {
            return response.status(401).send({ error: `User with email ${body.email} already exists` });
        }

        // Encrypt the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        // Otherwise create the new user
        const newUser = new User({
            username: body.username,
            email: body.email,
            password: hashedPassword,
        });
        await newUser.save();

        // Create json web token (access token)
        let accessToken = jwt.sign(
            {
                username: body.username,
                email: body.email,
            },
            JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        // Create json web token (refresh token)
        let refreshToken = jwt.sign(
            {
                username: body.username,
                email: body.email,
            },
            JWT_REFRESH_SECRET
        );

        // Send the response back to the client
        response.cookie("qiRefreshToken", refreshToken, {
            httpOnly: true,
        });

        response.status(200).json({
            success: true,
            data: {
                accessToken: accessToken,
            },
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ error: "User cannot be created" });
    }
});

const express = require("express");
const server = express();
const mongoose = require("mongoose");
const Quiz = require("./models/quiz");
const methodOverride = require("method-override");
require("dotenv").config();
const cors = require("cors");
const port = 8080;

const { DB_URI } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
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

server.post("/login", async (request, response) => {});

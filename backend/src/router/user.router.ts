import { Router } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { HTTP_BAD_REQUEST } from '../constants/http_status';

const router = Router();

router.post("/login", asyncHandler(
  async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));

    } else {
      res.status(HTTP_BAD_REQUEST).send("Username or password is not valid!");
    }
  }
))

router.post("/register", asyncHandler(
  async (req, res) => {
    console.log("register reached");
    const {username, email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user) {
      res.status(HTTP_BAD_REQUEST)
      .send('User already exists, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: '',
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    }

    const dbUser = await UserModel.create(newUser);

    res.send(generateTokenResponse(dbUser));
  }
))

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({
    id: user.id, email: user.email 
  }, 
  process.env.JWT_SECRET!, 
  { expiresIn: '30d'});

  return {...user.toObject(), token};
}

export default router;
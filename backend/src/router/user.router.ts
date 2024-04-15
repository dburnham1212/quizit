import { Router } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


const router = Router();

router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
  }
))

router.post("/register", asyncHandler(
  async (req, res) => {

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
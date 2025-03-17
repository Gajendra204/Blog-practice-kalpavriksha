import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;
const TOKEN_EXPIRATION = '1h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing');
}

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

const sendErrorResponse = (res: Response, status: number, message: string, error?: any) => {
  console.error(message, error || '');
  res.status(status).json({ message });
};

// **User Registration**
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    sendErrorResponse(res, 400, 'All fields are required');
    return;
  }

  try {
    if (await User.findOne({ email })) {
      sendErrorResponse(res, 400, 'User already exists');
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    sendErrorResponse(res, 500, 'Registration failed', err);
  }
};

// **User Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    sendErrorResponse(res, 400, 'Email and password are required');
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      sendErrorResponse(res, 401, 'Invalid credentials');
      return;
    }

    const token = generateToken(user._id as unknown as string);
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    sendErrorResponse(res, 500, 'Login failed', err);
  }
};

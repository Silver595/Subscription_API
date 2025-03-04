import { Router } from 'express';
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

const authRouter = new Router();

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();  // Start transaction
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            const error = new Error("User already exists");
            error.status = 409;
            return next(error);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save({ session });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            data: {
                token,
                user: newUser,
            }
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password',
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password',
            })
        }
        const token = jwt.sign({userId:user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).send({
            success: true,
            message: 'Successfully sign in',
            data: {
                token,
                user,
            }
        })
    }catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {}

export default authRouter;

import User from "../models/user";
import { Response, Request, NextFunction } from "express";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json({message: `New User: ${name} created successfully`, user: newUser});
    } catch (error) {
        next(error);
    }
}

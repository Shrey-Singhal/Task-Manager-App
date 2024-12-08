import Task from "../models/task";
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

export const addUserTask = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;
    const { title, description, status, dueDate } = req.body;
    
    try {
        const user = await User.findById(userId);
        const newTask = new Task({
            title,
            description,
            status,
            dueDate
        });
        await newTask.save();

        user?.tasks?.push(newTask._id);
        await user?.save();

        res.status(201).json({
            message: "Task created and added to user successfully",
            task: newTask,
            user,
        });
        
    } catch (error) {
        next(error);
    }
}
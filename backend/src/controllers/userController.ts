import Task from "../models/task";
import User from "../models/user";
import { Response, Request, NextFunction } from "express";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
}

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
// adds a task in the Task collection in mongo db and appends the task id to the tasks list in 
// user model which acts as a reference to the task.
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

export const getUserTasks = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try{
        const user = await User.findById(userId).populate("tasks");

        res.status(200).json(user?.tasks);
    } catch (error) {
        next(error);
    }
}
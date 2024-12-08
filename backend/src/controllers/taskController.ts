import { Request, Response } from "express";
import Task from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find();
    res.json(tasks);
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({message: `Task - ${task.title} successfully added`});
    }
    catch {
        res.status(500).json({error: "Failed to create the task"});
    }    
}
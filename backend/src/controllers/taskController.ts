import { NextFunction, Request, Response } from "express";
import Task from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find();
    res.json(tasks);
}

// this endpoint can be used by the admin or for testing. Not using it for this task.
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({message: `Task - ${task.title} successfully added`});
    }
    catch (error) {
        next(error);
    }    
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(404).json({message: "Task not found or deleted already"});
        }
        res.status(201).json({message: "Task deleted successfully"});
    }catch (error) {
        next(error);
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const updates = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,   // validate updates against the schema
        })
    
        res.status(202).json({
            message: "Task updated successfully", 
            data: updatedTask
        })
    }
    catch (error) {
        next(error);
    }    
    
}
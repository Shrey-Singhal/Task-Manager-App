import mongoose from "mongoose";

export interface ITask {
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Completed";
    dueDate: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
    title: {type: String, required: true},
    description: {type: String},
    status: {type: String, required: true, enum: ["To Do", "In Progress", "Completed"]},
    dueDate: {type: Date, required: true}
})

export default mongoose.model<ITask>("Task", taskSchema);


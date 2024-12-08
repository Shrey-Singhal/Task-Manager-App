import mongoose from "mongoose";
export interface IUser {
    name: string;
    email: string;
    password: string;
    tasks: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tasks: [{type: mongoose.Types.ObjectId, ref: "Task"}]
})

export default mongoose.model<IUser>("Users", userSchema);
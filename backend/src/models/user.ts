import mongoose from "mongoose";
export interface IUser {
    name: string;
    email: string;
    password: string;
    tasks: mongoose.Types.ObjectId[]; // array of object ID's referencing Task collection
}

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // ref property below defines a relationship between user and task collection in mongodb
    tasks: [{type: mongoose.Types.ObjectId, ref: "Task"}] 
})

export default mongoose.model<IUser>("Users", userSchema);
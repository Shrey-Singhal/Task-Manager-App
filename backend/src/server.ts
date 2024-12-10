
import mongoose from "mongoose";
import app from "./app"
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("server running on port", port);
        })
    })
    .catch(console.error);


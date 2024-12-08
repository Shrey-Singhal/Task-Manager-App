import express, {NextFunction, Request, Response} from "express";
import "dotenv/config";
//import Task from "./models/Task";
import taskRoutes from "./routes/taskRoutes"
import userRoutes from "./routes/userRoutes"

const app = express()

// Middleware
app.use(express.json()); // Parse JSON requests

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(500).json({
        message: "An error occurred",
        error: err.message,
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
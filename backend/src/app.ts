import express from "express";
import "dotenv/config";
//import Task from "./models/Task";
import taskRoutes from "./routes/taskRoutes"

const app = express()

// Middleware
app.use(express.json()); // Parse JSON requests
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
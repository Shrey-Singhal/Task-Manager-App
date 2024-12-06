import express from "express";
import "dotenv/config";

const app = express()

// Middleware
app.use(express.json()); // Parse JSON requests

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;
import express from "express";
import cors from "cors";

import AuthRoutes from "./routes/AuthRoutes.js"
import InternRoutes from "./routes/InternRoutes.js"
import ProgramRoutes from "./routes/ProgramRoutes.js"
import TaskRoutes from "./routes/TaskRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/test", (req, res) => {
    res.send("Backend is running.")
})

app.use("/api/auth", AuthRoutes);
app.use("/api/interns", InternRoutes);
app.use("/api/programs", ProgramRoutes)
app.use("/api/tasks", TaskRoutes)

export default app;
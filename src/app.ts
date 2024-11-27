import express from "express";
import { ErrorHandler } from "./middleware";
import TaskRoutes from "./presentation/routes/TaskRoutes";

const app = express();

app.use(express.json());
app.use("/tasks", TaskRoutes);

app.use(ErrorHandler);
export default app;

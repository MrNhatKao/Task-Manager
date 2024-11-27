import { Router } from "express";
import { TaskController } from "../controllers";

const router = Router();

const taskController = new TaskController();

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);

export default router;

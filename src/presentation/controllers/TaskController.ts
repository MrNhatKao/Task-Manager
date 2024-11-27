import { NextFunction, Request, Response } from "express";
import { TaskUsecaseImpl } from "../../business/usecases";
import { TaskRepositoryImpl } from "../../data/localDB";

export class TaskController {
  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) {
        throw new Error("Invalid input");
      }

      const { name, description, completed } = req.body;

      const TaskRepository = new TaskRepositoryImpl();
      const TaskUsecase = new TaskUsecaseImpl(TaskRepository);

      const result = await TaskUsecase.createTask({
        name,
        description,
        completed,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const TaskRepository = new TaskRepositoryImpl();
      const TaskUsecase = new TaskUsecaseImpl(TaskRepository);

      const result = await TaskUsecase.getTasks();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

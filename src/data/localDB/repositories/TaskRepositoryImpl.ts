import { Task, TaskRepository } from "../../../core";
import {
  CreateTaskInputRepo,
  CreateTaskOutputRepo,
  GetTasksOutputRepo,
} from "../../../core/repositories/dtos";

let tasks: Task[] = [];

export class TaskRepositoryImpl implements TaskRepository {
  createTask(input: CreateTaskInputRepo): Promise<CreateTaskOutputRepo> {
    const task = new Task({
      name: input.name,
      description: input.description,
      completed: false,
    });
    tasks.push(task);

    return Promise.resolve({ task });
  }

  getTasks(): Promise<GetTasksOutputRepo> {
    return Promise.resolve({ tasks: tasks });
  }

  resetTasks(): void {
    tasks = [];
  }
}

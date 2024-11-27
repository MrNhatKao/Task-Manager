import {
  CreateTaskInputRepo,
  CreateTaskOutputRepo,
  GetTasksOutputRepo,
} from "./dtos";

export interface TaskRepository {
  createTask(input: CreateTaskInputRepo): Promise<CreateTaskOutputRepo>;
  getTasks(): Promise<GetTasksOutputRepo>;
}

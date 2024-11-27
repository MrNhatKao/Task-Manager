import { CreateTaskInput, CreateTaskOutput, GetTasksOutput } from "./dtos";

export interface TaskUsecase {
  createTask(input: CreateTaskInput): Promise<CreateTaskOutput>;
  getTasks(): Promise<GetTasksOutput>;
}

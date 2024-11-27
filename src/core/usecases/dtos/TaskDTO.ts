import { Task } from "../../models";

export interface CreateTaskInput {
  name: string;
  description: string;
  completed: boolean;
}

export interface CreateTaskOutput {
  task: Task;
}

export interface GetTasksOutput {
  tasks: Task[];
}

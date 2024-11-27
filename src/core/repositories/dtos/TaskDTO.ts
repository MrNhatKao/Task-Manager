import { Task } from "../../models";

export interface CreateTaskInputRepo {
  name: string;
  description: string;
  completed: boolean;
}

export interface CreateTaskOutputRepo {
  task: Task;
}

export interface GetTasksOutputRepo {
  tasks: Task[];
}

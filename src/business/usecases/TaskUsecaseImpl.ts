import { Task, TaskRepository, TaskUsecase } from "../../core";
import { CreateTaskInputRepo } from "../../core/repositories/dtos";
import {
  CreateTaskInput,
  CreateTaskOutput,
  GetTasksOutput,
} from "../../core/usecases/dtos";

export class TaskUsecaseImpl implements TaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(input: CreateTaskInput): Promise<CreateTaskOutput> {
    const createTaskInput: CreateTaskInputRepo = {
      name: input.name,
      description: input.description,
      completed: false,
    };

    const result = await this.taskRepository.createTask(createTaskInput);

    const createTaskOutput: CreateTaskOutput = {
      task: result.task,
    };

    return createTaskOutput;
  }

  async getTasks(): Promise<GetTasksOutput> {
    const result = await this.taskRepository.getTasks();

    const tasks = result.tasks.map((item) => {
      const { name, description, completed } = item;
      const task = new Task({ name, description, completed }, item.id);
      return task;
    });

    return { tasks };
  }
}

import { jest } from "@jest/globals";
import { Task, TaskRepository } from "../../../core";
import { CreateTaskInputRepo } from "../../../core/repositories/dtos";
import {
  CreateTaskInput,
  CreateTaskOutput,
  GetTasksOutput,
} from "../../../core/usecases/dtos";
import { TaskUsecaseImpl } from "../TaskUsecaseImpl";

const mockTaskRepository: jest.Mocked<TaskRepository> = {
  createTask: jest.fn(),
  getTasks: jest.fn(),
};

describe("TaskUsecaseImpl", () => {
  let taskUsecase: TaskUsecaseImpl;

  beforeEach(() => {
    jest.clearAllMocks();

    taskUsecase = new TaskUsecaseImpl(mockTaskRepository);
  });

  describe("createTask", () => {
    it("should create a task successfully", async () => {
      const input: CreateTaskInput = {
        name: "Test Task",
        description: "This is a test task",
        completed: false,
      };

      const repositoryInput: CreateTaskInputRepo = {
        name: "Test Task",
        description: "This is a test task",
        completed: false,
      };

      const createdTask = new Task(
        {
          name: "Test Task",
          description: "This is a test task",
          completed: false,
        },
        "1"
      );

      const repositoryOutput: CreateTaskOutput = {
        task: createdTask,
      };

      mockTaskRepository.createTask.mockResolvedValue(repositoryOutput);

      const result: CreateTaskOutput = await taskUsecase.createTask(input);

      expect(mockTaskRepository.createTask).toHaveBeenCalledWith(
        repositoryInput
      );
      expect(result).toEqual({ task: createdTask });
    });

    it("should throw an error if repository fails to create a task", async () => {
      const input: CreateTaskInput = {
        name: "Test Task",
        description: "This is a test task",
        completed: false,
      };

      const repositoryInput: CreateTaskInputRepo = {
        name: "Test Task",
        description: "This is a test task",
        completed: false,
      };

      mockTaskRepository.createTask.mockRejectedValue(
        new Error("Database Error")
      );

      // Act & Assert
      await expect(taskUsecase.createTask(input)).rejects.toThrow(
        "Database Error"
      );
      expect(mockTaskRepository.createTask).toHaveBeenCalledWith(
        repositoryInput
      );
    });
  });

  describe("getTasks", () => {
    it("should retrieve tasks successfully", async () => {
      const task1 = new Task(
        {
          name: "Task One",
          description: "First task",
          completed: false,
        },
        "1"
      );

      const task2 = new Task(
        {
          name: "Task Two",
          description: "Second task",
          completed: true,
        },
        "2"
      );

      const repositoryOutput = {
        tasks: [task1, task2],
      };

      mockTaskRepository.getTasks.mockResolvedValue(repositoryOutput);

      const expectedOutput: GetTasksOutput = {
        tasks: [task1, task2],
      };

      const result: GetTasksOutput = await taskUsecase.getTasks();

      expect(mockTaskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual(expectedOutput);
    });

    it("should throw an error if repository fails to retrieve tasks", async () => {
      mockTaskRepository.getTasks.mockRejectedValue(
        new Error("Database Error")
      );

      await expect(taskUsecase.getTasks()).rejects.toThrow("Database Error");
      expect(mockTaskRepository.getTasks).toHaveBeenCalled();
    });

    it("should return an empty tasks array if no tasks are present", async () => {
      const repositoryOutput = {
        tasks: [],
      };

      mockTaskRepository.getTasks.mockResolvedValue(repositoryOutput);

      const expectedOutput: GetTasksOutput = {
        tasks: [],
      };

      const result: GetTasksOutput = await taskUsecase.getTasks();

      expect(mockTaskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual(expectedOutput);
    });
  });
});

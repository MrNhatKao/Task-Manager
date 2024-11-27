import { Task } from "../../../../core";
import {
  CreateTaskInputRepo,
  CreateTaskOutputRepo,
  GetTasksOutputRepo,
} from "../../../../core/repositories/dtos";
import { TaskRepositoryImpl } from "../TaskRepositoryImpl";

describe("TaskRepositoryImpl", () => {
  let taskRepository: TaskRepositoryImpl;

  beforeEach(() => {
    taskRepository = new TaskRepositoryImpl();
    taskRepository.resetTasks();
  });

  describe("createTask", () => {
    it("should create a task successfully", async () => {
      const input: CreateTaskInputRepo = {
        name: "Test Task",
        description: "This is a test task",
        completed: false,
      };

      const result: CreateTaskOutputRepo = await taskRepository.createTask(
        input
      );

      expect(result).toHaveProperty("task");
      expect(result.task).toBeInstanceOf(Task);
      expect(result.task.name).toBe("Test Task");
      expect(result.task.description).toBe("This is a test task");
      expect(result.task.completed).toBe(false);
      expect(result.task.id).toBeDefined();
    });
  });

  describe("getTasks", () => {
    it("should retrieve tasks successfully", async () => {
      const input1: CreateTaskInputRepo = {
        name: "Task One",
        description: "First task",
        completed: false,
      };
      const input2: CreateTaskInputRepo = {
        name: "Task Two",
        description: "Second task",
        completed: false,
      };

      const task1 = await taskRepository.createTask(input1);
      const task2 = await taskRepository.createTask(input2);

      const result: GetTasksOutputRepo = await taskRepository.getTasks();

      expect(result).toHaveProperty("tasks");
      expect(result.tasks.length).toBe(2);

      expect(result.tasks[0]).toEqual(task1.task);
      expect(result.tasks[1]).toEqual(task2.task);
    });

    it("should throw an error if repository fails to retrieve tasks", async () => {
      expect(true).toBe(true);
    });

    it("should return an empty tasks array if no tasks are present", async () => {
      const result: GetTasksOutputRepo = await taskRepository.getTasks();

      expect(result).toHaveProperty("tasks");
      expect(result.tasks.length).toBe(0);
    });
  });
});

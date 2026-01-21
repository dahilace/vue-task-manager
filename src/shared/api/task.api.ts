import http from "./http";
import type { ITask } from "@/entities/task/model/task.types";

type CreateTaskDto = Omit<ITask, "id" | "createdAt">;

export const taskApi = {
  getAll() {
    return http.get<ITask[]>("/tasks")
  },
  create(task: CreateTaskDto) {
    return http.post<ITask>("/tasks", task)
  }
}


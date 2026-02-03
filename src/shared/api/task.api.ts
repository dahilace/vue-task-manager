import http from './http'
import type { ITask } from '@/entities/task/model/task.types'

type CreateTaskDto = Omit<ITask, 'id'>

export const taskApi = {
  getAll() {
    return http.get<ITask[]>('/tasks')
  },
  create(task: CreateTaskDto) {
    return http.post<ITask>('/tasks', task)
  },
  delete(id: string) {
    // return http.delete(`/tasks/${id}`,)
    return http.delete(`/tasks/${id}`,)
  }
}


import http from './http'
import type { ITask } from '@/entities/task/model/task.types'

type CreateTaskDto = Omit<ITask, 'id'>

export const taskApi = {
  async getAll() {
    return http.get<ITask[]>('/tasks')
  },
  async create(task: CreateTaskDto) {
    return http.post<ITask>('/tasks', task)
  },
  async delete(id: string) {
    return http.delete(`/tasks/${id}`,)
  },
  async deleteAll(projectId: string) {
    const { data } = await http.get<ITask[]>('/tasks/?projectId=' + projectId)
    return Promise.all(
      data.map(task => http.delete(`/tasks/${task.id}`))
    )
  }
}

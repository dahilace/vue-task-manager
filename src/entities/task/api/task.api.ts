import { taskApi } from '@/shared/api/task.api'

export const createTask = async (title: string, projectId: string) => {
  const task = { title, isCompleted: false, createdAt: new Date().toISOString(), projectId }
  const { data } = await taskApi.createTask(task)
  return data
}

export const deleteTask = async (id: string): Promise<void> => {
  await taskApi.deleteTask(id)
}

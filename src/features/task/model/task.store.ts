import { defineStore } from 'pinia'
import type { ITask, ITaskState } from '@/entities/task/model/task.types'
import http from '@/shared/api/http'
import { taskApi } from '@/shared/api/task.api'

export const useTaskStore = defineStore('tasks', {
  state: (): ITaskState => ({
    tasks: [] as ITask[],
    isLoading: false,
    error: null,
    isCreatingTask: false,
  }),

  actions: {
    async fetchByProjectId(projectId: number) {
      this.isLoading = true

      this.error = null
      try {
        const { data } = await http.get<ITask[]>('/tasks/?projectId=' + projectId)
        this.tasks = data
      } catch (e) {
        this.error = 'Fetch failed | ' + e
      } finally {

        this.isLoading = false
      }
    },
    async createTask(title: string) {
      this.isCreatingTask = true

      const { data } = await taskApi.create({
        title,
        isCompleted: false,
      })
      this.tasks.push(data)

      this.isCreatingTask = false
    },
    clearTasks() {
      this.tasks = []
    },
  },
})

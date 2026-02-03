import { defineStore } from 'pinia'
import type { ITask, ITaskState } from '@/entities/task/model/task.types'
import http from '@/shared/api/http'
import { createTask, deleteTask } from '@/entities/task/api/task.api'

export const useTaskStore = defineStore('tasks', {
  state: (): ITaskState => ({
    tasks: [] as ITask[],
    isLoading: false,
    error: null,
    isCreatingTask: false,
  }),

  actions: {
    async fetchByProjectId(projectId: string) {
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

    async createTaskOptimistic(title: string, projectId: string) {
      this.isCreatingTask = true

      const tempId = Date.now().toString()
      const optimisticTask: ITask = {
        id: tempId,
        title,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        projectId: projectId,
        isOptimistic: true,
      }

      this.tasks.push(optimisticTask)

      try {
        const realTask = await createTask(title, projectId)
        const index = this.tasks.findIndex((task) => task.id === tempId)
        if (index !== -1) {
          this.tasks[index] = realTask
        }
      } catch (e) {
        this.tasks = this.tasks.filter((task) => task.id !== tempId)
        this.error = 'Task creation failed | ' + e
      }

      this.isCreatingTask = false
    },

    async deleteTaskOptimistic(id: string) {
      const index = this.tasks.findIndex(t => t.id === id)
      // console.log(index);

      if (index === -1) return

      const removedTask = this.tasks[index] as ITask
      this.tasks.splice(index, 1)

      try {
        await deleteTask(id)
      } catch (e) {
        this.tasks.splice(index, 0, removedTask)
        this.error = 'Unable to remove task: ' + e
      }
    },

    clearTasks() {
      this.tasks = []
    },
  },
})

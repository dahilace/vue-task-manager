import { defineStore } from 'pinia'
import http from '@/shared/api/http'
import type { IProject, IProjectState } from '@/entities/project/model/project.types'
import { createProject, deleteProject } from '../api/project.api'
import { taskApi } from '@/shared/api/task.api'


export const useProjectStore = defineStore('projects', {
  state: (): IProjectState => ({
    projects: [],
    isLoading: false,
    error: null,
    isCreatingProject: false,
  }),
  actions: {
    async fetchProjects() {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await http.get<IProject[]>('/projects')
        this.projects = data
      } catch (e) {
        this.error = 'Fetch failed | ' + e
      } finally {
        this.isLoading = false
      }
    },

    async createProjectOptimistic(title: string, description: string) {
      this.isCreatingProject = true
      const tempId = Date.now().toString()

      const tempProject: IProject = {
        id: tempId,
        title,
        description,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      }

      this.projects.push(tempProject)

      try {
        const realProject = await createProject(title, description)
        const index = this.projects.findIndex((project) => project.id === tempId)
        if (index !== -1) {
          this.projects[index] = realProject
        }
      } catch (e) {
        this.projects = this.projects.filter((project) => project.id !== tempId)
        this.error = 'Failed to fetch: ' + e
      }

      this.isCreatingProject = false
    },

    async deleteProjectOptimistic(id: string) {
      const index = this.projects.findIndex(p => p.id === id)
      if (index === -1) return

      const removedProject = this.projects[index] as IProject
      this.projects.splice(index, 1)

      try {
        await taskApi.deleteAll(id)
        await deleteProject(id)
      }
      catch (e) {
        this.projects.splice(index, 0, removedProject)
        this.error = 'Unable to remove project ' + e
      }
    }
  },
})

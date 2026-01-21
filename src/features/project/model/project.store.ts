import { defineStore } from 'pinia'
import http from '@/shared/api/http'
import type { IProject, IProjectState } from '../../../entities/project/model/project.types'

export const useProjectStore = defineStore('projects', {
  state: (): IProjectState => ({
    projects: [],
    isLoading: false,
    error: null,
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
  },
})

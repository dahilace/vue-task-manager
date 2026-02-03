import http from "./http";
import type { IProject } from "@/entities/project/model/project.types";

type CreateProjectDto = Omit<IProject, 'id'>

export const projectApi = {
  getAll() {
    return http.get<IProject[]>('/projects')
  },
  create(project: CreateProjectDto) {
    return http.post<IProject>('/projects', project)
  },
  delete(id: string) {
    return http.delete<IProject>(`/projects/${id}`)
  }
}

import { projectApi } from "@/shared/api/project.api";
import type { IProject } from "../model/project.types";

export const createProject = async (title: string, description: string) => {
  const project: Omit<IProject, 'id'> = { title, description, createdAt: new Date().toISOString() }
  const { data } = await projectApi.create(project)

  return data
}

export const deleteProject = async (id: string) => {
  await projectApi.delete(id)
}

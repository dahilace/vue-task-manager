export interface IProject {
  id: string
  title: string
  description: string
  createdAt: string
  isOptimistic?: boolean
}

export interface IProjectState {
  projects: IProject[]
  isLoading: boolean
  error: string | null
  isCreatingProject: boolean
}

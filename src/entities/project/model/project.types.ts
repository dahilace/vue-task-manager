export interface IProject {
  id: number
  name: string
  description: string
}

export interface IProjectState {
  projects: IProject[]
  isLoading: boolean
  error: string | null
}

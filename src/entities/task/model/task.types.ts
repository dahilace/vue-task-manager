export interface ITask {
  id: number
  projectId?: number
  title: string
  isCompleted: boolean
  description?: string
  createdAt: string
}

export interface ITaskState {
  tasks: ITask[]
  isLoading: boolean
  error: string | null
  isCreatingTask: boolean
}

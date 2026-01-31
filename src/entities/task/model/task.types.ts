export interface ITask {
  id: string
  projectId: string
  title: string
  description?: string
  isCompleted: boolean
  isOptimistic?: boolean
  createdAt: string
}

export interface ITaskState {
  tasks: ITask[]
  isLoading: boolean
  error: string | null
  isCreatingTask: boolean
}

import { createContext, FC, ReactNode, useState } from 'react'
import { TaskData } from '../interfaces/task.interface.ts'
import { randomId } from '@mui/x-data-grid-generator'

interface TaskContextType {
  tasks: TaskData[]
  setTasks: (tasks: TaskData[]) => void
  selectedRowId: string | null
  setSelectedRowId: (id: string | null) => void
}

interface TaskContextProviderProps {
  children: ReactNode
}

const INITIAL_ROWS: TaskData[] = [
  {
    id: randomId(),
    taskName: '',
    dimension: '',
    templateId: '',
    images: [],
    text: ['TextLayer'],
    amount: 1,
    genType: ''
  }
]

export const TasksContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
  selectedRowId: null,
  setSelectedRowId: () => {}
})

export const TasksProvider: FC<TaskContextProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskData[]>(INITIAL_ROWS)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, selectedRowId, setSelectedRowId }}
    >
      {children}
    </TasksContext.Provider>
  )
}

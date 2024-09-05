import './App.css'
import HomePage from './pages/HomePage.tsx'
import { TasksProvider } from './context/tasks-context.tsx'

function App() {
  return (
    <TasksProvider>
      <HomePage />
    </TasksProvider>
  )
}

export default App

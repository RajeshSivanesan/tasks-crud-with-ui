import './App.css'
import { ProvideAuth } from './context/ProvideAuth'
import HomePage from './pages'

function App() {
  return (
    <>
      <ProvideAuth>
        <h1>Task Manager</h1>
        <HomePage />
      </ProvideAuth>
    </>
  )
}

export default App

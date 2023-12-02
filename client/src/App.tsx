import './App.css'
import { ProvideAuth } from './context/ProvideAuth'
import HomePage from './pages'

function App() {
  return (
    <>
      <ProvideAuth>
        <HomePage />
      </ProvideAuth>
    </>
  )
}

export default App

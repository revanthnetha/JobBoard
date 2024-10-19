import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'
import Appbar from './components/Appbar'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    <Appbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

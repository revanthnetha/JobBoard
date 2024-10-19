import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'
import Appbar from './components/Appbar'

function App() {

  return (
    <>
    <Appbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

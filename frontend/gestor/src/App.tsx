import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import RegisterForm from './components/form/RegisterForm'
import LoginForm from './components/form/LoginForm'
import PrivateRoutes from './components/privateRoutes/PrivateRoutes'
import Layout from './components/layout/Layout'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route
          path='/'
          element={
            <PrivateRoutes>
              <Layout>

              </Layout>
            </PrivateRoutes>
          }
        />
        
      </Routes>

    </Router>
  )
}

export default App

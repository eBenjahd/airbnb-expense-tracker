import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'
import RegisterForm from './components/form/RegisterForm'
import LoginForm from './components/form/LoginForm'
import PrivateRoutes from './components/privateRoutes/PrivateRoutes'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import Expenses from './pages/expenses/Expenses'
import Reports from './pages/reports/Reports'
import Settings from './pages/settings/Settings'
import Help from './pages/help/Help'
import PublicRoutes from './components/publicRoutes/PublicRoutes'
import { CategoryProvider } from './context/CategoryContext'

function App() {


  return (
    <Router>
      <Routes>
        
        {/* Public */}
        <Route>
          <Route 
            path='/register' 
            element={
              <PublicRoutes>
                <RegisterForm/>
              </PublicRoutes>
            }/>
          <Route 
            path='/login' 
            element={
              <PublicRoutes>
                <LoginForm/>
              </PublicRoutes>
            }/>
        </Route>

        {/* Private */}
        <Route
          path='/'
          element={
            <PrivateRoutes>
              <CategoryProvider>
                <Layout />
              </CategoryProvider>
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />}/>
          <Route path='expenses' element={<Expenses />}/>
          <Route path='reports' element={<Reports />}/>
          <Route path='settings' element={<Settings />}/>
          <Route path='help' element={<Help />}/>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </Router>
  )
}

export default App

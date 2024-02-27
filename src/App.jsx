import React from 'react'
import { MainRoutes } from './routes/main.jsx'
import { AuthProvider } from './auth_context/index.jsx'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App

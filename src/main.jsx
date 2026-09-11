import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Toast } from '@heroui/react'
import router from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Toast.Provider placement="top end" />
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)

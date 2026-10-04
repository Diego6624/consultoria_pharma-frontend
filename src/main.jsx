import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Toast } from '@heroui/react'
import router from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Toast.Provider placement="top end" />
      <Suspense fallback={<div className="min-h-screen" aria-label="Cargando página" />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  </StrictMode>,
)

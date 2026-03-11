import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Portfolio from './App.jsx'
import AiProjects from './AiProjects.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

const router = createBrowserRouter([
  { path: "/", element: <Portfolio /> },
  { path: "/ai-projects", element: <AiProjects /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </React.StrictMode>,
)

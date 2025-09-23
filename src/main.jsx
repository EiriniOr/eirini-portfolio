import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Portfolio from './App.jsx'
import AiProjects from './AiProjects.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: "/", element: <Portfolio /> },
  { path: "/ai-projects", element: <AiProjects /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

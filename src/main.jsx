import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Routers/index.jsx'
import { ThemeProvider  } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

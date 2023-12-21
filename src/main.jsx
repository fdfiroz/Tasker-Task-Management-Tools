import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Routers/index.jsx'
import { ThemeProvider  } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './providers/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <HelmetProvider>
      <RouterProvider router={routes} />
        </HelmetProvider>
        </AuthProvider>
      <Toaster/>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

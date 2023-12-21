import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ContactUs from "../pages/ContactUs"
import DashboardLayout from "../layouts/DashboardLayout"
import Tasks from "../pages/Tasks"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage/>,
        children:[
            {
                path: "*",
                element:<ErrorPage/>,
            },
            {
                index: true,
                element: <Home />,
            },
            {
              path: '/contact-us',
              element: <ContactUs />,
            },
            {
              path: '/dashboard',
              element: <DashboardLayout />,
              children: [
                {
                  index: true,
                  element: <Tasks/>,
                },
              ]
            }
              
        ]
    },
    {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
])

export default routes
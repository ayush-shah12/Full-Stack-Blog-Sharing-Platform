import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import CreatePost from './CreatePost.jsx'
import { UserContextProvider } from './UserContext.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//routing
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/createPost", element: <CreatePost /> }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>

    <RouterProvider router={router} />

  </UserContextProvider>
)

import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import CreatePost from './CreatePost.jsx'
import PostPage from "./PostPage.jsx"
import UserPage from "./UserPage.jsx"
import { UserContextProvider } from './UserContext.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//routing
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/createPost", element: <CreatePost /> },
  {path:"/posts/:postID", element: <PostPage/>},
  {path:"/users/:userID", element: <UserPage/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>

    <RouterProvider router={router} />

  </UserContextProvider>
)

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from '../App.jsx';
import '../styles/index.css';
import CreatePost from '../pages/CreatePost.jsx';
import EditPage from "../pages/EditPage.jsx";
import Login from '../pages/Login.jsx';
import PostPage from "../pages/PostPage.jsx";
import Register from "../pages/Register.jsx";
import UserPage from "../pages/UserPage.jsx";

//routing
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/createPost", element: <CreatePost /> },
  {path:"/posts/:postID", element: <PostPage/>},
  {path:"/users/:userID", element: <UserPage/>},
  {path:"/edit/:postID", element: <EditPage/>}
])

export default function RoutesProvider(){
    return <RouterProvider router={router}/>
}
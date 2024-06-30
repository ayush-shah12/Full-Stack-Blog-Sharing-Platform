import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import Post from "./Post.jsx"
import Header from "./Header.jsx"
import FetchPost from './FetchPost.jsx'

//basically the starting point(for now), might change later to be a landing page where users can choose to login/sign up, then it'll direct to the actual blog pages
//so then users can't see anything unless signed in

const App = () => {

  return (
    <main>
     <Header/>
     <FetchPost/>
    </main>
  )

}
export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import Post from "./Post.jsx"
import Header from "./Header.jsx"
import FetchPost from './FetchPost.jsx'

const App = () => {

  return (
    <div>
     <Header/>
     <FetchPost/>
    </div>
  )

}
export default App;

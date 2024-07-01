import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


const Header = () => {

  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);


  function handleLogout() {
    fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/logout`, {
      credentials: "include",
      method: "POST"
    });

    setUserInfo(null);
    
  }
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/profile`,{
      credentials: "include"
    })
    .then(response => response.json()
    .then(userInfo => setUserInfo(userInfo)))
    }, []);

  const username = userInfo?.user;  

  return (
    <header style={{ display: "flexbox", top: "20%", padding: "20px" }}>

      <Link to="/">
        <button style={{ positon: "absolute", left: "10%", top: "3%", }}>Blogs by Ayush</button>
      </Link>


      {username && (
        <>
          <a style={{ position: "absolute", left: "80%", top: "3%" }}>Welcome {username}</a>

          <Link to="/createPost">
            <button style={{ positon: "absolute", left: "90%", top: "3%", }}>Create</button>
          </Link>

          <a onClick={handleLogout} style={{ position: "absolute", left: "95%", top: "3%" }}>Logout</a>
        </>
      )
      }

      {!username && (
        <>
          <Link to="/login">
            <button style={{ positon: "absolute", left: "80%", top: "3%" }}>Login</button>
          </Link>

          <Link to="/register">
            <button style={{ positon: "absolute", left: "90%", top: "3%" }}>Register</button>
          </Link>
        </>
      )}

    </header>
  )
}

export default Header;
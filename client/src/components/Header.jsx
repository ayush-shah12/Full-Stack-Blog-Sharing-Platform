/* Dynamic Header */
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext.jsx";
import "../styles/index.css";
import "../styles/Header.css";
import { getProfile, logout } from "../api/auth.js";


const Header = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);


    function handleLogout() {
        logout();
        setUserInfo(null);

    }
    useEffect(() => {
        const response = getProfile()
            .then(response => response.json()
                .then(userInfo => setUserInfo(userInfo)))
    }, []);

    const username = userInfo?.user;
    const firstName = username?.split(" ")[0];

    return (
        <header className="header">

            <Link to="/">
                <button className="button_home">Blogs by Ayush</button>
            </Link>

            {username && (
                <>
                    <a className="button_loginwelcome">Welcome {firstName}</a>

                    <Link to="/createPost">
                        <button className="button_createregister">Create</button>
                    </Link>

                    <a onClick={handleLogout} className="button_logout">Logout</a>
                </>
            )
            }

            {!username && (
                <>
                    <Link to="/login">
                        <button className="button_loginwelcome">Login</button>
                    </Link>

                    <Link to="/register">
                        <button className="button_createregister">Register</button>
                    </Link>
                </>
            )}

        </header>
    )
}

export default Header;

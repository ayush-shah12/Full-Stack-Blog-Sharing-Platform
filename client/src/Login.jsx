/* Login Page */
import styles from "./Login.module.css"
import Header from "./Header"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { UserContext } from "./UserContext"
import { useContext } from "react"

const Login = () => {

    const navigate = useNavigate();

    const { setUserInfo } = useContext(UserContext);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }

    const handlePassChange = (event) => {
        setPass(event.target.value);
    }

    //preventing refresh, only way to submit is by pressing the button
    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    async function handleLogin(e) {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ user, pass }),
            headers: { "Content-Type": " application/json" },
            credentials: "include"  //jwt
        });

        const responseBody = await response;

        switch (responseBody.status) {
            case 200:
                responseBody.json().then(userInfo => setUserInfo(userInfo));
                setRedirect(true);
                break;

            case 300:
                alert("Incorrect Password");
                break;

            case 500:
                alert("Cannot Find Username");
                break;
        }
    }

    useEffect(() => {
        if (redirect) {
            navigate("/");
        }
    });

    return (
        <div className={styles.formContainer} onSubmit={handleLogin}>
            <Header />
            <form className={styles.form}>
                <input
                    onKeyDown={(e) => checkKeyDown(e)}
                    className={styles.field}
                    value={user}
                    placeholder="Enter Username"
                    onChange={handleUserChange}
                />
                <input
                    onKeyDown={(e) => checkKeyDown(e)}
                    className={styles.field}
                    type="password"
                    value={pass}
                    placeholder="Enter Password"
                    onChange={handlePassChange}
                />
                <button className={styles.button} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;

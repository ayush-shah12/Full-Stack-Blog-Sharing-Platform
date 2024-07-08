/* Registration Page */
import styles from "../styles/Login.module.css";
import Header from "../components/Header.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext/UserContext.jsx";
import { useEffect } from "react"
import { login, register } from "../api/auth.js";

const Register = () => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }

    const handlePassChange = (event) => {
        setPass(event.target.value);
    }

    //prevents submission by enter button
    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    //passes user,pass to backend
    async function handleRegister(e) {
        e.preventDefault();

        const responseBody = await register(user, pass);

        switch (responseBody.status) {
            case 201:
                handleLogin();
                break;
            case 422:
                alert("Username must be over 5 characters");
                break;
            case 400:
                alert("Username Already Exists");
                break;
            case 500:
                alert("Registration Failed. Try Again");
                break;
        }

    };


    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)
    const { setUserInfo } = useContext(UserContext)

    async function handleLogin() {
        const responseBody = await login(user, pass);

        switch (responseBody.status) {
            case 200:
                responseBody.json().then(userInfo => setUserInfo(userInfo));
                setRedirect(true);
                break;

            case 300:
                alert("Something went wrong when logging you in!");
                break;

            case 500:
                alert("Something went wrong when logging you in!");
                break;
        }
    }

    useEffect(() => {
        if (redirect) {
            navigate("/");
        }
    });

    return (
        <div className={styles.formContainer}>
            <Header />
            <form className={styles.form} onSubmit={handleRegister}>
                <input
                    onKeyDown={(e) => checkKeyDown(e)}
                    className={styles.field}
                    value={user}
                    placeholder="Create Username"
                    onChange={handleUserChange}
                />
                <input
                    onKeyDown={(e) => checkKeyDown(e)}
                    className={styles.field}
                    type="password"
                    value={pass}
                    placeholder="Create Password"
                    onChange={handlePassChange}
                />
                <button className={styles.button} type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;

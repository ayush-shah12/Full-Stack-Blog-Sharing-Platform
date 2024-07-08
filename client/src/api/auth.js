//Login.jsx
export async function login(user, pass) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ user, pass }),
        headers: { "Content-Type": " application/json" },
        credentials: "include"  //jwt
    });
    return response;
}
//Register.jsx
export async function register(user, pass) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ user, pass }),
        headers: { "Content-Type": " application/json" },

    });
    return response;
}

//Header.jsx
export async function getProfile() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/profile`, {
        credentials: "include"
    })

    return response;
}

//Header.jsx
export async function logout() {
    fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/logout`, {
        credentials: "include",
        method: "POST"
    });
}
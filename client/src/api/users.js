//UserPage.jsx
export async function getUserNameByID(thisUserID) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/name/${thisUserID}`, {
        method: "GET"
    });
    const data = await response.json();
    return data[0].user;
}
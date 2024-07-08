//FetchPost.jsx
export async function generatePosts() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/post`, {
        method: "GET"
    });
    const data = await response.json();
    return data;
}

//UserPage.jsx
export async function generatePostsByID(thisUserID) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/users/${thisUserID}`, {
        method: "GET"
    });
    const data = await response.json();
    return data;
}

//PostPage.jsx
export async function getPost(thisPostID) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/posts/${thisPostID}`);
    return response;
}

//CreatePost.jsx, EditPage.jsx
export async function create(data) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    });

    const a = await response;
    return a;
}

//EditPage.jsx
export async function getPostInfo(thisPostID){
    const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/edit/${thisPostID}`);
    return response;
}

//EditPage.jsx
export async function deletePost(thisPostID){
    const delResponse = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/delete`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: thisPostID })
    });
    return delResponse;
}


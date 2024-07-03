/* Individual User Page */
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import Post from "./Post";


const UserPage = () => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");

    const params = useParams();
    const thisUserID = params.userID;

    async function generatePosts() {
        const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/users/${thisUserID}`, {
            method: "GET"
        });
        const data = await response.json();
        setPosts(data);
    }

    async function getName() {
        const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/name/${thisUserID}`, {
            method: "GET"
        });
        const data = await response.json();
        setUser(data[0].user);
    }

    useEffect(() => {
        generatePosts();
        getName();
    }, []);

    return (
        <div styles={{ display: "flex", justifyContent: "center" }}>
            <Header />
            <h1 style={{ textAlign: "center" }}>Posts By {user}</h1>
            {posts.map(post =>
                <Post
                    key={post._id}
                    title={post.title}
                    imageURL={post.imageURL}
                    summary={post.summary}
                    author={post.author}
                    objectId={post._id}
                    authorID={post.authorID}
                />
            )}
        </div>
    )
}

export default UserPage;
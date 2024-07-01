import Post from "./Post";
import { useState, useEffect } from "react";

const FetchPost = () => {

    const [posts, setPosts] = useState([]);

    function dateFromObjectId(objectId) {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };


    async function generatePosts() {
        const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/post`, {
            method: "GET"
        });
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        generatePosts();
    }, []);

    return (
        <div>
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

export default FetchPost;


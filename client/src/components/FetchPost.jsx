/* Gets ALL Posts */
import Post from "./Post.jsx";
import { useState, useEffect } from "react";
import { generatePosts } from "../api/posts.js";

const FetchPost = () => {

    const [posts, setPosts] = useState([]);

    function dateFromObjectId(objectId) {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await generatePosts();
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
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


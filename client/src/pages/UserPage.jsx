/* Individual User Page */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Post from "../components/Post.jsx";
import { generatePostsByID } from "../api/posts.js";
import { getUserNameByID } from "../api/users.js";

const UserPage = () => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");

    const params = useParams();
    const thisUserID = params.userID;

    useEffect(() => {
        const getPostsByID = async () => {
            try {
                const postsData = await generatePostsByID(thisUserID);
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        getPostsByID(thisUserID);
    }, []);

    useEffect(() => {
        const getUserByID = async () => {
            try {
                const userData = await getUserNameByID(thisUserID);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching name:', error);
            }
        };

        getUserByID(thisUserID);
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
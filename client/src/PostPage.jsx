import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PostPage = () => {

    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);
    const [postInfo, setPostInfo] = useState([]);

    const params = useParams();

    const thisPostID = params.postID;

    useEffect(() => {
        if (!isValid) {
            alert("Oops,this URL doesn't exist");
            navigate("/");
        }
    }, [isValid, navigate])


    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/posts/${thisPostID}`);

                if (!response.ok) {
                    setIsValid(false);
                }
                else {
                    const postData = await response.json();
                    setPostInfo(postData);
                }

            } catch (error) {
                console.log("Error fetching post:", error);
            }
        };
        getPost();
    }, [thisPostID]);

    return (
        <div>
            <h1>{params.postID}</h1>
        </div>
    )
}

export default PostPage;
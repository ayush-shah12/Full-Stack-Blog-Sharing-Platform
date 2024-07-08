/* Individual Post Page */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext.jsx";
import Header from "../components/Header.jsx";
import styles from "../styles/PostPage.module.css";
import pic from "../assets/missing_image.avif"
import { getPost } from "../api/posts.js";

const PostPage = () => {

    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);
    const [postInfo, setPostInfo] = useState([]);

    const params = useParams();
    const thisPostID = params.postID;

    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        if (!isValid) {
            alert("Oops,this post doesn't exist");
            navigate("/");
        }
    }, [isValid, navigate])

    function dateFromObjectId(objectId) {   //objectID can be parsed into timestamp
        if (!objectId) return "Invalid ID";
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    }

    useEffect(() => {
        const getPostFunction = async () => {
            try {
                const response = await getPost(thisPostID);

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
        getPostFunction();
    }, [thisPostID]);

    return (
        <div className={styles.post_page}>
            <Header />
            <h1>{postInfo.title}</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <time>Last Updated: {dateFromObjectId(postInfo._id).toString()}</time>
            </div>

            <div className={styles.author}>by {postInfo.author}</div>
            {userInfo?.id === postInfo.authorID && (
                <div className={styles.edit_row}>
                    <Link className={styles.edit_btn} to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </Link>
                </div>
            )}
            <div className={styles.image}>
                <img src={postInfo.imageURL} onError={(e) => {
                    e.target.src = pic;
                }} />
            </div>

            <div styles={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: postInfo.text }} />
            </div>
        </div>
    );

}
export default PostPage;

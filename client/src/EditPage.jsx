/* Edit Post Page */
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import styles from "./CreatePost.module.css"

const EditPage = () => {

    const navigate = useNavigate();

    const [redirect, setRedirect] = useState(false);
    const [postInfo, setPostInfo] = useState([]);

    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [summary, setSummary] = useState("");
    const [text, setText] = useState("");

    const { userInfo } = useContext(UserContext);

    const params = useParams();
    const thisPostID = params.postID;

    useEffect(() => {
        if (redirect) {
            navigate("/");
        }
    });

    useEffect(() => {
        if ((userInfo != null) && (userInfo.id === postInfo.authorID)) {
            alert("Oops, you don't have permission to edit this post");
            navigate("/");
        }
    }, [userInfo, navigate])

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/edit/${thisPostID}`);

                if (!response.ok) {
                    console.log(response);
                }
                else {
                    const postData = await response.json();
                    setPostInfo(postData);

                    setTitle(postData.title);
                    setImageURL(postData.imageURL);
                    setSummary(postData.summary);
                    setText(postData.text);
                }

            } catch (error) {
                console.log("Error fetching post:", error);
            }
        };
        getPost();
    }, [thisPostID]);

    async function handleUpdate(event) {
        event.preventDefault();

        const data =
        {
            title: title,
            summary: summary,
            text: text,
            imageURL: imageURL,
            author: userInfo?.user,
            authorID: userInfo?.id

        };

        const response = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const responseBody = await response;

        switch (responseBody.status) {
            case 200:
                handleDelete();
                break;
            case 400:
                alert("All Fields Must Be Filled Out. Please Try Again");
                break;
            case 401:
                alert("Unauthorized token. Please sign in again");
                break;
            case 500:
                alert("Please try again later");
                break;
        }

    }

    const handleDelete = async () => {
        try {
            const delResponse = await fetch(`${import.meta.env.VITE_SERVER_PORT_URL}/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: thisPostID })
            });

            if (!delResponse.ok) {
                console.error("Failed to delete the post.");
            } else {
                const responseData = await delResponse.json();
                console.log(responseData.message);
                setRedirect(true);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleImageURLChange = (event) => {
        setImageURL(event.target.value);
    }

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    }

    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    return (
        <div className={styles.formContainer}>
            <Header />
            <form className={styles.form} onSubmit={handleUpdate}>
                <input
                    onKeyDown={(e) => checkKeyDown(e)}
                    type="text"
                    className={styles.field}
                    value={title}
                    placeholder="Enter Title"
                    onChange={handleTitleChange}

                />
                <input
                    onKeyDown={(e) => checkKeyDown(e)}
                    className={styles.field}
                    value={imageURL}
                    placeholder="Enter Image URL"
                    onChange={handleImageURLChange}

                />

                <textarea
                    onChange={handleSummaryChange}
                    placeholder="Enter Summary"
                    className={styles.fieldPara}
                    rows="2"
                    cols="18"
                    value={summary}
                    wrap="soft">

                </textarea>

                <textarea
                    onChange={handleTextChange}
                    placeholder="Enter Text"
                    className={styles.fieldParaText}
                    rows="14"
                    cols="10"
                    value={text}
                    wrap="soft">
                </textarea>

                <button className={styles.button} type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditPage;
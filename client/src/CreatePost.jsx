import styles from "./CreatePost.module.css"
import Header from "./Header"
import { useState } from "react"
import { UserContext } from "./UserContext"
import { useContext } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const CreatePost = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [summary, setSummary] = useState("");
    const [text, setText] = useState("");

    const [redirect, setRedirect] = useState(false);

    const { userInfo } = useContext(UserContext);

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

    async function handleCreate(event) {
        event.preventDefault();

        const data =
        {
            title: title,
            summary: summary,
            text: text,
            imageURL: imageURL,
            author: userInfo?.user,     //in case user is logged out, but attempting create
            authorID: userInfo.id

        };

        const response = await fetch("http://localhost:4000/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const responseBody = await response;

        switch (responseBody.status) {
            case 200:
                setRedirect(true);
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

    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    useEffect(() => {
        if (redirect) {
            navigate("/");
        }
    });

    return (
        <div className={styles.formContainer}>
            <Header />
            <form className={styles.form} onSubmit={handleCreate}>
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

                <button className={styles.button} type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreatePost;

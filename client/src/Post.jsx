import styles from "./Post.module.css"

const Post = (props) => {

    function dateFromObjectId(objectId) {   //objectID can be parsed into timestamp
        if (!objectId) return "Invalid ID";
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    }

    return (
        <div className={styles.post}>
            
            <div className={styles.image}>
                <img src={props.imageURL}></img>
            </div>

            <div className={styles.content}>
                
                <h2 className={styles.title}>
                    <a href={`/posts/${props.objectId}`} className={styles.link}> {props.title} </a>
                </h2>
                
                <p className={styles.text}>{props.summary}</p>

                <p className={styles.author}>
                    <a href={`/users/${props.authorID}`} className={styles.link}> By: {props.author} </a>
                </p>

                <p>At: {dateFromObjectId(props.objectId).toString()}</p>

            </div>
        </div>
    )
}

export default Post;
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PostManipulation from "./PostManipulation/PostManipulation";

export default function NewStoryPage() {
    const [title, setTitle] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();

    function onPostSaveButtonClick() {
        const body = { title, coverUrl, content };
        const request = axios.post("http://localhost:4000/posts", body);
        request.then(() => {
            history.push("/");
        });
        request.catch((error) => alert(error.response.data));
    }
    return (
        <PostManipulation
            title={title}
            onTitleChange={(newTitle) => setTitle(newTitle)}
            coverUrl={coverUrl}
            onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
            content={content}
            onContentChange={(newContent) => setContent(newContent)}
            onPostSaveButtonClick={onPostSaveButtonClick}
        />
    );
}

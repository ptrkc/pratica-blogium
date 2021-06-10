import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useHistory, useParams } from "react-router-dom";
import PostManipulation from "./PostManipulation/PostManipulation";

export default function PostEditPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();

    useEffect(() => {
        const request = axios.get(`http://localhost:4000/posts/${postId}`);
        request.then((response) => {
            setPost(response.data);
            setTitle(response.data.title);
            setCoverUrl(response.data.coverUrl);
            setContent(response.data.content);
        });
    }, [postId]);

    function onPostSaveButtonClick() {
        const body = { title, coverUrl, content };
        const request = axios.put(
            `http://localhost:4000/posts/${postId}`,
            body
        );
        request.then(history.push(`/posts/${postId}`));
    }

    if (!post || !content) return <Spinner />;

    return (
        <PostManipulation
            title={title}
            onTitleChange={(newTitle) => setTitle(newTitle)}
            coverUrl={coverUrl}
            onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
            content={content}
            onContentChange={(newContent) => setContent(newContent)}
            onPostSaveButtonClick={onPostSaveButtonClick}
            postId={postId}
        />
    );
}

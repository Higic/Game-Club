"use client";

import { useState } from "react";

export default function ForumPostForm() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ForumPostForm handleSubmit. Title: " + title + " Text: " + text);
        //Do Database Send stuff
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Make a forum post:</h2>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    className={"postTitle"}
                    placeholder="Make a title..."
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
                <label>Text:</label>
                <textarea
                    rows={4}
                    value={text}
                    placeholder="Make a post..."
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <input
                    type="submit"
                    value="Submit">
                </input>
            </form>
        </div>
    );
}

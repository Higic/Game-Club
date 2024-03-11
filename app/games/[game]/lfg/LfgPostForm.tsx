"use client";

import { useState } from "react";

export default function LfgPostForm() {
    const [text, setText] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("LfgPostForm .  Text: " + text);
        //Do Database Send stuff
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Make a LFG post:</h2>
                <textarea
                    rows={4}
                    maxLength={100}
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

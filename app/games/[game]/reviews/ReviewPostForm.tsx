"use client";

/**
 * This component is the form used in the review page for makign reveiws. It generates a database entry for the review.
 */

import { useState } from "react";

export default function ReviewPostForm() {
    const [text, setText] = useState("");
    const [rating, setRating] = useState("1");

    const handelSubmit = async (e: any) => {
        e.preventDefault();
        console.log("ReviewPostForm handleSubmit. Rating: " + rating + " Text: " + text);
        //Do Database Send stuff
    }

    return (
        <div>
            <form onSubmit={handelSubmit} className="form-container">
                <h2>Make a review:</h2>
                <textarea
                    rows={4}
                    maxLength={200}
                    value={text}
                    placeholder="Make a review..."
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <select name="Rating" onChange={(e => setRating(e.target.value))}>
                    <option value="1">1/5</option>
                    <option value="2">2/5</option>
                    <option value="3">3/5</option>
                    <option value="4">4/5</option>
                    <option value="5">5/5</option>
                </select>
                <input
                    type="submit"
                    value="Submit">
                </input>
            </form>
        </div>
    );
}

"use client";

import { CREATE_FORUM_POST_MUTATION } from "@/app/api/graphql/mutations/forumMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { ForumPostInput } from "@/types/DBTypes";
import { useMutation } from "@apollo/client";
import { get } from "http";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

/**
 * This component displays and creates a forum post via user inputy
 * @returns Forum creation form
 */
export default function ForumPostForm() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [gameid, setGame] = useState("");
    const [createForumPostMutation, {loading: createForumPostLoading, error: createForumPostError}] = useMutation(CREATE_FORUM_POST_MUTATION);

    // User authorization
    const author = GetLoggedInUser();
    const router = useRouter();

    // Get the game name from the URL and set to gameId
    useEffect(() => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const game = pathParts[2];
        setGame(game);
    }, []);

    // Prevents empty forum post creation
    if (!author){
        console.log("User not logged in");
        return  <p></p>;
    }

    // Handles the forum post creation. Gets the form data and sends it to the server
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData: ForumPostInput = {
            title: title,
            text: text,
            game: gameid,
            author: author?.user_name,
        }

        try{
            const data = await createForumPostMutation({
                variables: {input: formData}
            });
            if(data){
                console.log("Forum post created: ", data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
        router.refresh();
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
                    maxLength={1000}
                    value={text}
                    placeholder="Make a post..."
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <div>
                    <span style={{ fontSize: "12px" }}>Characters remaining: {1000 - text.length}</span>
                </div>
                <input
                    type="submit"
                    value="Submit"
                    disabled={createForumPostLoading}
                />
                {createForumPostError && <p>Error creating LFG: {createForumPostError.message}</p>}
            </form>
        </div>
    );
}

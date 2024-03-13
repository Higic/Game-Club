"use client";

import { CREATE_FORUM_POST_MUTATION } from "@/app/api/graphql/mutations/forumMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { ForumPostInput } from "@/types/DBTypes";
import { useMutation } from "@apollo/client";
import { get } from "http";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ForumPostForm() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [gameid, setGame] = useState("");
    const [createForumPostMutation, {loading: createForumPostLoading, error: createForumPostError}] = useMutation(CREATE_FORUM_POST_MUTATION);

    const author = GetLoggedInUser();

    useEffect(() => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const game = pathParts[2];
        setGame(game);
    }, []);

    if (!author){
        alert("not logged in");

        return;
    }
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

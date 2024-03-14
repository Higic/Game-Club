"use client";

import { CREATE_FORUM_COMMENT_MUTATION } from "@/app/api/graphql/mutations/forumMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { ForumCommentInput, ForumPostInput } from "@/types/DBTypes";
import { useMutation } from "@apollo/client";
import { get } from "http";
import { useRouter } from "next/navigation";
import { title } from "process";
import { use, useEffect, useState } from "react";

export default function ForumCommentForm(forumPost: string) {
    const [text, setText] = useState("");
    const [createForumCommentMutation, {loading: createForumPostLoading, error: createForumPostError}] = useMutation(CREATE_FORUM_COMMENT_MUTATION);

    const author = GetLoggedInUser();
    console.log("Forum post id: ", forumPost);
    const router = useRouter();

    if (!author){
        console.log("not logged in");

        return <></>;
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const commentData: ForumCommentInput = {
            text: text,
            forumPostId: forumPost,
            author: author?.user_name,
        }

        try{
            const data = await createForumCommentMutation({
                variables: {input: commentData}
            });
            console.log("Forum comment created: ", data);
        } catch (error) {
            console.log("Error: ", error);
        }
        router.refresh();
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Comment on the post:</h2>
                <label>Text:</label>
                <textarea
                    rows={4}
                    value={text}
                    placeholder="Comment..."
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

"use client";

import { CREATE_LFG_MUTATION } from "@/app/api/graphql/mutations/lfgMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function LfgPostForm() {
    const [game, setGame] = useState("Metal Gear Rising 2 - Revengeance");
    const [text, setText] = useState("");
    const [createLfgMutation, { loading: createLfgLoading, error: createLfgError }] = useMutation(CREATE_LFG_MUTATION);

    const author = GetLoggedInUser();
    const token = Cookies.get("token");

    useEffect(() => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const game = pathParts[2];
        setGame(game);
    }, [])

    if (!author || !token) {
        return
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = {
            text: text,
            game: game,
            author: author?.user_name, // Add null check
        };

        // Try the mutation
        try {
            const result = await createLfgMutation({ variables: { input: formData } });
            alert("LFG post created!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Make a LFG post:</h2>
                <textarea
                    rows={4}
                    maxLength={200}
                    value={text}
                    placeholder="Make a post..."
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <div>
                    <span style={{ fontSize: "12px" }}>Characters remaining: {200 - text.length}</span>
                </div>
                <input
                    type="submit"
                    value="Submit"
                    disabled={createLfgLoading}
                />
                {createLfgError && <p>Error creating LFG: {createLfgError.message}</p>}
            </form>
        </div>
    );
}

"use client";

import { CREATE_LFG_MUTATION } from "@/app/api/graphql/mutations/lfgMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LfgPostForm() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [createLfgMutation, { loading: createLfgLoading, error: createLfgError }] = useMutation(CREATE_LFG_MUTATION);

    const author = GetLoggedInUser();
    const token = Cookies.get("token");

    if (!author || !token) {
        console.log("No user logged in") // redirect user to login page
        router.push("/login");
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = {
            text: text,
            game: "Metal Gear Rising 2 - Revengeance", // Hardcoded game for now
            author: author?.user_name, // Add null check
        };

        // Try the mutation
        try {
            const result = await createLfgMutation({ variables: { input: formData } });
            alert("LFG post created!");
            if (result) { console.log("LFG post created!", result)}
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

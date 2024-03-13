"use client";

import { CREATE_REVIEW_MUTATION } from "@/app/api/graphql/mutations/reviewMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
/**
 * This component is the form used in the review page for makign reveiws. It generates a database entry for the review.
 */

import { useEffect, useState } from "react";
import { ReviewInput } from "@/types/DBTypes";

export default function ReviewPostForm() {
    const router = useRouter();
    const [game, setGame] = useState("Metal Gear Rising 2 - Revengeance");
    const [text, setText] = useState("");
    const [rating, setRating] = useState("");

    const [createReviewMutation, { loading: createReviewLoading, error: createReviewError }] = useMutation(CREATE_REVIEW_MUTATION);

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


    const handelSubmit = async (e: any) => {
        e.preventDefault();
        const formData: ReviewInput = {
            game: game,
            author: author?.user_name,
            score: parseInt(rating),
            text: text
        }

        try {
            const result = await createReviewMutation({ variables: { input: formData } });
            alert("Review created");
        } catch (error) {
            console.log(error);
        }
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

"use client";

import { CREATE_REVIEW_MUTATION } from "@/app/api/graphql/mutations/reviewMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ReviewInput } from "@/types/DBTypes";


/**
 * This component is the form used in the review page for making reveiws. It generates a database entry for the review.
 */
export default function ReviewPostForm() {
    const router = useRouter();
    const [game, setGame] = useState("");
    const [text, setText] = useState("");
    const [rating, setRating] = useState("");

    // Mutation for creating a review
    const [createReviewMutation, { loading: createReviewLoading, error: createReviewError }] = useMutation(CREATE_REVIEW_MUTATION);

    // User authorization and token
    const author = GetLoggedInUser();
    const token = Cookies.get("token");


    // Get the game name from the URL and set to gameId
    useEffect(() => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const game = pathParts[2];
        setGame(game);
    }, [])

    // Prevents empty review creation
    if (!author || !token) {
        return
    }


    // Handles the review creation. Gets the form data and sends it to the server
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
            router.refresh();
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
                    <option disabled selected>Select rating</option>
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

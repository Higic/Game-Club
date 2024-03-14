"use client";

import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { GET_REVIEWS_BY_GAME } from "@/app/api/graphql/queries/reviewQueries";
import { Game, Review } from "@/types/DBTypes";
import { useMutation, useQuery } from "@apollo/client";
import { get } from "http";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import GetLoggedInUser from "@/components/getLoggedInUser";
import {
  DELETE_REVIEW_MUTATION,
  UPDATE_REVIEW_MUTATION,
} from "@/app/api/graphql/mutations/reviewMutations";
import { text } from "stream/consumers";

/**
 * Function gets a game by its id
 * @param game game id
 * @returns game data
 */
function GetGameById(game: string) {
  // game variable is the name of the game
  const { loading, error, data } = useQuery(GET_GAME_BY_ID, {
    variables: { gameById: game },
  });
  if (data) {
    return data;
  }
}

/**
 * Component for the review posts
 * @returns all reviews for a certain game
 */
export default function ReviewPost() {
  const router = useRouter();

  // Mutatios for deleting and updating a review
  const [
    deleteReviewMutation,
    { loading: deleteReviewLoading, error: deleteReviewError },
  ] = useMutation(DELETE_REVIEW_MUTATION);
  const [
    updateReviewmutation,
    { loading: updateReviewLoading, error: updateReviewError },
  ] = useMutation(UPDATE_REVIEW_MUTATION);

  // Values for updating the review
  const [rating, setRating] = useState("1");
  const [text, setText] = useState("");

  // Validates the user
  let user = GetLoggedInUser();

  // Get the game name from the URL and set to gameId
  const [gameId, setGameId] = useState("");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const game = pathParts[2];
    setGameId(game);
  }, []);

  // Get the game data and name
  const gameData = GetGameById(gameId);
  const name = gameData?.gameById.gameName;

  // Get all reviews for the game
  const { loading, error, data } = useQuery(GET_REVIEWS_BY_GAME, {
    variables: { reviewsByGame: gameId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Deletes a review from user
  const handleDelete = async (id: string) => {
    try {
      const results = await deleteReviewMutation({
        variables: { deleteReviewId: id },
      });

      router.refresh();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Updates a review from user
  const handleEdit = async (id: string) => {
    try {
      const results = await updateReviewmutation({
        variables: {
          updateReviewId: id,
          input: { text: text, score: parseInt(rating) },
        },
      });
      setRating("");
      alert("Review updated!");
      router.refresh();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <h2>Reviews for game {name}</h2>
      {data &&
        data.reviewsByGame.map((reviews: Review) => (
          <div key={reviews.id} className="post">
            <div className="postProfile">
              <p>author: {reviews.author}, </p>
            </div>
            <div className="postData">
              <p>score: {reviews.score}, </p>
              <p>text: {reviews.text}</p>
            </div>
            {reviews.author === user?.user_name && (
              <div className="form-container">
                <textarea
                  rows={4}
                  maxLength={200}
                  value={text}
                  placeholder="Edit review..."
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <select
                  name="Rating"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option disabled selected>select rating</option>
                  <option value="1">1/5</option>
                  <option value="2">2/5</option>
                  <option value="3">3/5</option>
                  <option value="4">4/5</option>
                  <option value="5">5/5</option>
                </select>
                <button onClick={() => handleDelete(reviews.id as string)}>
                  Delete
                </button>
                <button onClick={() => handleEdit(reviews.id as string)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

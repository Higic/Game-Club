"use client";

import { GET_REVIEWS_BY_GAME } from "@/app/api/graphql/queries/reviewQueries";
import { Review } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function ReviewPost() {
  const [gameName, setGameName] = useState("Metal Gear Rising 2 - Revengeance");
  const { loading, error, data } = useQuery(GET_REVIEWS_BY_GAME, {
    variables: { reviewsByGame: gameName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Reviews by game {gameName}</h2>
      {data &&
        data.reviewsByGame.map((reviews: Review) => (
          <div key={reviews.id} className="post">
            <p>game: {reviews.game}, </p>
            <div className="postProfile">
              <p>author: {reviews.author}, </p>
            </div>
            <div className="postData">
              <p>score: {reviews.score}, </p>
              <p>text: {reviews.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

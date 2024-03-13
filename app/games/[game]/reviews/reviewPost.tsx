"use client";

import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { GET_REVIEWS_BY_GAME } from "@/app/api/graphql/queries/reviewQueries";
import { Game, Review } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";
import { get } from "http";
import { useEffect, useState } from "react";


function GetGameById(game: string) {
  // game variable is the name of the game
  const { loading, error, data } = useQuery(GET_GAME_BY_ID, {
    variables: { gameById: game }
  });
  if (data) {
    return data;
  }
}


export default function ReviewPost() {
  const [gameId, setGameId] = useState("Metal Gear Rising 2 - Revengeance");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const game = pathParts[2];
    setGameId(game);
  }, []);

  const gameData = GetGameById(gameId);
  const name = gameData?.gameById.gameName;

  const { loading, error, data } = useQuery(GET_REVIEWS_BY_GAME, {
    variables: { reviewsByGame: gameId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
          </div>
        ))}
    </div>
  );
}

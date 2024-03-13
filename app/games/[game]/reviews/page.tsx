"use client";

/**
 * This file contains the review page for a specific game.
 * It contains the review post form and the reviews for the game.
 */

import {useEffect, useState} from "react";
import Review from "./review";
import ReviewPostForm from "./ReviewPostForm";
import { Review as reviewType } from "@/types/DBTypes";

export default function Page() {
  const [reviews, setReviews] = useState([] as reviewType[]);
  const getGameReviews = () => {
    // Function to get reviews from the database
    // fetch from api where game.id = currentGame.id
  };

  //gameID from URL path
  const [gameId, setGameId] = useState('');

  useEffect(() => {
        // Get the current URL path
        const currentPath = window.location.pathname;
        // Split the path by "/"
        const pathParts = currentPath.split('/');
        // Get the second part which contains the gameId
        const gameIdFromPath = pathParts[2];
        setGameId(gameIdFromPath);
        }, []);

  return (
    <div>
      <ReviewPostForm />
      <div className="mainContent">
        <Review
          user_name={"Testerino"}
          review={"Tässä vähän testiarvosteluu, en tykänny mut maistu hyvält."}
          rating={5}
        ></Review>
        <Review
          user_name={"Toinen Isoasdsadsadsda dasadsasddasasdäijä"}
          review={"AAAAAAA AAAAAAAAAAAAAAA AAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}
          rating={1}
        ></Review>
        {}
      </div>
    </div>
  );
}

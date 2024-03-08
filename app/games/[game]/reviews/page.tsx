"use client";

import { useState } from "react";
import Review from "./review";
import ReviewPostForm from "./ReviewPostForm";
import { Review as reviewType } from "../../../../types/MessageTypes";

export default function Page() {
  const [reviews, setReviews] = useState([] as reviewType[]);
  const getGameReviews = () => {
    // Function to get reviews from the database
    // fetch from api where game.id = currentGame.id
  };

  return (
    <div>
      <ReviewPostForm />
      <div className="mainContent">
        <Review
          username={"Testerino"}
          review={"Tässä vähän testiarvosteluu, en tykänny mut maistu hyvält."}
          rating={5}
        ></Review>
        <Review
          username={"Toinen Isoasdsadsadsda dasadsasddasasdäijä"}
          review={"AAAAAAA AAAAAAAAAAAAAAA AAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}
          rating={1}
        ></Review>
        {}
      </div>
    </div>
  );
}

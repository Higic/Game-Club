"use client";

import { useState } from "react";
import Review from "./review";
import { Review as reviewType } from "../../../../types/MessageTypes";

export default function Page() {
  const [count, setCount] = useState(0);
  const [reviews, setReviews] = useState([] as reviewType[]);
  const getGameReviews = () => {
    // Function to get reviews from the database
    // fetch from api where game.id = currentGame.id
  };

  const handleReviewData = (data: reviewType) => {
    // Take input data from review and send to api
  }

  const createReview = () => {
    // Function to create a review in the database
  };

  return (
    <div>
      <form action="" className="reviewInput">
        <textarea
          rows={4}
          value={""}
          placeholder="Write a review..."
        ></textarea>
        <div className="reviewInputCol">
          <div>
            <select name="Rating">
              <option value="1">1/5</option>
              <option value="2">2/5</option>
              <option value="3">3/5</option>
              <option value="4">4/5</option>
              <option value="5">5/5</option>
            </select>
          </div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
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

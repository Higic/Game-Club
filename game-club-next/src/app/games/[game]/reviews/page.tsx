'use client'

import { useState } from "react";
import Review from "./review";

// eslint-disable-next-line @next/next/no-async-client-component
export default function ReviewPage() {

  const [count, setCount] = useState(0);
  const getGameReviews = () => {
    // Function to get reviews from the database
  }

  const createReview = () => {
    // Function to create a review in the database

  }

  return (
    <div>
      <div className="mainContent">
        <Review
          imgUrl={""}
          username={"Testerino"}
          review={"Tässä vähän testiarvosteluu, en tykänny mut maistu hyvält."}
          rating={5}
        ></Review>
        <p>Count: {count}</p>
      </div>
      <button onClick={() => setCount(count + 1)}>Create demo review</button>
    </div>
  );
}

"use client";

/**
 * This file contains the review page for a specific game.
 * It contains the review post form and the reviews for the game.
 */

import {useEffect, useState} from "react";
import Review from "./review";
import ReviewPostForm from "./ReviewPostForm";
import { Review as reviewType } from "@/types/DBTypes";
import ReviewPost from "./reviewPost";

export default function Page() {

  return (
    <div>
      <ReviewPostForm />
      <div className="mainContent">
        <ReviewPost></ReviewPost>
      </div>
    </div>
  );
}

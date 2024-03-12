"use client";

import connectMongo from "@/utils/db";
import { useRouter } from "next/navigation";

/**
 * This is the home page of the app
 */
export default function HomePage() {
  const router = useRouter();
  
  return (
    <div className="homePageIntro">
        <h1>Welcome to Game Club!</h1>
        <p>Use the search bar to find the game you are looking for</p>
        <div>
          <button onClick={() => router.push(`/register`)}>
            Register
          </button>
          <button onClick={() => router.push(`/login`)}>
            Login
          </button>
        </div>
    </div>
  )
}

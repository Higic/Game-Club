"use client";

import "./global.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CHECK_TOKEN } from "./api/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { UserOutput } from "@/types/DBTypes";
import { set } from "mongoose";
import GetLoggedInUser from "@/components/getLoggedInUser";

/**
 * NavBar component
 * - Handles navigation between different game pages
 * - Uses the useRouter hook to navigate to different pages
 */
export default function NavBar({ }) {
  const router = useRouter();

  // fetch token from localStorage
  const [game, setGame] = useState("1");



 /* const { loading, error, data } = useQuery(CHECK_TOKEN, {
    variables: { token: Cookies.get("token")},
  });

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <div><p>Error: {error.message}</p></div>;
  if (data) {
    console.log("data: ", data);
  }

  let { user } = data.user;*/

  let user = GetLoggedInUser();

  return (
    <div>
      <div>
        <button
          className="profileButton"
          type="button"
          onClick={() => router.push(`/users/${user?.id}`)}
        >
          🏠 Profile
        </button>
        {user ? (
          <button className="logoutButton" type="button">
            🚪Logout
          </button>
        ) : (
          <button className="loginButton" type="button">
            🚪Login
          </button>)}
      </div>
      <nav className="menuButtons">
        <div className="navItem">
          <button
            className="menuButton"
            type="button"
            onClick={() => router.push(`/games/${game}/reviews`)}
          >
            Reviews
          </button>
        </div>
        <div className="navItem">
          <button
            className="menuButton"
            type="button"
            onClick={() => router.push(`/games/${game}/lfg`)}
          >
            LFG
          </button>
        </div>
        <div className="navItem">
          <button
            className="menuButton"
            type="button"
            onClick={() => router.push(`/games/${game}/forum`)}
          >
            Forum
          </button>
        </div>
      </nav>
    </div>
  )
};


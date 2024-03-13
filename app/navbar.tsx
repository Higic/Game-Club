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

  const getGameIdFromPath = () =>{
    // Get the current URL path
    const currentPath = window.location.pathname;
    // Split the path by "/"
    const pathParts = currentPath.split('/');
    // Get the second part which contains the gameId
    const gameIdFromPath = pathParts[2];
    console.log("GameID: ", gameIdFromPath);
    return gameIdFromPath;
  }

  const getCorrectDirectoryFromPath= () => {
    // Get the current URL path
    const currentPath = window.location.pathname;
    // Split the path by "/"
    const pathParts = currentPath.split('/');
    // Get the second part which contains the gameId
    const Directory = pathParts[1];
    console.log("Directory: ", Directory);
    return Directory;
  }

  const handleNavButtonClick = (url) => {
    let gameId = getGameIdFromPath();
    let directory = getCorrectDirectoryFromPath();
    console.log("About to push: /games/" + gameId + "/" + url);
    router.push(`/${directory}/${gameId}/${url}`);
  }

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
            onClick={() => handleNavButtonClick(`reviews`)}
          >
            Reviews
          </button>
        </div>
        <div className="navItem">
          <button
            className="menuButton"
            type="button"
            onClick={() => handleNavButtonClick(`lfg`)}
          >
            LFG
          </button>
        </div>
        <div className="navItem">
          <button
            className="menuButton"
            type="button"
            onClick={() => handleNavButtonClick(`forum`)}
          >
            Forum
          </button>
        </div>
      </nav>
    </div>
  )
};


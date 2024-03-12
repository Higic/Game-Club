"use client";

import "./global.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * NavBar component
 * - Handles navigation between different game pages
 * - Uses the useRouter hook to navigate to different pages
 */
export default function NavBar({}) {
  const router = useRouter();

  // fetch token from localStorage
  const [game, setGame] = useState("1");

  const userId = localStorage.getItem("userId");
  const user_name = localStorage.getItem("user_name");
  const bio = localStorage.getItem("bio");

  const [userData, setUserData] = useState({
    uid: userId,
    user_name: user_name,
    bio: bio
  });

  const handleProfileNavigate = () => {
    if (userId === "null") {
      router.push("/login");
    }
    else router.push(`/users/${userId}`);
  }

  const handleLogout = () => {
    console.log("User token before logout: ", localStorage.getItem("token"));
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_name");
    localStorage.removeItem("bio");
    console.log("Logging out... Current user token: ", localStorage.getItem("token"));
    window.location.reload();
  };

  const isLoggedin = () => {
    return userId !== null;
  }

  return (
    <div>
      <div>
        <button
          className="profileButton"
          type="button"
          onClick={handleProfileNavigate}
        >
          🏠 Profile
        </button>
        {isLoggedin() && (
          <button className="logoutButton" type="button" onClick={handleLogout}>
            🚪Logout
          </button>
          )}
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
  );
}

"use client";

import "./global.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import GetLoggedInUser from "@/components/getLoggedInUser";

/**
 * NavBar component
 * - Handles navigation between different game pages
 * - Uses the useRouter hook to navigate to different pages
 */
export default function NavBar({ }) {
  const router = useRouter();

  const logout = (message: string) => {
    Cookies.remove("token");
    router.push("/login");
    router.refresh();
    alert(message);
  }

  const getGameIdFromPath = () =>{
    // Get the current URL path
    const currentPath = window.location.pathname;
    // Split the path by "/"
    const pathParts = currentPath.split('/');
    // Get the second part which contains the gameId
    const gameIdFromPath = pathParts[2];
    return gameIdFromPath;
  }

  const getCorrectDirectoryFromPath= () => {
    // Get the current URL path
    const currentPath = window.location.pathname;
    // Split the path by "/"
    const pathParts = currentPath.split('/');
    // Get the second part which contains the gameId
    const Directory = pathParts[1];
    return Directory;
  }

  const handleProfileButtonClick = () => {
    if (!user){
        logout("Please login to view your profile");
        return;
    }
    router.push(`/users/${user?.id}`);
  }

  const handleNavButtonClick = (url: any) => {
    let gameId = getGameIdFromPath();
    let directory = getCorrectDirectoryFromPath();
    if (!gameId) {
      alert("Select a game first!");
      return;
    }
    console.log("About to push: /games/" + gameId + "/" + url);
    router.push(`/${directory}/${gameId}/${url}`);
  }
  let user = GetLoggedInUser();

  return (
    <div>
      <div>
        <button
          className="profileButton"
          type="button"
          onClick={() => handleProfileButtonClick()}
        >
          🏠 Profile
        </button>
        {user ? (
          <button className="logoutButton" type="button" onClick={() => logout("cya")} >
            🚪Logout
          </button>
        ) : (
          <button className="logoutButton" type="button" onClick={() => router.push(`/login`)}>
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


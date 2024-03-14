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
export default function NavBar({}) {
  const router = useRouter();

  //Removes the token from the cookies and redirects to the login page. Takes string as parameter to display a message to the user
  const logout = (message: string) => {
    Cookies.remove("token");
    router.push("/login");
    router.refresh();
    alert(message);
  };

  //Returns the gameId as string from the current URL path
  const getGameIdFromPath = () => {
    // Get the current URL path
    const currentPath = window.location.pathname;
    // Split the path by "/"
    const pathParts = currentPath.split("/");
    // Get the second part which contains the gameId
    const gameIdFromPath = pathParts[2];
    return gameIdFromPath;
  };

  //Returns the directory as string from the current URL path
  const getCorrectDirectoryFromPath = () => {
    // Get the current URL path
    const currentPath = window.location.pathname;
    // Split the path by "/"
    const pathParts = currentPath.split("/");
    // Get the second part which contains the gameId
    const Directory = pathParts[1];
    return Directory;
  };

  //Logs user out if not logged in, otherwise navigates to the user's profile page
  const handleProfileButtonClick = () => {
    //if user is not logged in, log them out
    if (!user) {
      logout("Please login to view your profile");
      return;
    }
    router.push(`/users/${user?.id}`);
  };

  //Navigates to the specified page for the currently selected game
  const handleNavButtonClick = (url: any) => {
    // Get the gameId from the current URL path
    let gameId = getGameIdFromPath();
    // Get the directory from the current URL path
    let directory = getCorrectDirectoryFromPath();
    // If no gameId is found, alert the user and return
    if (!gameId) {
      alert("Select a game first!");
      return;
    }
    //console.log("About to push: /games/" + gameId + "/" + url);
    router.push(`/${directory}/${gameId}/${url}`);
  };
  //Verifies current users token and returns the user object
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
          <button
            className="logoutButton"
            type="button"
            onClick={() => logout("cya")}
          >
            🚪Logout
          </button>
        ) : (
          <div>
            <button
              className="logoutButton"
              type="button"
              onClick={() => router.push(`/login`)}
            >
              🚪Login
            </button>
            <button
              className="registerButton"
              type="button"
              onClick={() => router.push(`/register`)}
            >
              📝Register
            </button>
          </div>
        )}
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
  );
}

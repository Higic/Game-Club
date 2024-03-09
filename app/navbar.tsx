"use client";

import "./global.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar({}) {
  const router = useRouter();

  const [game, setGame] = useState("1");
  const [userId, setUserId] = useState("2");

  const [userData, setUserData] = useState({
    uid: userId,
    user_name: "",
    bio: ""
  });

  const handleProfileNavigate = () => {
    router.push(`/users/${userId}`);
  }

  return (
    <div>
        <button
          className="profileButton"
          type="button"
          onClick={handleProfileNavigate}
        >
          🏠
        </button>
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

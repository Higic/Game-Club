"use client";

import "./global.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar({}) {
  const router = useRouter();
  function doSomething(arg0: string): void {
    console.log("clicked button ", arg0);
  }

  const [game, setGame] = useState("1");
  const [user, setUser] = useState("2");

  return (
    <div>
        <button
          className="profileButton"
          type="button"
          onClick={() => router.push(`/users/${user}`)}
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

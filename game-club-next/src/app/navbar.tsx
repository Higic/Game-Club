"use client";

import Link from "next/link";
import "./global.css";
import { useRouter } from "next/navigation";

export default function NavBar({}) {
  const router = useRouter();
  function doSomething(arg0: string): void {
    console.log("clicked button ", arg0);
  }

  return (
    <nav className="menuButtons">
      <div className="navItem">
        <button
          className="menuButton"
          type="button"
          onClick={() => router.push("/reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="navItem">
        <button
          className="menuButton"
          type="button"
          onClick={() => router.push("/lfg")}
        >
          LFG
        </button>
      </div>
      <div className="navItem">
        <button
          className="menuButton"
          type="button"
          onClick={() => router.push("/forum")}
        >
          Forum
        </button>
      </div>
    </nav>
  );
}

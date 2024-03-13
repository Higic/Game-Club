"use client";

import { useState } from "react";
import Link from "next/link";
import "./global.css";


/**
 * This is the main title. It is used to navigate to the games page.
 * @returns the main title
 */
export default function Title() {

  const [title, setTitle] = useState("Game Club");

  return (
    <Link href="/games" style={{ textDecoration: 'none'}}>
      <h1 className="title">
        {title}
      </h1>
    </Link>

  );
}

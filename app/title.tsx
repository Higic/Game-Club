"use client";

import { useState } from "react";
import Link from "next/link";
import "./global.css";

export default function Title() {

  const [title, setTitle] = useState("Game Club");

  return (
    <Link href="/" style={{ textDecoration: 'none'}}>
      <h1 className="title">
        {title}
      </h1>
    </Link>
    
  );
}

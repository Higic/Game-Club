"use client";

import { useState } from "react";
import "./global.css";

export default function Title() {

  const [title, setTitle] = useState("Game Club");

  return (
    <h1 className="title">
      {title}
    </h1>
  );
}

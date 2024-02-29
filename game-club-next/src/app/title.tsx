"use client";

import { useState } from "react";
import "./global.css";

export default function Title() {

  const [title, setTitle] = useState("Game Club");

  return (
    <div className="title">
      {title}
    </div>
  );
}

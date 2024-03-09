"use client";

import { useState } from "react";

export default function Login() {
  let MIN_USERNAME_LENGTH = 4;
  let MAX_USERNAME_LENGTH = 20;

  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.user_name || !formData.password) {
      alert("All fields are required");
      return;
    }
    console.log(formData);
    // send to api
  };
  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit} className="userForm">
        <label>Username:</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

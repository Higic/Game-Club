"use client";

import { useState } from "react";

export default function Register() {
  let MIN_USERNAME_LENGTH = 4;
  let MAX_USERNAME_LENGTH = 20;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // if username or email is already taken, alert user

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("All fields are required");
      return;
    }
    if (
      formData.username.length < MIN_USERNAME_LENGTH ||
      formData.username.length > MAX_USERNAME_LENGTH
    ) {
      alert(
        `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`
      );
      return;
    }
    console.log(formData);
    // send to api
  };

  return (
    <form onSubmit={handleSubmit} className="userForm">
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label>Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

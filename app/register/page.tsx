"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/app/api/graphql/mutations/userMutations";
import { UserInput } from "@/types/DBTypes";
import { useRouter } from "next/navigation";

/**
  * Register component
  * - Handles user registration
  * - Uses useMutation hook to send data to the server
  * - Uses the REGISTER_MUTATION from userMutations.ts
  * - Handles form data and validation
  * - Sends data to the server
  */
export default function Register() {

  const router = useRouter();
  
  // Constants for username length
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    confirmPassword: "",
  });
  
  // useMutation hook
  const [registerMutation, { loading: registerLoading, error: registerError }] = useMutation(REGISTER_MUTATION);
  
  const apiData: UserInput = {
    user_name: formData.user_name,
    password: formData.password,
    bio: null
  };
  
  // Handles form data
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handles form submission and sends the data to the server
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // user validation
    let MIN_USERNAME_LENGTH = 4;
    let MAX_USERNAME_LENGTH = 20;
    if (
      !formData.user_name ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("All fields are required");
      return;
    }
    if (
      formData.user_name.length < MIN_USERNAME_LENGTH ||
      formData.user_name.length > MAX_USERNAME_LENGTH
    ) {
      alert(
        `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`
      );
      return;
    }
    
    // Get username and password from data
    try {
      const result = await registerMutation({ variables: { user: apiData } });
      if (result) {
        alert("User registered successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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

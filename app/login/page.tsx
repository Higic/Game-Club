"use client";

/**
 * The login page for the app. The page contains a login form that sends the user's credentials to the server and stores the token locally.
 */

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN_MUTATION } from "@/app/api/graphql/mutations/userMutations";
import { Credentials } from "@/types/DBTypes";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  // Constants for username length
  let MIN_USERNAME_LENGTH = 4;
  let MAX_USERNAME_LENGTH = 20;

  // State for form data
  const [formData, setFormData] = useState<Credentials>({
    user_name: "",
    password: "",
  });

  // useMutation hook for login
  const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e: any) => {


    // Update the form data
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles the form submission and sends the data to the server
  const handleSubmit =  async (e: any) => {
    e.preventDefault();

    // Data validation
    if (!formData.user_name || !formData.password) {
      alert("All fields are required");
      return;
    }

    if (formData.user_name.length < MIN_USERNAME_LENGTH || formData.user_name.length > MAX_USERNAME_LENGTH) {
      alert(`Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`);
      return;
    }

    // Send to api
    try {
      const result = await loginMutation({ variables: {credentials: formData}})
      // login message
      console.log(result.data.login.message);
      //set result.data.login.token to cookies
      document.cookie = `token=${result.data.login.token}; max-age=3000; path=/`;

    } catch (error) {
      console.error(error);
    }

    // Redirect to home page after successful login
    router.push("/");
    router.refresh();
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

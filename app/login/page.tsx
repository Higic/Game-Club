"use client";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN_MUTATION } from "@/app/api/graphql/mutations/userMutations";
import { Credentials } from "@/types/DBTypes";

export default function Login() {
  let MIN_USERNAME_LENGTH = 4;
  let MAX_USERNAME_LENGTH = 20;

  const [formData, setFormData] = useState<Credentials>({
    user_name: "",
    password: "",
  });

  // useMutation hook for login
  const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e: any) => {

    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =  async (e: any) => {
    e.preventDefault();
    if (!formData.user_name || !formData.password) {
      alert("All fields are required");
      return;
    }
    console.log(formData);
    // send to api
    try {
      const result = await loginMutation({ variables: {credentials: formData}})
      
      // login message
      console.log(result.data.login.message);


      // save token to local storage
      localStorage.setItem("token", result.data.login.token);
      localStorage.setItem("userId", result.data.login.user.id);

      console.log("current user token: ", localStorage.getItem("token"));
      console.log("current user id: ", localStorage.getItem("userId"));

    } catch (error) {
      console.error(error);
    }
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

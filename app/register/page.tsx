"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/app/api/graphql/mutations/userMutations";

// experimenting with register mutation variable
// testing functionality, doesn't work yet
// goes with useMutation hook


export default function Register() {
  let MIN_USERNAME_LENGTH = 4;
  let MAX_USERNAME_LENGTH = 20;

  // useMutation hook
  const [registerMutation, { loading: registerLoading, error: registerError }] = useMutation(REGISTER_MUTATION);
  if (registerLoading) console.log("Registering user...");
  if (registerError) console.error(registerError);

  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    confirmPassword: "",
  });

  const [apiData, setApiData] = useState({
    user: {
      user_name: formData.user_name,
      password: formData.password,
      bio: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // if user_name is already taken, alert user

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
    console.log(formData);
    // send to api
    // experimenting. Try to register user with registerMutation, doesn't work yet
    try {
      const result = await registerMutation({ variables: { user: apiData } });
      console.log(result.data.register);
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

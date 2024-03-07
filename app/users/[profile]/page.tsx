"use client";

import { useState } from "react";

interface User {
  uid: string;
  username: string;
  email: string;
  bio: string;
}

export default function Page({ params }: { params: { uid: string } }) {

  const [userData, setUserData] = useState<User>({
    uid: params.uid,
    username: "user",
    email: "email@example.com",
    bio: "This is a bio"
  });

  // get user data from server using params.profile as uid
  // setUserData with the data from the server

  return (
    <div>
      <h1>{userData.username}</h1>
      <div>email: {userData.email}</div>
      <div>Bio: {userData.bio}</div>
    </div>
  );
}

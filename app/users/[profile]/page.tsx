"use client";

import { useState } from "react";

interface User {
  uid: string;
  user_name: string;
  bio: string;
}

export default function Page({ params }: { params: { uid: string } }) {

  const [userData, setUserData] = useState<User>({
    uid: params.uid,
    user_name: "user",
    bio: "This is a bio"
  });

  // get user data from server using params.profile as uid
  // setUserData with the data from the server

  return (
    <div>
      <h1>{userData.user_name}</h1>
      <div>Bio: {userData.bio}</div>
    </div>
  );
}

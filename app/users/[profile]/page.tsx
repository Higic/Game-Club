"use client";

import { GET_USER_BY_ID } from "@/app/api/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { getStaticProps } from "next/dist/build/templates/pages";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  uid: string;
  user_name: string;
  bio: string;
}


export default function Page({ params }: { params: { uid: string } }) {

  console.log("params: ", params);
  
  return (
    <div>
      <ProfileData id={params}/>
    </div>
  );
}

function ProfileData({id}: {id: string}) {

  const [userData, setUserData] = useState<User>({
    uid: "",
    user_name: "",
    bio: "",
  });

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userById: id},
  });

  if (loading) console.log("loading...");
  if (error) console.log("error: ", error);

  if (data) {
    console.log("data: ", data);
    setUserData({
      uid: data.userById.id,
      user_name: data.userById.user_name,
      bio: data.userById.bio,
    });
  }
  return (
    <div>
      <h1>{userData.user_name}</h1>
      <p>Bio: {userData.bio}</p>
    </div>
  )
}

"use client";

import { UPDATE_BIO_MUTATION } from "@/app/api/graphql/mutations/userMutations";
import { GET_USER_BY_ID } from "@/app/api/graphql/queries/userQueries";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { useMutation, useQuery } from "@apollo/client";
import { getStaticProps } from "next/dist/build/templates/pages";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
interface User {
  uid: string;
  user_name: string;
  bio: string;
}


export default function Page() {

  const [updateBioMutation, {loading: updateUserLoading, error: updateUserError}] = useMutation(UPDATE_BIO_MUTATION);
  const token = Cookies.get("token");
  const [bio, setBio] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const result = await updateBioMutation({variables: {bio: bio, token: token}});
      alert("Bio updated!");
    } catch (error) {
      console.log(error);
    }

    
  }

  

  const currentUser = GetLoggedInUser();

  return (
    <div>
      <div>
        <h1>Hello, {currentUser?.user_name}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="form-container">
                <h2>Bio</h2>
                <textarea
                    rows={4}
                    maxLength={200}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={currentUser?.bio ? currentUser.bio : "Write a bio here..."}
                    >
                </textarea>
                <input
                    type="submit"
                    value="Edit bio">
                </input>
            </form>
      </div>
    </div>
  );
}

function ProfileData({ id }: { id: string }) {
  const [userData, setUserData] = useState<User>({
    uid: "",
    user_name: "",
    bio: "",
  });

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userById: id },
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
      <h1>Name: {userData.user_name}</h1>
      <p>Bio: {userData.bio}</p>
    </div>
  );
}

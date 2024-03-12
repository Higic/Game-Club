"use client";

import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../api/graphql/queries/userQueries";
import { UserOutput } from "@/types/DBTypes";
import { UPDATE_BIO_MUTATION } from "../api/graphql/mutations/userMutations";


function Users () {
  const { loading, error, data } = useQuery(GET_ALL_USERS); 
  return (
    <div>
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: ${error.message}</p>}
      {data && data.users.map((user: UserOutput) => (
        <div key={user.id} className="post">
          <p>name: {user.user_name}, </p>
          <p>id: {user.id}, </p>
          <p>bio: {user.bio}</p>
        </div>
      ))}
    </div>
  );
}

function UpdateBio() {


  const [updateBioMutation, {loading: updateUserLoading, error: updateUserError}] = useMutation(UPDATE_BIO_MUTATION);

  const handleUpdate = async () => {
    console.log("Updating user...");

    const formData = {
      bio: "this is a test"
    }

    try {
      const result = await updateBioMutation({variables: {bio: "65ef54c456be0c640735155f"}});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleUpdate}>
      Update bio
    </button>
  )
}

function CreateForumPost() {
  
  return (
    <button>
      Create forum post
    </button>
  )
}

function CreateForumComment() {

  return (
    <button>
      Create forum comment
    </button>
  )
}

function CreateReview() {
  
    return (
      <button>
        Create review
      </button>
    )
  
}


export default function Debug() {
  return (
    <div>
      <h1>Debug page</h1>
      <div>
        <h2>Queries</h2>
        <div>
          <button>users</button>
          <Users></Users>
          <UpdateBio></UpdateBio>
          <button>usersById</button>
          <button>reviewsByGame</button>
          <button>reviewById</button>
          <button>lfgByUser</button>
          <button>lfgByUserlfgById</button>
          <button>lfgByGame</button>
          <button>games</button>
          <button>gameByName</button>
          <button>gameById</button>
          <button>forumPostsBygame</button>
          <button>forumPostByAuthor</button>
          <button>forumPostById</button>
          <button>forumCommentsByPost</button>
          <button>forumCommentsByAuhtor</button>
          <button>forumCommentById</button>
          <button>checkToken</button>
        </div>
      </div>
      <div>
        <h2>Mutations</h2>
        <div>
          <button>updateUser</button>
          <button>updateReview</button>
          <button>updateGame</button>
          <button>updateForumPost</button>
          <button>updateForumComment</button>
          <button>register</button>
          <button>login</button>
          <button>deleteUser</button>
          <button>deleteReview</button>
          <button>deleteLfg</button>
          <button>deleteGame</button>
          <button>deleteForumPost</button>
          <button>deleteForumComment</button>
          <button>createReview</button>
          <button>createLfg</button>
          <button>createForumPost</button>
          <button>createForumComment</button>
          <button>adminUpdateUser</button>
          <button>adminDeleteUser</button>
        </div>
      </div>
    </div>
  );
}

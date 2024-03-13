"use client";

import { useMutation, useQuery } from "@apollo/client";
import { CHECK_TOKEN, GET_ALL_USERS, GET_USER_BY_ID } from "../api/graphql/queries/userQueries";
import { Game, Review, ReviewInput, ReviewModify, TokenContent, UserOutput } from "@/types/DBTypes";
import { UPDATE_BIO_MUTATION } from "../api/graphql/mutations/userMutations";
import { CREATE_REVIEW_MUTATION, UPDATE_REVIEW_MUTATION } from "../api/graphql/mutations/reviewMutations";
import { CREATE_LFG_MUTATION } from "../api/graphql/mutations/lfgMutations";
import Cookies from "js-cookie";
import GetLoggedInUser from "@/components/getLoggedInUser";
import { GET_REVIEWS_BY_AUTHOR, GET_REVIEWS_BY_GAME, GET_REVIEW_BY_ID } from "../api/graphql/queries/reviewQueries";
import { useState } from "react";

/**
 * This file contains the debug page of the app. Used for testing the earlier versions of the functions.
 */

function CheckToken () {
  const token = Cookies.get("token");
  const { loading, error, data } = useQuery(CHECK_TOKEN, {
    variables: {token: token},
  });
  return (
    <div>
      <h2>Check token</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>message: {data.checkToken.message}</p>}
    </div>
  )

}

function Users () {
  const { loading, error, data } = useQuery(GET_ALL_USERS); 
  return (
    <div>
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
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

function UserById() {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: {userById: "65ef54c456be0c640735155f"}
  });
  return (
    <div>
      <h2>User by ID</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && 
        <div>
          <p>name: {data.userById.user_name}, </p>
          <p>id: {data.userById.id}, </p>
          <p>bio: {data.userById.bio}</p>
        </div>
      }
    </div>
  )
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

  
  const [createReviewMutation, {loading: createReviewLoading, error: createReviewError}] = useMutation(CREATE_REVIEW_MUTATION);
  
  const author = GetLoggedInUser();
  const token = Cookies.get("token");
  
  if (!author || !token) {
    console.log("No user logged in");
    return null;
  }
  
  
    const formData: ReviewInput = {
      text: "This is a test review",
      game: "Metal Gear Rising 2 - Revengeance",
      author: author.user_name,
      score: 5,
    }

  const handleCreate = async () => {

    try {
      const result = await createReviewMutation({variables: {input: formData}});
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
      <button onClick={handleCreate}>
        Create review
      </button>
    )
  
}

function ReviewById () {
  const [reviewId, setReviewId] = useState("65f1b46d8c79d12ef0b5d026");
  const { loading, error, data } = useQuery(GET_REVIEW_BY_ID, {
    variables: {reviewById: reviewId}
  });
  return (
    <div>
      <h2>Review by ID</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && 
        <div className="post">
          <p>game: {data.reviewById.game}, </p>
          <p>author: {data.reviewById.author}, </p>
          <p>score: {data.reviewById.score}, </p>
          <p>text: {data.reviewById.text}</p>
        </div>
      }
    </div>
  )
}

function ReviewsByGame () {
  const [gameName, setGameName] = useState("Metal Gear Rising 2 - Revengeance");
  const { loading, error, data } = useQuery(GET_REVIEWS_BY_GAME, {
    variables: {reviewsByGame: gameName}
  }); 

  return (
    <div>
      <h2>Reviews by game {gameName}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.reviewsByGame.map((review: Review) => (
        <div key={review.id} className="post">
          <p>game: {review.game}, </p>
          <p>author: {review.author}, </p>
          <p>score: {review.score}, </p>
          <p>text: {review.text}</p>
        </div>
      
      ))}
    </div>
  );
}

function ReviewsByAuthor () {
  const [authorName, setAuthorName] = useState("admin");
  const { loading, error, data } = useQuery(GET_REVIEWS_BY_AUTHOR, {
    variables: {reviewsByAuthor: authorName}
  });

  return (
    <div>
      <h2>Reviews by author {authorName}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.reviewsByAuthor.map((review: Review) => (
        <div key={review.id} className="post">
          <p>game: {review.game}, </p>
          <p>author: {review.author}, </p>
          <p>score: {review.score}, </p>
          <p>text: {review.text}</p>
        </div>
      ))}
    </div>
  );
}

function UpdateReview() {
  const [reviewId, setReviewId] = useState("65f1b46d8c79d12ef0b5d026"); // Used for getting the review id to edit
  const [newReviewData, setNewReviewData] = useState<ReviewModify>({
    score: 1,
    text: "This is a new review"
  }); // new edited review data

  const [updateReviewMutation, {loading: updateReviewLoading, error: updateReviewError}] = useMutation(UPDATE_REVIEW_MUTATION);

  const handleUpdate = async () =>  {
    try {
      const result = updateReviewMutation({variables: {updateReviewId: reviewId, input: newReviewData}});
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <h2>Update review</h2>
      <button onClick={handleUpdate}>
        Update review
      </button>
    </div>
  
  )
}



function CreateLfg() {

  const [createLfgMutation, {loading: createLfgLoading, error: createLfgError}] = useMutation(CREATE_LFG_MUTATION);

  const formData = {
    text: "This is a test LFG",
    game: "Metal Gear Rising 2 - Revengeance"
  }

  // Note, when using this, get the formData from the DOM


  const handleCreate = async () => {
    console.log("Creating LFG...");

    try {
      const result = await createLfgMutation({variables: {input: formData}})
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <button onClick={handleCreate}>
      Create LFG
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
          <UserById></UserById>
          <ReviewsByGame></ReviewsByGame>
          <ReviewsByAuthor></ReviewsByAuthor>
          <ReviewById></ReviewById>
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
          <CheckToken></CheckToken>
        </div>
      </div>
      <div>
        <h2>Mutations</h2>
        <div>
          <button>updateUser</button>
          <UpdateReview></UpdateReview>
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
          <CreateReview></CreateReview>
          <CreateLfg></CreateLfg>
          <button>createForumPost</button>
          <button>createForumComment</button>
        </div>
      </div>
    </div>
  );
}

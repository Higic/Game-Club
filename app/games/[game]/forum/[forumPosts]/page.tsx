"use client";

import { GET_FORUM_POST_BY_ID } from "@/app/api/graphql/queries/forumQueries";
import { useQuery } from "@apollo/client";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import ForumCommentForm from "./forumCommentForm";
import GetForumComment from "./forumComment";


export default function Page({ params }: { params: { forumPost: string } }) {

  const [forumPost, setForumPosts] = useState("");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const forumPosts = pathParts[4];
    setForumPosts(forumPosts);
  }, []);

  var forum = {
    id: "",
    author: "",
    title: "",
    text: ""
  }
  try {
    const { loading, error, data } = useQuery(GET_FORUM_POST_BY_ID, {
      variables: { forumPostById: forumPost },
    });
    if (loading) return console.log("Loading...");
    if (error) return console.log("Error: ", error);
    if (data) {
      forum = { id: data.forumPostById.id, author: data.forumPostById.author, title: data.forumPostById.title, text: data.forumPostById.text }
    }
  } catch (error) {
    console.log("Error: ", error);
    return
  } finally {
    console.log("Forum: ", forum);

    return (
      <div>
        <h1>{forum.title}</h1>
        <div>
          <p>{forum.text}</p>
        </div>
        <div>
          {ForumCommentForm(forum.id)}
        </div>
        <div>
          {GetForumComment(forum.id)}
        </div>
      </div>
    )
  }
}

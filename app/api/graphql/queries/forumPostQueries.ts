import { gql } from "@apollo/client";

/**
 * This file contains queries for the forumPost api.
 */
export const GET_FORUM_POST_BY_ID = gql`
query Query($forumPostById: ID!) {
  forumPostById(id: $forumPostById) {
    author {
      user_name
      id
      bio
    }
    text
    title
  }
}
`;
import { gql } from "@apollo/client";

/**
 * This file contains queries for the forumPost api.
 */
export const GET_FORUM_POST_BY_ID = gql`
query Query($forumPostById: ID!) {
  forumPostById(id: $forumPostById) {
    id
    author
    text
    title
  }
}
`;

export const GET_FORUM_POSTS_BY_GAME = gql`
query Query($game: String!) {
  forumPostsByGame(game: $game) {
    id
    author
    text
    title
  }
}
`;

export const GET_FORUM_COMMENTS_BY_POST = gql`
query Query($forumPostId: String!) {
  forumCommentsByPost(forumPostId: $forumPostId) {
    id
    forumPostId
    author
    text
  }
}
`;
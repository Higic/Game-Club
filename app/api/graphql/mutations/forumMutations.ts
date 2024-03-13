import { gql } from "@apollo/client";


/**
 * This file contains mutations for the forum api.
 */
export const CREATE_FORUM_POST_MUTATION = gql`
  mutation Mutation($input: ForumPostInput) {
    createForumPost(input: $input) {
      id
      author
      title
      text
      game
    }
  }
`;

export const CREATE_FORUM_COMMENT_MUTATION = gql`
  mutation Mutation($text: String!) {
    createForumComment(text: $text) {
      id
      forumPostId
      text
      author
    }
  }
`;

export const DELETE_FORUM_POST_MUTATION = gql`
  mutation Mutation($deleteForumPostId: ID!) {
    deleteForumPost(id: $deleteForumPostId) {
      id
      title
      text
      game
      author
    }
  }
`;

export const DELETE_FORUM_COMMENT_MUTATION = gql`
  mutation Mutation($deleteForumCommentId: ID!) {
    deleteForumComment(id: $deleteForumCommentId) {
      id
      forumPostId
      text
      author
    }
  }
`;

export const UPDATE_FORUM_POST_MUTATION = gql`
  mutation Mutation($input: ForumPostInput) {
    updateForumPost(input: $input) {
      id
      title
      text
      game
      author
    }
  }
`;

export const UPDATE_FORUM_COMMENT_MUTATION = gql`
  mutation Mutation($text: String!) {
    updateForumComment(text: $text) {
      id
      forumPostID
      text
      author
    }
  }
`;

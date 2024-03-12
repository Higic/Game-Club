import { gql } from "@apollo/client";

export const CREATE_FORUM_POST_MUTATION = gql`
  mutation Mutation($input: ForumPostInput) {
    createForumPost(input: $input) {
      id
      title
      text
      game
      author {
        user_name
        id
        bio
      }
    }
  }
`;

export const CREATE_FORUM_COMMENT_MUTATION = gql`
  mutation Mutation($text: String!) {
    createForumComment(text: $text) {
      id
      forumPostId
      text
      author {
        user_name
        id
        bio
      }
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
      author {
        user_name
        id
        bio
      }
    }
  }
`;

export const DELETE_FORUM_COMMENT_MUTATION = gql`
  mutation Mutation($deleteForumCommentId: ID!) {
    deleteForumComment(id: $deleteForumCommentId) {
      id
      forumPostId
      text
      author {
        user_name
        id
        bio
      }
    }
  }
`;

export const UPDATE_FORUM_POST_MUTATION = gql`
  mutation Mutation($input: ForumPostInput) {
    updateForumPost(input: $input) {
      id
      tittle
      text
      game
      author {
        user_name
        id
        bio
      }
    }
  }
`;

export const UPDATE_FORUM_COMMENT_MUTATION = gql`
  mutation Mutation($text: String!) {
    updateForumComment(text: $text) {
      id
      forumPostID
      text
      author {
        id
        user_name
        bio
      }
    }
  }
`;

import { gql } from "@apollo/client";

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
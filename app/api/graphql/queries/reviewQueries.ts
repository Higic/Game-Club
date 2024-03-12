import { gql } from "@apollo/client";

export const GET_REVIEW_BY_ID = gql`
query Query($reviewById: ID!) {
  reviewById(id: $reviewById) {
    game
    author {
      user_name
      id
      bio
    }
    score
    text
  }
}
`;

export const GET_REVIEWS_BY_GAME = gql`
query Query($reviewsByGame: String!) {
  reviewsByGame(game: $reviewsByGame) {
    game
    author {
      user_name
      id
      bio
    }
    score
    text
  }
}
`;

export const GET_REVIEWS_BY_AUTHOR = gql`
query Query($reviewsByAuthor: ID!) {
  reviewsByAuthor(author: $reviewsByAuthor) {
    game
    author {
      user_name
      id
      bio
    }
    score
    text
  }
}
`;
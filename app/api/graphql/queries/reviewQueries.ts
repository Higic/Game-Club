import { gql } from "@apollo/client";

/**
 * This file contains queries for the review api.
 */
export const GET_REVIEW_BY_ID = gql`
query Query($reviewById: ID!) {
  reviewById(id: $reviewById) {
    game
    author
    score
    text
  }
}
`;

export const GET_REVIEWS_BY_GAME = gql`
query Query($reviewsByGame: String!) {
  reviewsByGame(game: $reviewsByGame) {
    id
    game
    author
    score
    text
  }
}
`;

export const GET_REVIEWS_BY_AUTHOR = gql`
query Query($reviewsByAuthor: ID!) {
  reviewsByAuthor(author: $reviewsByAuthor) {
    game
    author
    score
    text
  }
}
`;
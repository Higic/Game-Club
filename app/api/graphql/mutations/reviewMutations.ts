import { gql } from "@apollo/client";

/**
 * This file contains mutations for the review api.
 */
export const CREATE_REVIEW_MUTATION = gql`
  mutation Mutation($input: ReviewInput) {
    createReview(input: $input) {
      id
      text
      game
      author
      score
    }
  }
`;

export const UPDATE_REVIEW_MUTATION = gql`
  mutation Mutation($updateReviewId: ID!, $input: ReviewModify) {
    updateReview(id: $updateReviewId, input: $input) {
      id
      text
      score
      game
      author
    }
  }
`;

export const DELETE_REVIEW_MUTATION = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId) {
      id
      text
      score
      game
      author
    }
  }
`;

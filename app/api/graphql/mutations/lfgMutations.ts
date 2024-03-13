import { gql } from "@apollo/client";

/**
 * This file contains mutations for the lfg api.
 */
export const CREATE_LFG_MUTATION = gql`
mutation Mutation($input: LFGInput) {
  createLfg(input: $input) {
    id
    text
    game
    author
  }
}
`;

export const DELETE_LFG_MUTATION = gql`
  mutation Mutation($deleteLfgId: ID!) {
    deleteLfg(id: $deleteLfgId) {
      id
      text
      game
      user {
        id
        user_name
        bio
      }
    }
  }
`;

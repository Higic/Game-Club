import { gql } from "@apollo/client";

export const CREATE_LFG_MUTATION = gql`
mutation Mutation($input: LFGInput) {
  createLfg(input: $input) {
    user {
      user_name
      id
      bio
    }
    text
    id
    game
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

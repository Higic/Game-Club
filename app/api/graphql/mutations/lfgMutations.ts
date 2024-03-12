import { gql } from "@apollo/client";

export const CREATE_LFG_MUTATION = gql`
createLfg(input: $input) {
    id
    text
    game
    user {
      user_name
      id
      bio
    }
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

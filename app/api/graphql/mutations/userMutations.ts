import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
mutation Mutation($user: UserInput!) {
  register(user: $user) {
    message
    user {
      bio
      id
      user_name
    }
  }
}
`;


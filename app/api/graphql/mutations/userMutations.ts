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

export const LOGIN_MUTATION = gql`
mutation Mutation($user: UserInput!) {
  login(user: $user) {
    message
    user {
      id
      user_name
    }
  }
}
`;

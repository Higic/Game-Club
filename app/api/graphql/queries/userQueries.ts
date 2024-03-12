import { gql } from "@apollo/client";

/**
 * This file contains queries for the user api.
 */
export const GET_USER_BY_ID = gql`
query Query($userById: ID!) {
  userById(id: $userById) {
    bio
    id
    user_name
  }
}
`;

export const GET_ALL_USERS = gql`
query Query {
  users {
    id
    user_name
    bio
  }
}
`;

export const CHECK_TOKEN = gql`
query Query($token: ID!) {
  checkToken(token: $token) {
    message
    user {
      bio
      id
      user_name
    }
  }
}
`;



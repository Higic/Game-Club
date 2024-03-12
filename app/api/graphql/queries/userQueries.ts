import { gql } from "@apollo/client";

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
query Query {
  checkToken {
    message
  }
}
`;



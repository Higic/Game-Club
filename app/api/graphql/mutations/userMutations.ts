import { gql } from "@apollo/client";

/**
 * This file contains mutations for the user api.
 */
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
mutation Mutation($credentials: Credentials!) {
  login(credentials: $credentials) {
    user {
      user_name
      id
      bio
    }
    token
    message
  }
}
`;

export const UPDATE_USER_MUTATION = gql`
mutation Mutation($user: UserModify!) {
  updateUser(user: $user) {
    user {
      user_name
      id
      bio
    }
  }
}
`;

export const UPDATE_BIO_MUTATION = gql`
mutation Mutation($bio: String!) {
  updateBio(bio: $bio) {
    user {
      user_name
      id
      bio
    }
  }
}
`;

export const DELETE_USER_MUTATION = gql`
mutation Mutation {
  deleteUser {
    user {
      bio
      user_name
      id
    }
    message
  }
}
`;

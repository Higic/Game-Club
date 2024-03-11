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
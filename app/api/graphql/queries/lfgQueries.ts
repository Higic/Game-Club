import { gql } from "@apollo/client";

export const GET_LFG_BY_ID = gql`
query Query($lfgById: ID!) {
  lfgById(id: $lfgById) {
    game
    author {
      user_name
      id
      bio
    }
    text
  }
}
`;

export const GET_LFG_BY_GAME = gql`
query Query($lfgByGame: String!) {
  lfgByGame(game: $lfgByGame) {
    game
    author {
      user_name
      id
      bio
    }
    text
  }
}
`;

export const GET_LFG_BY_USER = gql`
query Query($lfgByUser: ID!) {
  lfgByUser(user: $lfgByUser) {
    game
    author {
      user_name
      id
      bio
    }
    text
  }
}
`;

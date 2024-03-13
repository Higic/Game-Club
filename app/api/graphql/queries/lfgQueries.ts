import { gql } from "@apollo/client";

/**
 * This file contains queries for the lfg api.
 */
export const GET_LFG_BY_ID = gql`
query Query($lfgById: ID!) {
  lfgById(id: $lfgById) {
    game
    author
    text
  }
}
`;

export const GET_LFG_BY_GAME = gql`
query Query($lfgByGame: String!) {
  lfgByGame(game: $lfgByGame) {
    id
    game
    author
    text
  }
}
`;

export const GET_LFG_BY_USER = gql`
query Query($lfgByUser: ID!) {
  lfgByUser(user: $lfgByUser) {
    game
    author
    text
  }
}
`;

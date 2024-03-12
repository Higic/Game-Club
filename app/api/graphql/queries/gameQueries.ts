import { gql } from "@apollo/client";

/**
 * This file contains queries for the game api.
 */
export const GET_ALL_GAMES = gql`
query Query {
  games {
    id
    game_name
    description
    publisher
    genre
  }
}
`;

export const GET_GAME_BY_ID = gql`
query Query($gameById: ID!) {
  gameById(id: $gameById) {
    game_name
    description
    publisher
    genre
  }
}
`;

export const GET_GAME_BY_NAME = gql`
query Query($gameByName: String!) {
  gameByName(game_name: $gameByName) {
    game_name
    description
    publisher
    genre
  }
}
`;
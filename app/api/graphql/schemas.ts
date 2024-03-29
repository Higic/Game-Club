/**
 * This file contains the schema for the GraphQL API
 * Contains the types and queries for the API
 */
const typeDefs = `#graphql
type ForumComment {
    id: ID!
    forumPostId: String!
    author: String!
    text: String!
}

type ForumPost {
    id: ID!
    game: String!
    author: String!
    title: String!
    text: String!
}

input ForumPostInput {
    title: String!
    text: String!
    author: String!
    game: String!
}

input ForumCommentInput {
    text: String!
    forumPostId: String!
    author: String!
}


type LFG {
    id: ID!
    game: String!
    author: String!
    text: String!
}

input LFGInput {
    text: String!
    game: String!
    author: String!
}

type Review {
    id: ID!
    game: String!
    author: String!
    score: Int!
    text: String!
}

input ReviewInput {
    text: String!
    game: String!
    author: String!
    score: Int!
}

input ReviewModify {
    score: Int!
    text: String!
}

type User {
    id: ID!
    user_name: String!
    bio: String
}

type Game {
    id: ID!
    gameName: String!
    publisher: String!
    genre: String!
}

input GameInput {
    gameName: String!
    publisher: String!
    genre: String!
}

input GameModify {
    publisher: String!
    genre: String!
}

type LoginResponse {
  token: String
  message: String!
  user: User!
}

type UserResponse {
  message: String!
  user: User!
}

input Credentials {
  user_name: String!
  password: String!
}

input UserInput {
  user_name: String!
  password: String!
  bio: String
}

input UserModify {
  user_name: String
  password: String
}

type Query {
    users: [User]
    userById(id: ID!): User
    checkToken(token: ID!): UserResponse
    games: [Game]
    gameById(id: ID!): Game
    gameByName(gameName: String!): Game
    reviewById(id: ID!):Review
    reviewsByGame(game: String!): [Review]
    reviewsByAuthor(author: String!): [Review]
    lfgById(id: ID!): LFG
    lfgByAuthor(userId: ID!): [LFG]
    lfgByGame(game: String!): [LFG]
    forumPostById(id: ID!): ForumPost
    forumPostsByGame(game: String!): [ForumPost]
    forumPostsByAuthor(author: String!): [ForumPost]
    forumCommentsByPost(forumPostId: String): [ForumComment]
    forumCommentsByAuthor(author: String!): [ForumComment]
    forumCommentById(id: ID!): ForumComment  
}

type Mutation {
    login(credentials: Credentials!): LoginResponse
    register(user: UserInput!): UserResponse
    updateUser(user: UserModify!): UserResponse
    updateBio(bio: String!, token: String!): UserResponse
    deleteUser: UserResponse
    createGame(input: GameInput): Game
    updateGame(id: ID!, input: GameModify): Game
    deleteGame(id: ID!): Game
    createReview(input: ReviewInput): Review
    updateReview(id: ID!, input: ReviewModify): Review
    deleteReview(id: ID!): Review
    createLfg(input: LFGInput): LFG
    deleteLfg(id: String!): LFG
    createForumPost(input: ForumPostInput): ForumPost
    updateForumPost(input: ForumPostInput): ForumPost
    deleteForumPost(id: ID!): ForumPost
    createForumComment(input: ForumCommentInput): ForumComment
    updateForumComment(text: String!): ForumComment
    deleteForumComment(id: ID!): ForumComment
}
`

export default typeDefs;
const typeDefs = `#graphql
type ForumComment {
    id: ID!
    forumPostID: ID!
    author: User!
    text: String!
}

type ForumPost {
    id: ID!
    game: String!
    author: User!
    tittle: String!
    text: String!
}

input ForumPostInput {
    tittle: String!
    text: String!
}

type LFG {
    id: ID!
    game: String!
    user: User!
    text: String!
}

input LFGInput {
    game: String!
    text: String!
}

type Review {
    id: ID!
    game: String!
    author: User!
    score: Int!
    text: String!
}

input ReviewInput {
    game: String!
    score: Int!
    text: String!
}

input ReviewModify {
    score: Int!
    text: String!
}

type User {
    id: ID!
    user_name: String!
    email: String!
    bio: String
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
  email: String!
  password: String!
  bio: String
}

input UserModify {
  user_name: String
  email: String
  password: String
}

type Query {
    users: [User]
    userById(id: ID!): User
    checkToken: UserResponse
    reviewById(id: ID!):Review
    reviewsByGame(game: String!): [Review]
    reviewsByAuthor(authorId: ID!): [Review]
    lfgById(id: ID!): LFG
    lfgByUser(userId: ID!): [LFG]
    lfgByGame(game: String!): [LFG]
    forumPostById(id: ID!): ForumPost
    forumPostsByGame(game: String!): [ForumPost]
    forumPostsByAuthor(authorId: ID!): [ForumPost]
    forumCommentsByPost(forumPostID: ID!): [ForumComment]
    forumCommentsByAuthor(authorId: ID!): [ForumComment]
    forumCommentById(id: ID!): ForumComment  
}

type Mutation {
    login(credentials: Credentials!): LoginResponse
    register(user: UserInput!): UserResponse
    updateUser(user: UserModify!): UserResponse
    deleteUser: UserResponse
    adminUpdateUser(user: UserModify!, id: ID!): UserResponse
    adminDeleteUser(id: ID!): UserResponse
    createReview(input: ReviewInput): Review
    updateReview(id: ID!, input: ReviewModify): Review
    deleteReview(id: ID!): Review
    createLfg(input: LFGInput): LFG
    deleteLfg(id: ID!): LFG
    createForumPost(input: ForumPostInput): ForumPost
    updateForumPost(input: ForumPostInput): ForumPost
    deleteForumPost(id: ID!): ForumPost
    createForumComment(text: String!): ForumComment
    updateForumComment(text: String!): ForumComment
    deleteForumComment(id: ID!): ForumComment
}
`

export default typeDefs;
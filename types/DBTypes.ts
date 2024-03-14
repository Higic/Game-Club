import {Document, Types} from 'mongoose';

/**
 * Here lies the types for the database models
 */

 /* User */
type User = Partial<Document> &{
    id: Types.ObjectId | string;
    user_name: string;
    password: string;
    bio: string | null;
}

type UserOutput = Omit<User, 'password'>;

type UserInput = Omit<User, 'id'>;

type UserTest = Partial<User>;

type Credentials = Pick<User, 'user_name' | 'password'>;

type TokenContent = {
    token: string;
    user: UserOutput;
}

/* Review */
type Review = {
    id?: string;
    game: string;
    author: string;
    score: number;
    text: string | null;
}

type ReviewTest = Partial<Review>;

type ReviewInput = Omit<Review, 'id'>;

type ReviewModify = Omit<Review, 'game' | 'author' | 'id'>;

/* LFG */
type LFG = {
    id?: string;
    game: string;
    author: string;
    text: string | null;
}

type LFGTest = Partial<LFG>;

type LFGInput = Omit<LFG, 'id'>;

/* Forum */
type ForumPost = {
    id?: string;
    game: string;
    author: string;
    title: string;
    text: string;
}

type ForumPostTest = Partial<ForumPost>;

type ForumPostInput = Omit<ForumPost, 'id'>;

type ForumPostUpdate = Omit<ForumPost, 'game' | 'author' | 'id'>;

type ForumComment = {
    id: Types.ObjectId | string;
    forumPostId: string;
    author: string;
    text: string;
}

type ForumCommentInput = Omit<ForumComment, 'id'>;

type ForumCommentUpdate = Pick<ForumComment, 'text'>;

/* Game */
type Game = {
    id: Types.ObjectId | string;
    gameName: string;
    publisher: string;
    genre: string;
}

type GameInput = Omit<Game, 'id'>;

type GameUpdate = Partial<Omit<Game, 'id'>>;

export type {
    User,
    UserInput,
    UserOutput,
    UserTest,
    Credentials,
    TokenContent,
    Review,
    ReviewTest,
    ReviewInput,
    ReviewModify,
    LFG,
    LFGTest,
    LFGInput,
    ForumPost,
    ForumPostTest,
    ForumPostInput,
    ForumPostUpdate,
    ForumComment,
    ForumCommentInput,
    ForumCommentUpdate,
    Game,
    GameInput,
    GameUpdate,
};
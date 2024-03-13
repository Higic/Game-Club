import {Document, Types} from 'mongoose';

/**
 * Here lies the types for the database models
 */
type User = Partial<Document> &{
    id: Types.ObjectId | string;
    user_name: string;
    password: string;
    bio: string | null;
}

type UserOutput = Omit<User, 'password'>;

type UserInput = Omit<User, 'id'>;

type Credentials = Pick<User, 'user_name' | 'password'>;

type Review = {
    id?: string;
    game: string;
    author: string;
    score: number;
    text: string | null;
}

type ReviewInput = Omit<Review, 'id'>;

type ReviewModify = Omit<Review, 'game' | 'author' | 'id'>;

type LFG = {
    id?: string;
    game: string;
    author: string;
    text: string | null;
}

type LFGInput = Omit<LFG, 'id'>;

type ForumPost = {
    id: Types.ObjectId | string;
    game: string;
    author: string;
    title: string;
    text: string;
}

type ForumPostInput = Omit<ForumPost, 'id'>;

type ForumPostUpdate = Omit<ForumPost, 'game' | 'author' | 'id'>;

type ForumComment = {
    id: Types.ObjectId | string;
    forumPostId: Types.ObjectId | string;
    author: Types.ObjectId | string;
    text: string;
}

type ForumCommentInput = Omit<ForumComment, 'id'>;

type ForumCommentUpdate = Pick<ForumComment, 'text'>;

type TokenContent = {
    token: string;
    user: UserOutput;
}

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
    Credentials, 
    Review,
    ReviewInput,
    ReviewModify,
    LFG, 
    LFGInput,
    ForumPost, 
    ForumPostInput,
    ForumPostUpdate,
    ForumComment, 
    ForumCommentInput,
    ForumCommentUpdate,
    TokenContent,
    Game,
    GameInput,
    GameUpdate
};
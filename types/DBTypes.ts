import {Date, Document, Types} from 'mongoose';


type User = Partial<Document> &{
    id: Types.ObjectId | string;
    user_name: string;
    password: string;
    role: 'user' | 'admin';
    bio: string | null;
}

type UserOutput = Pick<User, 'id' | 'user_name' | 'bio'>;

type UserInput = Omit<User, 'id' | 'role'>;

type LoginUser = Omit<User, 'password'>;

type Credentials = Pick<User, 'user_name' | 'password'>;

type Review = {
    id?: Types.ObjectId | string;
    game_id: Types.ObjectId | string;
    author: Types.ObjectId | User;
    score: number;
    text: string | null;
}

type ReviewInput = Omit<Review, 'id'>;

type ReviewUpdate = Omit<Review, 'game' | 'author' | 'id'>;

type LFG = {
    id: Types.ObjectId | string;
    game_id: Types.ObjectId | string;
    author: Types.ObjectId | string;
    text: string;
}

type LFGInput = Omit<LFG, 'id'>;

type ForumPost = {
    id: Types.ObjectId | string;
    game_id: Types.ObjectId | string;
    author: Types.ObjectId | string;
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
    user: LoginUser;
}

type Game = {
    id: Types.ObjectId | string;
    game_name: string;
    publisher: string;
    genre: string;
    releaseDate: Date;
}


export type {
    User, 
    UserInput, 
    UserOutput, 
    LoginUser, 
    Credentials, 
    Review,
    ReviewInput,
    ReviewUpdate,
    LFG, 
    LFGInput,
    ForumPost, 
    ForumPostInput,
    ForumPostUpdate,
    ForumComment, 
    ForumCommentInput,
    ForumCommentUpdate,
    TokenContent,
    Game
};
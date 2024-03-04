import {Document, Types} from 'mongoose';


type User = {
    id: Types.ObjectId | string;
    username: string;
    password: string;
    role: 'user' | 'admin';
    bio: string | null;
}

type UserOutput = Omit<User, 'password' | 'role'>;

type UserInput = Omit<User, 'id' | 'role'>;

type LoginUser = Omit<User, 'password'>;

type Credentials = Pick<User, 'username' | 'password'>;

type Review = {
    id: Types.ObjectId | string;
    game: string;
    user: Types.ObjectId | string;
    score: number;
    text: string | null;
}

type LFG = {
    id: Types.ObjectId | string;
    game: string;
    user: Types.ObjectId | string;
    text: string;
}

type ForumPost = {
    id: Types.ObjectId | string;
    game: string;
    user: Types.ObjectId | string;
    title: string;
    text: string;
}

type ForumComment = {
    id: Types.ObjectId | string;
    forumPostId: Types.ObjectId | string;
    user: Types.ObjectId | string;
    text: string;
}

type TokenContent = {
    token: string;
    user: LoginUser;
}


export type {
    User, 
    UserInput, 
    UserOutput, 
    LoginUser, 
    Credentials, 
    Review,
    LFG, 
    ForumPost, 
    ForumComment, 
    TokenContent
};
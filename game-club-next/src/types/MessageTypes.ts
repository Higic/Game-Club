import { Types } from "mongoose";
import { UserOutput } from "./DBTypes";

/*type Review = {
    id: Types.ObjectId | string; // review id
    game: string; // game id
    score: number;
    text: string;
    user: User["id"];
}

type Lfg = {
    id: Types.ObjectId | string; // lfg id
    game: string; // game id
    user: User["id"];
    text: string;


}

type ForumPost = {
    id: Types.ObjectId | string; // forum post id
    game: string; // game id
    title: string;
    text: string;
    user: User["id"];
}

type ForumComment = {
    id: Types.ObjectId | string; // comment id
    forumPostId: ForumPost["id"]; // original forum post id
    text: string;
    user: User["id"];
}*/

type MessageResponse = {
    message: string;
};

type ErrorResponse = MessageResponse & {
    stack?: string;
};

type UserResponse = MessageResponse & {
    user: UserOutput;
};

type LoginResponse = MessageResponse & {
    token: string;
    user: UserOutput;
};


export type {
    UserResponse,
    LoginResponse,
    MessageResponse,
    ErrorResponse
};

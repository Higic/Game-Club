import { Types } from "mongoose";
import { User } from "./DBTypes";

type Review = {
    id: Types.ObjectId | string; // review id
    game: string; // game id
    score: number;
    text: string;
    author: User["id"];
}

type Lfg = {
    id: Types.ObjectId | string; // lfg id
    game: string; // game id
    author: User["id"];
    text: string;


}

type ForumPost = {
    id: Types.ObjectId | string;
    game: string; // game id
    title: string;
    text: string;
    author: User["id"];
}

type ForumComment = {
    id: Types.ObjectId | string;
    forumPostId: ForumPost["id"];
    text: string;
    author: User["id"];
}

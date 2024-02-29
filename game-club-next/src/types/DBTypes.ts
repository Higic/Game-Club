import {Document, Types} from 'mongoose';


type User = {
    id: Types.ObjectId | string;
    username: string;
    password: string;
    role: 'user' | 'admin';
    bio: string | null;
}



export type {User};
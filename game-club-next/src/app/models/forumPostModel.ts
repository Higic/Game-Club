import { ForumPost } from "@/types/DBTypes";
import mongoose from "mongoose";


const forumPostModel = new mongoose.Schema<ForumPost>({
    game: {
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

export default mongoose.model<ForumPost>('ForumPost', forumPostModel);
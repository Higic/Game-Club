import { ForumPost } from "@/types/DBTypes";
import mongoose from "mongoose";


const forumPostModel = new mongoose.Schema<ForumPost>({
    game_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    author: {
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

export default mongoose.models.ForumPost || mongoose.model<ForumPost>('ForumPost', forumPostModel);
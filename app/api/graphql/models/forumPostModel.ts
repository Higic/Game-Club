import { ForumPost } from "@/types/DBTypes";
import mongoose from "mongoose";

/**
 * This file contains models for the forum posts. This is used by mongoose to create the schema.
 */

const forumPostModel = new mongoose.Schema<ForumPost>({
    game: {
        type: String, 
        required: true
    },
    author: {
        type: String,
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
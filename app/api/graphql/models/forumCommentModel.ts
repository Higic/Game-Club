import { ForumComment } from "@/types/DBTypes";
import mongoose from "mongoose";

/**
 * This file contains models for the forum comments. This is used by mongoose to create the schema.
 */
const forumCommentModel = new mongoose.Schema<ForumComment>({
    forumPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumPost', 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

export default mongoose.models.ForumComment || mongoose.model<ForumComment>('ForumComment', forumCommentModel);
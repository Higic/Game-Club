import { Review } from "@/types/DBTypes";
import mongoose from "mongoose";

/**
 * This file contains models for the reviews. This is used by mongoose to create the schema.
 */
const reviewModel = new mongoose.Schema<Review>({
    game: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    score: {
        type: Number, 
        required: true
    },
    text: {
        type: String,
        required: false
    }
});
export default mongoose.models.Review || mongoose.model<Review>('Review', reviewModel);
import { Review } from "@/types/DBTypes";
import mongoose from "mongoose";

const reviewModel = new mongoose.Schema<Review>({
    game: {
        type: String, 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
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
export default mongoose.model<Review>('Review', reviewModel);
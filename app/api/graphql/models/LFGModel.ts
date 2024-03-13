import { LFG } from "@/types/DBTypes";
import mongoose from "mongoose";

/**
 * This file contains models for the LFG. This is used by mongoose to create the schema.
 */
const lfgModel = new mongoose.Schema<LFG>({
    game_id: {
        type: mongoose.Schema.Types.ObjectId, 
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

export default mongoose.models.LFG || mongoose.model<LFG>('LFG', lfgModel);
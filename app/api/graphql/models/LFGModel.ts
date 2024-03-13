import { LFG } from "@/types/DBTypes";
import mongoose from "mongoose";

/**
 * This file contains models for the LFG. This is used by mongoose to create the schema.
 */
const lfgModel = new mongoose.Schema<LFG>({
    game: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

export default mongoose.models.LFG || mongoose.model<LFG>('LFG', lfgModel);
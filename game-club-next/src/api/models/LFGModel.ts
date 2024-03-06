import { LFG } from "@/types/DBTypes";
import mongoose from "mongoose";

const LFGModel = new mongoose.Schema<LFG>({
    game: {
        type: String, 
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

export default mongoose.model<LFG>('LFG', LFGModel);
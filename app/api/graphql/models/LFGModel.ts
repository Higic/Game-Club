import { LFG } from "@/types/DBTypes";
import mongoose from "mongoose";

const LFGModel = new mongoose.Schema<LFG>({
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

export default mongoose.models.LFG || mongoose.model<LFG>('LFG', LFGModel);
import { Game } from "@/types/DBTypes";
import mongoose from "mongoose";

const gameModel = new mongoose.Schema<Game>({
    game_name: {
        type: String,
        required: true,
        unique: true
    },
    publisher: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
});

export default mongoose.models.Game || mongoose.model<Game>('Game', gameModel);
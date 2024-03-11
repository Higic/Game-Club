import { Game, GameInput, GameUpdate } from "@/types/DBTypes";
import gameModel from "../models/gameModel";
import MyContext from "@/types/MyContext";
import { isAdmin } from "@/functions/authorize";

const gameResolver = {
    Query: {
        games: async () => {
            return await gameModel.find();
        },
        gameById: async (_: undefined, args: {id: string}) => {
            return await gameModel.findById(args.id);
        },
        gameByName: async (_: undefined, args: {game_name: string}) => {
            return await gameModel.findOne({game_name: args.game_name});
        }
    },

    Mutation: {
        createGame: async (_: undefined, args: {input: GameInput}, context: MyContext) => {
            isAdmin(context);
            return await gameModel.create(args.input);
        },
        updateGame: async (_: undefined, args: {id: string, input: GameUpdate}, context: MyContext) => {
            isAdmin(context);
            return await gameModel.findByIdAndUpdate(args.id, args.input, {new: true});
        },
        deleteGame: async (_: undefined, args: {id: string}, context: MyContext) => {
            isAdmin(context);
            return await gameModel.findByIdAndDelete(args.id);
        },
    }
};
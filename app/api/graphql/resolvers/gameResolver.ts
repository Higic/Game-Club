import { Game, GameInput, GameUpdate } from "@/types/DBTypes";
import gameModel from "../models/gameModel";
import MyContext from "@/types/MyContext";

/**
 * This file contains resolvers for apollo.
 */
const gameResolver = {
    Query: {
        games: async () => {
            return await gameModel.find();
        },
        gameById: async (_: undefined, args: {id: string}) => {
            return await gameModel.findById(args.id);
        },
        gameByName: async (_: undefined, args: {gameName: string}) => {
            return await gameModel.findOne({gameName: args.gameName});
        }
    },

    Mutation: {
        createGame: async (_: undefined, args: {input: GameInput}, context: MyContext) => {
            return await gameModel.create(args.input);
        },
        updateGame: async (_: undefined, args: {id: string, input: GameUpdate}, context: MyContext) => {
            return await gameModel.findByIdAndUpdate(args.id, args.input, {new: true});
        },
        deleteGame: async (_: undefined, args: {id: string}, context: MyContext) => {
            return await gameModel.findByIdAndDelete(args.id);
        },
    }
};

export default gameResolver;
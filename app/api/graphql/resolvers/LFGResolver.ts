import MyContext from "@/types/MyContext";
import { LFGInput } from "@/types/DBTypes";
import { isLoggedIn } from "@/functions/authorize";
import GetUserById from "@/components/getUserById";
import lfgModel from "../models/LFGModel";

/**
 * This file contains resolvers for the lfg api.
 */
const lfgResolver = {
    Query: {
        lfgById: async (_: undefined, args: { id: string }) => {
            return await lfgModel.findById(args.id);
        },
        lfgByGame: async (_: undefined, args: { game: string }) => {
            return await lfgModel.find({ game: args.game });
        },
        lfgByAuthor: async (_: undefined, args: { author: string }) => {
            return await lfgModel.find({ user: args.author });
        },
    },
    Mutation: {
        createLfg: async (_: undefined, args: { input: LFGInput }) => {
            return await lfgModel.create(args.input);
        },
        // update lfg be here
        deleteLfg: async (_: undefined, args: { id: string }, context: MyContext) => {
            const user = GetUserById(context.userdata?.user.id);
            return await lfgModel.findByIdAndDelete(args.id);
        },
    },
};

export default lfgResolver;
import MyContext from "@/types/MyContext";
import LFGModel from "../models/LFGModel";
import { LFGInput } from "@/types/DBTypes";
import { isLoggedIn } from "@/functions/authorize";

const LFGResolver = {
    Query: {
        lfgById: async (_: undefined, args: { id: string }) => {
            return await LFGModel.findById(args.id);
        },
        lfgByGame: async (_: undefined, args: { game: string }) => {
            return await LFGModel.find({ game: args.game });
        },
        lfgByUser: async (_: undefined, args: { user: string }) => {
            return await LFGModel.find({ user: args.user });
        },
    },
    Mutation: {
        createLfg: async (_: undefined, args: { input: LFGInput }, context: MyContext) => {
            isLoggedIn(context);
            args.input.user = context.userdata?.user.id;
            return await LFGModel.create(args.input);
        },
        deleteLfg: async (_: undefined, args: { id: string }, context: MyContext) => {
            isLoggedIn(context);
            if (context.userdata?.user.role !== 'admin') {
                const filter = {_id: args.id, user: context.userdata?.user.id};
                return await LFGModel.findOneAndDelete(filter);
            } else {
                return await LFGModel.findByIdAndDelete(args.id);
            }
        },
    },
};
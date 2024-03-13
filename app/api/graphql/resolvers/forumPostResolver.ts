import { ForumPostInput, ForumPostUpdate } from "@/types/DBTypes";
import forumPostModel from "../models/forumPostModel";
import { isLoggedIn } from "@/functions/authorize";
import MyContext from "@/types/MyContext";
import GetUserById from "@/components/getUserById";

/**
 * This file contains resolvers for the forumPost api.
 */
const forumPostResolver = {
    Query: {
        forumPostById: async (_: undefined, args: { id: string }) => {
            return await forumPostModel.findById(args.id);
        },
        forumPostsByAuthor: async (_: undefined, args: { author: string }) => {
            return await forumPostModel.find({ user: args.author });
        },
        forumPostsByGame: async (_: undefined, args: { game: string }) => {
            return await forumPostModel.find({ game: args.game });
        },
    },
    Mutation: {
        createForumPost: async (_: undefined, args: { input: ForumPostInput }, context: MyContext) => {
            args.input.author = context.userdata?.user.id;
            return await forumPostModel.create(args.input);
        },
        updateForumPost: async (_: undefined, args: { id: string, input: ForumPostUpdate }, context: MyContext) => {
            const filter = {_id: args.id, author: context.userdata?.user.id};
            return await forumPostModel.findByIdAndUpdate(filter, args.input, { new: true });
        },
        deleteForumPost: async (_: undefined, args: { id: string }, context: MyContext) => {
            const user = GetUserById(context.userdata?.user.id);
                return await forumPostModel.findByIdAndDelete(args.id);
            
        },
    },
};
export default forumPostResolver;
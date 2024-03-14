import { ForumCommentInput, ForumCommentUpdate } from "@/types/DBTypes";
import forumCommentModel from "../models/forumCommentModel";
import MyContext from "@/types/MyContext";
import { isLoggedIn } from "@/functions/authorize";
import GetUserById from "@/components/getUserById";

/**
 * This file contains resolvers for the forumComment api.
 */
const forumCommentResolver = {
    Query: {
        forumCommentById: async (_: undefined, args: { id: string }) => {
            return await forumCommentModel.findById(args.id);
        },
        forumCommentsByPost: async (_: undefined, args: { forumPostId: string }) => {
            return await forumCommentModel.find({ forumPostId: args.forumPostId });
        },
        forumCommentsByAuthor: async (_: undefined, args: { author: string }) => {
            return await forumCommentModel.find({ user: args.author });
        },
    },
    Mutation: {
        createForumComment: async (_: undefined, args: { input: ForumCommentInput }) => {
            return await forumCommentModel.create(args.input);
        },
        updateForumComment: async (_: undefined, args: { id: string, input: ForumCommentUpdate }, context: MyContext) => {
            const filter = {_id: args.id, author: context.userdata?.user.id};
            return await forumCommentModel.findByIdAndUpdate(filter, args.input, { new: true });
        },
        deleteForumComment: async (_: undefined, args: { id: string }) => {

            return await forumCommentModel.findOneAndDelete({_id: args.id});
        },
    },
};
export default forumCommentResolver;
import { ForumCommentInput, ForumCommentUpdate } from "@/types/DBTypes";
import forumCommentModel from "../models/forumCommentModel";
import MyContext from "@/types/MyContext";
import { isLoggedIn } from "@/functions/authorize";

const forumCommentResolver = {
    Query: {
        forumCommentById: async (_: undefined, args: { id: string }) => {
            return await forumCommentModel.findById(args.id);
        },
        forumCommentsByPost: async (_: undefined, args: { postId: string }) => {
            return await forumCommentModel.find({ post: args.postId });
        },
        forumCommentsByAuthor: async (_: undefined, args: { author: string }) => {
            return await forumCommentModel.find({ user: args.author });
        },
    },
    Mutation: {
        createForumComment: async (_: undefined, args: { input: ForumCommentInput }, context: MyContext) => {
            isLoggedIn(context);
            args.input.author = context.userdata?.user.id;
            return await forumCommentModel.create(args.input);
        },
        updateForumComment: async (_: undefined, args: { id: string, input: ForumCommentUpdate }, context: MyContext) => {
            isLoggedIn(context);
            const filter = {_id: args.id, author: context.userdata?.user.id};
            return await forumCommentModel.findByIdAndUpdate(filter, args.input, { new: true });
        },
        deleteForumComment: async (_: undefined, args: { id: string }, context: MyContext) => {
            isLoggedIn(context);
            if (context.userdata?.user.role !== 'admin') {
                const filter = {_id: args.id, user: context.userdata?.user.id};
                return await forumCommentModel.findOneAndDelete(filter);
            } else {
                return await forumCommentModel.findByIdAndDelete(args.id);
            }
        },
    },
};
export default forumCommentResolver;
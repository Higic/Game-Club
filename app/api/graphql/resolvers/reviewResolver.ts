import { Review, ReviewInput, ReviewModify, TokenContent } from "@/types/DBTypes";
import reviewModel from "../models/reviewModel";
import MyContext from "@/types/MyContext";
import { isLoggedIn } from "@/functions/authorize";
import GetUserById from "@/components/getUserById";

/**
 * This file contains resolvers for the review api.
 */
const reviewResolver = {
    Query: {
        reviewById: async (_: undefined, args: { id: string }) => {
            return await reviewModel.findById(args.id);
        },
        reviewsByGame: async (_: undefined, args: { game: string }) => {
            return await reviewModel.find({ game: args.game });
        },
        reviewsByAuthor: async (_: undefined, args: { author: string }) => {
            return await reviewModel.find({ author: args.author });
        },
    },
    Mutation: {
        createReview: async (_: undefined, args: { input: ReviewInput}) => {
            return await reviewModel.create(args.input);
        },
        updateReview: async (_: undefined, args: { id: string, input: ReviewModify }, context: MyContext) => {
            const filter = {_id: args.id, author: context.userdata?.user.id};
            return await reviewModel.findByIdAndUpdate(filter, args.input, { new: true });
        },
        deleteReview: async (_: undefined, args: { id: string }) => {
            return await reviewModel.findByIdAndDelete(args.id);
        },
    },
};

export default reviewResolver;

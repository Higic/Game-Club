import { Review, ReviewInput } from "@/types/DBTypes";
import reviewModel from "../models/reviewModel";
import MyContext from "@/types/MyContext";
import { isLoggedIn } from "@/functions/authorize";

const reviewResolver = {
    Query: {
        reviewById: async (_: undefined, args: { id: string }) => {
            return await reviewModel.findById(args.id);
        },
        reviewsByGame: async (_: undefined, args: { game: string }) => {
            return await reviewModel.find({ game: args.game });
        },
        reviewsByAuthor: async (_: undefined, args: { author: string }) => {
            return await reviewModel.find({ user: args.author });
        },
    },
    Mutation: {
        createReview: async (_: undefined, args: { input: Omit<Review, 'id'> }, context: MyContext) => {
            isLoggedIn(context);
            args.input.author = context.userdata?.user.id;
            return await reviewModel.create(args.input);
        },
        updateReview: async (_: undefined, args: { id: string, input: Omit<Review, 'game' | 'author' | 'id'> }, context: MyContext) => {
            isLoggedIn(context);
            return await reviewModel.findByIdAndUpdate(args.id, args.input, { new: true });
        },
        deleteReview: async (_: undefined, args: { id: string }, context: MyContext) => {
            isLoggedIn(context);
            if (context.userdata?.user.role !== 'admin') {
                const filter = {_id: args.id, owner: context.userdata?.user.id};
                return await reviewModel.findOneAndDelete(filter);
            } else {
                return await reviewModel.findByIdAndDelete(args.id);
            }
        },
    },
};

export default reviewResolver;

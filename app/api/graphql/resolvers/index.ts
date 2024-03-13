import lfgResolver from "./lfgResolver";
import forumCommentResolver from "./forumCommentResolver";
import forumPostResolver from "./forumPostResolver";
import reviewResolver from "./reviewResolver";
import userResolver from "./userResolver";
import gameResolver from "./gameResolver";

/**
 * This is the main resolver file. It connects all the resolvers for the different api's.
 */

const resolvers = [userResolver, lfgResolver, reviewResolver, forumPostResolver, forumCommentResolver, gameResolver];
export default resolvers;
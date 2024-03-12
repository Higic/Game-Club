import LFGResolver from "./LFGResolver";
import forumCommentResolver from "./forumCommentResolver";
import forumPostResolver from "./forumPostResolver";
import reviewResolver from "./reviewResolver";
import userResolver from "./userResolver";

/**
 * This is the main resolver file. It connects all the resolvers for the different api's.
 */

const resolvers = [userResolver, LFGResolver, reviewResolver, forumPostResolver, forumCommentResolver];
export default resolvers;
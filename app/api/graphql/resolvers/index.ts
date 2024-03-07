import LFGResolver from "./LFGResolver";
import forumCommentResolver from "./forumCommentResolver";
import forumPostResolver from "./forumPostResolver";
import reviewResolver from "./reviewResolver";
import userResolver from "./userResolver";


const resolvers = [userResolver, LFGResolver, reviewResolver, forumPostResolver, forumCommentResolver];
export default resolvers;
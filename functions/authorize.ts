import { GraphQLError } from "graphql";
import MyContext from "../types/MyContext";

const isLoggedIn = (context: MyContext): void => {
    if (!context.userdata) {
        throw new GraphQLError('You are not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: {
                    status: 401,
                },
            },
        });
    }
};

/**
 * Check if the user is an admin
 * @param context
 */
const isAdmin = (context: MyContext): void => {
    isLoggedIn(context);
    if (context.userdata && context.userdata.user.role !== 'admin') {
        throw new GraphQLError('You are not authorized to do this', {
            extensions: {
                code: 'UNAUTHORIZED',
                http: {
                    status: 401,
                },
            },
        });
    }
};

export { isLoggedIn, isAdmin };
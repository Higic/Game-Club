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

export { isLoggedIn };
import { GraphQLError } from "graphql";
import MyContext from "../types/MyContext";
import { TokenContent } from "@/types/DBTypes";

const isLoggedIn = (tokenContent: TokenContent): void => { 
    console.log("isLoggedin token check", tokenContent);
    if (!tokenContent) {
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
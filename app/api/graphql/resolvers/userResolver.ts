import fetchData from '@/functions/fetchData';
import { isLoggedIn } from '@/functions/authorize';
import { Credentials, User, UserInput } from '@/types/DBTypes';
import { UserResponse, LoginResponse } from '@/types/MessageTypes';
import MyContext from '@/types/MyContext';

/**
 * This file contains resolvers for the user api.
 */
const userResolver = {
    Query: {
        users: async () => {
            return await fetchData<User[]>(`${process.env.AUTH_URL}/users`);
        },
        userById: async (_: undefined, args: { id: string }) => {
            return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users/${args.id}`);
        },
        checkToken: async (_: undefined, args: {token:string}) => {
            console.log("token inside check " + args.token);
            return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users/token`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${args.token}`,
                },
            });
        },
    },
    Mutation: {
        login: async (_: undefined, args: { credentials: Credentials }) => {
            return await fetchData<LoginResponse>(`${process.env.AUTH_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args.credentials),
            });
        },
        register: async (_: undefined, args: { user: UserInput }) => {
            return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args.user),
            });
        },
        updateUser: async (_: undefined, args: { id: string, user: UserInput }, context: MyContext) => {
            return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${context.userdata?.token}`,
                },
                body: JSON.stringify(args.user),
            });
        },
        updateBio: async (_: undefined, args: {bio: string}, context: MyContext) => {
            return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${context.userdata?.token}`,
                },
                body: JSON.stringify({bio: args.bio}),
            });
        },
        deleteUser: async (_: undefined, args: {context: MyContext},) => {
            return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${args.context.userdata?.token}`,
                },
            });
        },
    }
};

export default userResolver;

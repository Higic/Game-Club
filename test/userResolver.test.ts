import userResolver from '@/app/api/graphql/resolvers/userResolver';
import fetchData from '@/functions/fetchData';
import { User } from '@/types/DBTypes';

jest.mock('@/functions/fetchData');

describe('User Resolver', () => {
    describe('Query.users', () => {
        it('should return all users', async () => {
            const mockUsers: User[] = [
                {
                    id: '1',
                    user_name: 'test1',
                    password: 'password',
                    bio: 'test bio',
                },
                {
                    id: '2',
                    user_name: 'test2',
                    password: 'password',
                    bio: 'test bio',
                },
            ];

            (fetchData as jest.MockedFunction<typeof fetchData>).mockResolvedValue(mockUsers);

            const result = await userResolver.Query.users();

            expect(result).toEqual(mockUsers);
        });
    });
});

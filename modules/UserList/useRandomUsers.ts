import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRandomUsers, RandomUser } from '@services/api/random-user';

export const useRandomUsers = () =>
    useInfiniteQuery(
        ['users'],
        async ({ pageParam = 1 }) => {
            const data = await fetchRandomUsers(pageParam, 10);
            if (!data) {
                throw new Error('Users not found');
            }

            return {
                nextPage: pageParam + 1,
                data: data.results as RandomUser[],
            };
        },
        {
            getNextPageParam: ({ nextPage }) => (nextPage <= 10 ? nextPage : undefined),
        },
    );

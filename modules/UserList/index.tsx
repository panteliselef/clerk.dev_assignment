import UserCard from '@components/UserCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRandomUsers, RandomUser } from '@services/api/random-user';
import styles from './userList.module.scss';
import Stack from '@layouts/Stack';
import UserCardSkeleton from '@components/UserCard/skeleton';
import { useInView } from 'react-intersection-observer';
import { useCarousel } from '@hooks/useCarousel';

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

const UserList = () => {
    const { ref: carouselRef } = useCarousel();
    const { data, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useRandomUsers();

    const { ref } = useInView({
        /* Optional options */
        threshold: 0,
        triggerOnce: false,
        async onChange(inView) {
            if (inView && hasNextPage && !isFetchingNextPage) {
                await fetchNextPage();
            }
        },
    });

    const users = data?.pages.map(({ data }) => data).flat();

    return (
        <div ref={carouselRef} className={styles.user_list_cont}>
            {users && users.map((user) => <UserCard key={user.name.first + user.name.last} {...user} />)}
            {isFetching && (
                <>
                    <UserCardSkeleton />
                    <UserCardSkeleton />
                    <UserCardSkeleton />
                </>
            )}
            {hasNextPage && !isFetching && <UserCardSkeleton ref={ref} />}
        </div>
    );
};

export const UserListButtons = () => {
    const { scrollPrev, scrollNext } = useCarousel();
    return (
        <Stack
            direction={'row'}
            style={{
                width: '100%',
            }}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <button onClick={scrollPrev}>Prev</button>
            <button onClick={scrollNext}>Next</button>
        </Stack>
    );
};

export default UserList;

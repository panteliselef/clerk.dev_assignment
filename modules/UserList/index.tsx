import UserCard from '@components/UserCard';
import styles from './userList.module.scss';
import UserCardSkeleton from '@components/UserCard/skeleton';
import { useInView } from 'react-intersection-observer';
import { useCarousel } from '@hooks/useCarousel';
import { useRandomUsers } from '@modules/UserList/useRandomUsers';

const UserListError = () => (
    <p
        style={{
            border: '1px solid #C5283D',
            borderRadius: '4px',
            background: '#C5283D88',
            height: '100%',
            width: '100%',
            textAlign: 'center',
            padding: '2rem',
        }}
    >
        Users are unavailable
    </p>
);

const UserList = () => {
    const { ref: carouselRef } = useCarousel();
    const { data, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, isError } = useRandomUsers();

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
            {isError && <UserListError />}
            {users && users.map((user) => <UserCard key={user.name.first + user.name.last} {...user} />)}
            {isFetching && (
                <>
                    <UserCardSkeleton />
                    <UserCardSkeleton />
                    <UserCardSkeleton />
                </>
            )}

            {/*This will trigger the next page to be fetched when the component is in the user's viewport*/}
            {hasNextPage && !isFetching && <UserCardSkeleton ref={ref} />}
        </div>
    );
};

export default UserList;

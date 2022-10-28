import UserCard from '@components/UserCard';
import { useQuery } from '@tanstack/react-query';
import { fetchRandomUsers } from '@services/api/random-user';
import styles from './userList.module.scss';
import { useUserListPaginationStore } from '../../contexts/UserListPaginationContext';
import Stack from '@layouts/Stack';

export const useRandomUsers = (page: number) =>
    useQuery(['users', page], () => fetchRandomUsers(page), {
        keepPreviousData: true,
        staleTime: 60 * 1000,
    });

const UserList = () => {
    const page = useUserListPaginationStore((state) => state.page);
    const { data } = useRandomUsers(page);
    return (
        <div className={styles.user_list_cont}>
            {data?.results?.map((user) => (
                <UserCard key={user.name.first + user.name.last} {...user} />
            ))}
        </div>
    );
};

const UserListPageCount = () => {
    const page = useUserListPaginationStore((state) => state.page);
    return <p>Page #{page}</p>;
};

export const UserListButtons = () => {
    const { prevPage, nextPage, hasNextPage, hasPrevPage } = useUserListPaginationStore(
        ({ prevPage, nextPage, hasNextPage, hasPrevPage }) => ({
            prevPage,
            nextPage,
            hasNextPage,
            hasPrevPage,
        }),
    );
    return (
        <Stack
            direction={'row'}
            style={{
                width: '100%',
            }}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <button disabled={!hasPrevPage} onClick={prevPage}>
                Prev
            </button>
            <UserListPageCount />
            <button disabled={!hasNextPage} onClick={nextPage}>
                Next
            </button>
        </Stack>
    );
};

export default UserList;

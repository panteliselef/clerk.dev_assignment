import UserCard from '@components/UserCard';
import { useQuery } from '@tanstack/react-query';
import { fetchRandomUsers } from '@services/api/random-user';
import styles from './userList.module.scss';
import { useContext } from 'react';
import { UserListPaginationContext } from '../../contexts/UserListPaginationContext';

export const useRandomUsers = (page: number) =>
    useQuery(['users', page], () => fetchRandomUsers(page), {
        keepPreviousData: true,
        staleTime: 60 * 1000,
    });

const UserList = () => {
    const { page } = useContext(UserListPaginationContext);
    const { data } = useRandomUsers(page);
    return (
        <div className={styles.user_list_cont}>
            {data?.results?.map((user) => (
                <UserCard key={user.name.first + user.name.last} {...user} />
            ))}
        </div>
    );
};

export default UserList;

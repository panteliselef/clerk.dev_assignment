import React, { createContext, PropsWithChildren, useState } from 'react';

export const UserListPaginationContext = createContext<{
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}>({
    page: 1,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setPage: (page: number) => {},
});

export const UserListPaginationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [page, setPage] = useState(1);
    return (
        <UserListPaginationContext.Provider value={{ page, setPage }}>{children}</UserListPaginationContext.Provider>
    );
};

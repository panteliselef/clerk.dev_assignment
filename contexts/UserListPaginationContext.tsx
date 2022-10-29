/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import shallow from 'zustand/shallow';

// const UserListPaginationContext = createContext<{
//     page: number;
//     nextPage: () => void;
//     prevPage: () => void;
//     hasPrevPage: boolean;
//     hasNextPage: boolean;
// }>({
//     page: 1,
//     nextPage: () => {},
//     prevPage: () => {},
//     hasPrevPage: false,
//     hasNextPage: true,
// });

const minLimit = 1;
const maxLimit = 10;

// const UserListPaginationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
//     const [page, setPage] = useState(1);
//
//     const nextPage = useCallback(() => setPage((prevPage) => Math.min(maxLimit, prevPage + 1)), []);
//     const prevPage = useCallback(() => setPage((prevPage) => Math.max(minLimit, prevPage - 1)), []);
//
//     const hasPrevPage = page > minLimit;
//     const hasNextPage = page < maxLimit;
//
//     return (
//         <UserListPaginationContext.Provider value={{ page, nextPage, prevPage, hasPrevPage, hasNextPage }}>
//             {children}
//         </UserListPaginationContext.Provider>
//     );
// };

// const useUserListPagination = () => useContext(UserListPaginationContext);

export const useUserListPaginationStore = create<{
    page: number;
    nextPage: () => void;
    prevPage: () => void;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}>()(
    subscribeWithSelector((set, get) => ({
        page: 1,
        hasNextPage: true,
        hasPrevPage: false,
        prevPage: () => set(() => ({ page: Math.max(minLimit, get().page - 1) })),
        nextPage: () => set(() => ({ page: Math.min(maxLimit, get().page + 1) })),
    })),
);

useUserListPaginationStore.subscribe(
    (state) => [state.page], //deps, only compute when a & b change
    ([page]) => {
        useUserListPaginationStore.setState({ hasPrevPage: page > minLimit, hasNextPage: page < maxLimit });
    },
    {
        equalityFn: shallow,
        fireImmediately: true,
    },
);

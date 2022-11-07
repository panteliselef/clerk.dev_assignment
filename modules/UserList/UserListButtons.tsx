import { useCarouselKeyboardEvents } from '@hooks/useCarousel';
import { useRandomUsers } from '@modules/UserList/useRandomUsers';
import Stack from '@layouts/Stack';
import { useDebouncedWidth } from '@hooks/useWindowDimensions';
import breakpoints from '@utils/breakpoints';

const UserListButtons = () => {
    const { scrollPrev, scrollNext } = useCarouselKeyboardEvents();
    const { isError } = useRandomUsers();

    return (
        <Stack
            direction={'row'}
            style={{
                width: '100%',
            }}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <button data-testid="custom-element" disabled={isError} onClick={scrollPrev}>
                Prev
            </button>
            <button disabled={isError} onClick={scrollNext}>
                Next
            </button>
        </Stack>
    );
};

export default UserListButtons;

export const UserListDesktopNavigation = () => {
    const w = useDebouncedWidth();
    if (w < breakpoints.tablet2) return null;
    return <UserListButtons />;
};

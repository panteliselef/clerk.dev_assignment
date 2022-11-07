import { useCarouselKeyboardEvents } from '@hooks/useCarousel';
import { useRandomUsers } from '@modules/UserList/useRandomUsers';
import Stack from '@layouts/Stack';
import { useDebouncedWidth } from '@hooks/useWindowDimensions';
import breakpoints from '@utils/breakpoints';
import ArrowLeft from '@components/icons/ArrowLeft';
import ArrowRight from '@components/icons/ArrowRight';

/**
 * Complementary component to the UserList component
 * navigates through the carousel
 */
const UserListButtons = () => {
    const { scrollPrev, scrollNext } = useCarouselKeyboardEvents();
    const { isError } = useRandomUsers();

    return (
        <Stack
            direction={'row'}
            style={{
                width: '100%',
                padding: '0 1rem',
            }}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <button disabled={isError} onClick={scrollPrev}>
                <ArrowLeft
                    style={{
                        fill: 'var(--text-color)',
                        width: '20px',
                    }}
                />
                Scroll Left
            </button>
            <button disabled={isError} onClick={scrollNext}>
                Scroll Right
                <ArrowRight
                    style={{
                        fill: 'var(--text-color)',
                        width: '20px',
                    }}
                />
            </button>
        </Stack>
    );
};

export default UserListButtons;

/**
 * Wrapper for UserListButtons to only show it on desktop
 */
export const UserListDesktopNavigation = () => {
    const w = useDebouncedWidth();
    if (w < breakpoints.tablet2) return null;
    return <UserListButtons />;
};

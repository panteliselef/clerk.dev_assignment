import createCarousel from '@factory/createCarousel';
import { useWindowEvent } from '@hooks/useWindowEvent';

/**
 * Creates a carousel and makes it accessible by components that use it.
 */
export const useCarousel = createCarousel<HTMLDivElement>();

/**
 * Extends the carousel with keyboard navigation.
 */
export const useCarouselKeyboardEvents = () => {
    const carousel = useCarousel();
    useWindowEvent('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            carousel.scrollNext();
        }
        if (e.key === 'ArrowLeft') {
            carousel.scrollPrev();
        }
    });

    return carousel;
};

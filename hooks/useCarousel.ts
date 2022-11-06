import createCarousel from '@factory/createCarousel';
import { useWindowEvent } from '@hooks/useWindowEvent';

export const useCarousel = createCarousel<HTMLDivElement>();

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

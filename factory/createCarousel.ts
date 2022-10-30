import { createRef } from 'react';

const createCarousel = <T extends HTMLElement>() => {
    const ref = createRef<T>();

    const scrollNext = () => {
        const el = ref.current;
        if (!el) return;
        el.scrollBy({
            left: 300,
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollPrev = () => {
        const el = ref.current;
        if (!el) return;
        el.scrollBy({
            left: -300,
            top: 0,
            behavior: 'smooth',
        });
    };

    return () => ({
        ref,
        scrollNext,
        scrollPrev,
    });
};

export default createCarousel;

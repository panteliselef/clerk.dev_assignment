import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export const isBrowser = typeof window !== 'undefined';

function getWindowDimensions() {
    if (!isBrowser)
        return {
            width: 0,
            height: 0,
        };
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export function useDebouncedWidth() {
    const { width } = useWindowDimensions();
    return useDebounce(width, 100);
}

export function useDebouncedHeight() {
    const { height } = useWindowDimensions();

    return useDebounce(height, 100);
}

export default function useWindowDimensions(): { width: number; height: number } {
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        setWindowDimensions(getWindowDimensions());

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
}

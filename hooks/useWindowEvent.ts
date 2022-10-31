import { useEffect } from 'react';

export const useWindowEvent = <WE extends keyof WindowEventMap>(
    eventName: WE,
    handler: (event: WindowEventMap[WE]) => void,
) => {
    useEffect(() => {
        // Define the listening target
        const targetElement = window;

        targetElement.addEventListener(eventName, handler);

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, handler);
        };
    }, [eventName, handler]);
};

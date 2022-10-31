import { bgFallback, parseRGBLocalStorage, RGB, rgbArrayToHex, textFallback } from '@utils/colors';
import { useEffect, useState } from 'react';

const syncFromLocalStorage = (): {
    bg: RGB;
    text: RGB;
} => {
    const bg = localStorage.getItem('carBgColor');
    const text = localStorage.getItem('carTextColor');
    const r = document.querySelector(':root') as HTMLElement;
    if (r) r.style.setProperty('--card-bg-color', bg);
    r.style.setProperty('--card-text-color', text);

    return {
        bg: parseRGBLocalStorage(bg),
        text: parseRGBLocalStorage(text),
    };
};

export const safely_read_localstorage = () => {
    try {
        if (typeof window !== 'undefined') {
            return syncFromLocalStorage();
        }
        return {
            bg: bgFallback,
            text: textFallback,
        };
    } catch (e) {
        return {
            bg: bgFallback,
            text: textFallback,
        };
    }
};

export const usePersistedColor = () => {
    const [color, setColor] = useState('#000000');
    useEffect(() => {
        const { bg } = safely_read_localstorage();
        if (bg) {
            setColor(rgbArrayToHex(bg));
        }
    }, []);

    return [color, setColor] as const;
};
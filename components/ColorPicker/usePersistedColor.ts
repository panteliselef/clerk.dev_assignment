import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { bgFallback, getContrastYIQ, textFallback } from '@utils/colors';
import { CSSVarBG, CSSVarTEXT, initPersistedColors, LSkeyBG, LSkeyTEXT } from '@components/ColorPicker/setup';

/**
 * Reads the persisted colors from localstorage
 * Writes the updated colors to localstorage
 * Updates the CSS variables with the new colors
 */
export const usePersistedColor = () => {
    const [color, setColor] = useState('#000000');
    useEffect(() => {
        const { bg } = initPersistedColors();
        if (bg) {
            setColor(bg);
        }
    }, []);

    const syncToLocalStorage = useDebouncedCallback(
        ({ cardTextColor, cardBgColor }: { [LSkeyBG]: string; [LSkeyTEXT]: string }) => {
            localStorage.setItem(LSkeyBG, cardBgColor);
            localStorage.setItem(LSkeyTEXT, cardTextColor);
        },
        100,
    );

    const setColorAndPersist = useCallback<(hexColor: string) => void>(
        (hexColor) => {
            const r = document.querySelector(':root') as HTMLElement;
            if (r) r.style.setProperty(CSSVarBG, hexColor);

            const textColor = getContrastYIQ(hexColor) ? bgFallback : textFallback;
            r.style.setProperty(CSSVarTEXT, textColor);
            syncToLocalStorage({
                cardBgColor: hexColor,
                cardTextColor: textColor,
            });

            setColor(hexColor);
        },
        [setColor, syncToLocalStorage],
    );

    return [color, setColorAndPersist] as const;
};

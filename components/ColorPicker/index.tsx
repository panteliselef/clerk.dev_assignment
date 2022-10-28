import classNames from 'classnames';
import { useDebouncedCallback } from 'use-debounce';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import {
    bgFallback,
    getContrastYIQ,
    hexToRgb,
    parseRGBLocalStorage,
    RGB,
    rgbArrayToHex,
    rgbObjToStr,
    textFallback,
} from '@utils/colors';

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

const safely_read_localstorage = () => {
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

if (typeof window !== 'undefined') {
    safely_read_localstorage();
}

const usePersistedColor = () => {
    const [color, setColor] = useState('#000000');
    useEffect(() => {
        const { bg } = syncFromLocalStorage();
        if (bg) {
            setColor(rgbArrayToHex(bg));
        }
    }, []);

    return [color, setColor] as const;
};

const ColorPicker = () => {
    const [color, setColor] = usePersistedColor();
    const syncToLocalStorage = useDebouncedCallback(
        ({ carTextColor, carBgColor }: { carBgColor: string; carTextColor: string }) => {
            localStorage.setItem('carBgColor', carBgColor);
            localStorage.setItem('carTextColor', carTextColor);
        },
        100,
    );

    const handleColorChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            const r = document.querySelector(':root') as HTMLElement;
            const carBgColor = rgbObjToStr(hexToRgb(e.target.value));
            if (r) r.style.setProperty('--card-bg-color', carBgColor);

            const textColor = getContrastYIQ(e.target.value) ? '0,0,0' : '255,255,255';
            r.style.setProperty('--card-text-color', textColor);
            syncToLocalStorage({
                carBgColor,
                carTextColor: textColor,
            });

            setColor(e.target.value);
        },
        [setColor, syncToLocalStorage],
    );

    return (
        <div
            className={classNames('h-flex align-center')}
            style={{
                gap: '0.5rem',
                padding: '1rem 0',
            }}
        >
            <label htmlFor={'color_picker'}>Card background color:</label>
            <input value={color} id={'color_picker'} type={'color'} onChange={handleColorChange} />
        </div>
    );
};

export default ColorPicker;

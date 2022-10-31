import classNames from 'classnames';
import { useDebouncedCallback } from 'use-debounce';
import { ChangeEventHandler, useCallback } from 'react';
import { getContrastYIQ, hexToRgb, rgbObjToStr } from '@utils/colors';
import { safely_read_localstorage, usePersistedColor } from '@components/ColorPicker/setup';

if (typeof window !== 'undefined') {
    safely_read_localstorage();
}

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

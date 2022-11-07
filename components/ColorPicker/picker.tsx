import { HexColorInput, HexColorPicker } from 'react-colorful';
import styles from './picker.module.scss';
import Stack from '@layouts/Stack';
import { FC } from 'react';
import { usePersistedColor, ColorSwatch } from '.';
import { initPersistedColors } from '@components/ColorPicker/setup';

// Safe to call on the server
if (typeof window !== 'undefined') {
    /**
     * Sync the color picker with the persisted color outside the React lifecycle\
     * By doing this, we don't have to wait for React to hydrate the DOM
     * That means we will read the persisted color almost instantly and not wait for the first render of
     * a component to read from localStorage
     */
    initPersistedColors();
}

type ColorPicker = {
    presetColors: Array<string>;
    withInput: boolean;
};

export const ColorPicker: FC<ColorPicker> = ({ presetColors, withInput }) => {
    const [color, setColor] = usePersistedColor();

    return (
        <Stack direction={'column'} gap={'1rem'} className={styles.color_picker}>
            <Stack
                direction={'row'}
                gap={'1rem'}
                alignItems={'center'}
                justifyContent={'space-between'}
                style={{
                    gap: '1rem',
                }}
            >
                <Stack
                    direction={'row'}
                    gap={4}
                    style={{
                        flex: '1 1 auto',
                        flexWrap: 'wrap',
                    }}
                >
                    {presetColors.map((color) => (
                        <ColorSwatch key={color} color={color} onClick={() => setColor(color)} />
                    ))}
                </Stack>

                {withInput && <HexColorInput color={color} onChange={setColor} className={styles.text_input} />}
            </Stack>
            <HexColorPicker color={color} onChange={setColor} className={styles.react_colorful} />
        </Stack>
    );
};

import classNames from 'classnames';
import { HexColorInput, HexColorPicker } from 'react-colorful';

import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

import styles from './picker.module.scss';
import Stack from '@layouts/Stack';
import { FC } from 'react';
import { usePersistedColor, ColorSwatchCSSClass, ColorSwatch } from '.';
import { initPersistedColors } from '@components/ColorPicker/setup';

// Safe to call on the server
if (typeof window !== 'undefined') {
    initPersistedColors();
}

const presetColors = ['#cd9323', '#1a53d8', '#9a2151', '#0d6416', '#8d2808'];

type ColorPicker = {
    presetColors: Array<string>;
    withInput: boolean;
};

const ColorPicker: FC<ColorPicker> = ({ presetColors, withInput }) => {
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
const ColorPickerPopover = () => {
    return (
        <Popover>
            <PopoverPrimitive.Anchor
                className={classNames('h-flex align-center')}
                style={{
                    gap: '0.5rem',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                }}
            >
                Card background color <PopoverTrigger className={ColorSwatchCSSClass} />
            </PopoverPrimitive.Anchor>
            <PopoverPrimitive.Content sideOffset={5} className={styles.popover_content}>
                <ColorPicker presetColors={presetColors} withInput={true} />
                <PopoverPrimitive.Arrow />
            </PopoverPrimitive.Content>
        </Popover>
    );
};

export default ColorPickerPopover;

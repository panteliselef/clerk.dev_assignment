import classNames from 'classnames';
import { ColorSwatchCSSClass } from '@components/ColorPicker/ColorSwatch';
import styles from '@components/ColorPicker/picker.module.scss';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ColorPicker } from '@components/ColorPicker/picker';
import { presetColors } from '@components/ColorPicker/setup';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

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

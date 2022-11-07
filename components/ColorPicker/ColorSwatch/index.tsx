import styles from './colorSwatch.module.scss';
import React from 'react';

export type ColorSwatchProps = {
    color: string;
    onClick?: () => void;
};

export const ColorSwatchCSSClass = styles.swatch;

/**
 * A button styled as colored tile
 * used as preview for the color picker
 */
const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, onClick }) => {
    return (
        <button
            key={color}
            className={styles.swatch}
            style={{
                backgroundColor: color,
            }}
            onClick={onClick}
        />
    );
};

export default ColorSwatch;

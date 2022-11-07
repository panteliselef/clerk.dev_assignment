/**
 * Utils for manipulating colors
 */

export function getContrastYIQ(hexColor: string) {
    const {r, g, b} = hexToRgb(hexColor);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128;
}

export function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result)
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        };
    return {
        r: 0,
        g: 0,
        b: 0,
    };
}

export const bgFallback = '#000000';
export const textFallback = '#ffffff';
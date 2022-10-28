export type RGB = [number, number, number];

export function getContrastYIQ(hexColor: string) {
    const { r, g, b } = hexToRgb(hexColor);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128;
}

// https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
export function rgbObjToStr({ r, g, b }: { r: number; g: number; b: number }) {
    return `${r},${g},${b}`;
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

export function numberToHex(c: number) {
    const hex = c.toString(16);
    return hex.padStart(2, '0');
}

export const bgFallback = [0, 0, 0] as RGB;
export const textFallback = [255, 255, 255] as RGB;

export const parseRGBLocalStorage = (rgb?: string | null) => {
    if (!rgb) {
        throw new Error('Invalid RGB string');
    }
    const candidate = rgb.split(',').map((n) => parseInt(n));
    if (candidate.length !== 3) {
        throw new Error('Invalid RGB string');
    }
    return candidate as RGB;
};

export function rgbArrayToHex(rgb: RGB) {
    return `#${rgb.map(numberToHex).join('')}`;
}

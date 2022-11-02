import { bgFallback, textFallback } from '@utils/colors';

export const CSSVarBG = '--card-bg-color';
export const CSSVarTEXT = '--card-text-color';

export const LSkeyBG = 'cardBgColor' as const;
export const LSkeyTEXT = 'cardTextColor' as const;

const unsafe_read_localstorage = (): {
    bg: string;
    text: string;
} => {
    const bg = localStorage.getItem(LSkeyBG);
    const text = localStorage.getItem(LSkeyTEXT);

    if (bg && text)
        return {
            bg,
            text,
        };

    return {
        bg: bgFallback,
        text: textFallback,
    };
};

export const initPersistedColors = () => {
    try {
        if (typeof window !== 'undefined') {
            const { bg, text } = unsafe_read_localstorage();
            const r = document.querySelector(':root') as HTMLElement;
            if (r) r.style.setProperty(CSSVarBG, bg);
            r.style.setProperty(CSSVarTEXT, text);
            return {
                bg,
                text,
            };
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

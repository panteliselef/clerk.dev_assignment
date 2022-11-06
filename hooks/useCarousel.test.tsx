import { act, render, renderHook } from '@testing-library/react';
import { useCarousel, useCarouselKeyboardEvents } from '@hooks/useCarousel';
import userEvent from '@testing-library/user-event';

describe('useCarousel', () => {
    it('should return the correct values', () => {
        const { result } = renderHook(() => useCarousel());
        const { ref, scrollNext, scrollPrev } = result.current;
        expect(ref.current).toBe(null);
        expect(scrollNext).toBeInstanceOf(Function);
        expect(scrollPrev).toBeInstanceOf(Function);
    });

    it('should scroll right by 300px', () => {
        const { result } = renderHook(() => useCarousel());
        const { ref, scrollNext } = result.current;
        expect(ref.current).toBe(null);

        render(
            <div
                ref={ref}
                style={{
                    width: '100px',
                }}
            >
                <div
                    style={{
                        width: '1000px',
                    }}
                ></div>
            </div>,
        );

        expect(ref.current).not.toBe(null);
        expect(ref.current!.scrollLeft).toBe(0);

        act(() => {
            if (ref.current) {
                ref.current.scrollBy = jest.fn();
            }
            scrollNext();
        });

        expect(ref.current!.scrollBy).toBeCalledWith({
            left: 300,
            top: 0,
            behavior: 'smooth',
        });
    });

    it('should scroll left by 300px', () => {
        const { result } = renderHook(() => useCarousel());
        const { ref, scrollPrev } = result.current;
        expect(ref.current).toBe(null);

        render(
            <div
                ref={ref}
                style={{
                    width: '100px',
                }}
            >
                <div
                    style={{
                        width: '1000px',
                    }}
                />
            </div>,
        );

        expect(ref.current).not.toBe(null);
        expect(ref.current!.scrollLeft).toBe(0);

        act(() => {
            if (ref.current) {
                ref.current.scrollBy = jest.fn();
            }
            scrollPrev();
        });

        expect(ref.current!.scrollBy).toBeCalledWith({
            left: -300,
            top: 0,
            behavior: 'smooth',
        });
    });

    it('should support keyboard interactions', async () => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));

        const user = userEvent.setup();
        const { result } = renderHook(() => useCarouselKeyboardEvents());
        const { ref } = result.current;

        render(
            <div
                ref={ref}
                style={{
                    width: '100px',
                }}
            />,
        );

        await act(async () => {
            if (ref.current) {
                ref.current.scrollBy = jest.fn();
            }
            await user.keyboard('[ArrowRight]');
        });

        expect(ref.current!.scrollBy).toBeCalledWith({
            left: 300,
            top: 0,
            behavior: 'smooth',
        });

        await act(async () => {
            await user.keyboard('[ArrowLeft]');
        });

        expect(ref.current!.scrollBy).toBeCalledWith({
            left: -300,
            top: 0,
            behavior: 'smooth',
        });
    });
});

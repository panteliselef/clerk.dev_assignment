import { act, renderHook, waitFor } from '@testing-library/react';
import { usePersistedColor } from '@components/ColorPicker/usePersistedColor';

describe('usePersistedColor', () => {
    beforeAll(() => {
        global.Storage.prototype.setItem = jest.fn();
        global.Storage.prototype.getItem = jest.fn();
    });

    afterAll(() => {
        global.Storage.prototype.setItem.mockReset();
        global.Storage.prototype.getItem.mockReset();
    });

    it('should return a color', async () => {
        const { result } = renderHook(() => usePersistedColor());
        const [color] = result.current;
        expect(color).toBe('#000000');

        await waitFor(() => expect(global.Storage.prototype.getItem).toHaveBeenCalledTimes(2));
    });

    it('should return a setter', () => {
        const { result } = renderHook(() => usePersistedColor());
        const [, set] = result.current;
        expect(set).toBeInstanceOf(Function);
    });

    it('should set a color', async () => {
        const { result } = renderHook(() => usePersistedColor());
        const [, set] = result.current;

        await act(() => {
            set('#ffffff');
        });

        await waitFor(() => expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(2));

        const [color] = result.current;
        expect(color).toBe('#ffffff');
    });
});

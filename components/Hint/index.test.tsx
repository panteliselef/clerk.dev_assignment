import { act, render, waitFor } from '@testing-library/react';
import Hint from '@components/Hint/index';

describe('<Hint />', () => {
    it('should render nothing if the window width is less than 768px', async () => {
        const { container } = render(<Hint />);

        await act(() => {
            global.window.innerWidth = 10;
            global.window.dispatchEvent(new Event('resize'));
        });
        await waitFor(() => expect(container).toBeEmptyDOMElement());
    });

    it('if the window width is greater than 768px, it should render the hint', async () => {
        const { container } = render(<Hint />);

        await act(() => {
            global.window.innerWidth = 1000;
            global.window.dispatchEvent(new Event('resize'));
        });
        await waitFor(() => expect(container).not.toBeEmptyDOMElement());
    });
});

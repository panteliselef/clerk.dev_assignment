import ColorPickerPopover from '@components/ColorPicker/popover';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<ColorPickerPopover/>', () => {
    beforeAll(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    it('should render display only the trigger', () => {
        const wrapper = render(<ColorPickerPopover />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render popover after click', async () => {
        const user = userEvent.setup();
        const wrapper = render(<ColorPickerPopover />);
        await user.click(wrapper.getByRole('button'));
        expect(wrapper).toMatchSnapshot();
    });
});

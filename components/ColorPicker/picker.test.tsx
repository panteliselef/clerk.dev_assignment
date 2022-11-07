import { render } from '@testing-library/react';
import { ColorPicker } from '@components/ColorPicker/picker';
import { presetColors } from '@components/ColorPicker/setup';

describe('<ColorPicker/>', () => {
    it('should render with 5 color options & with input', () => {
        const wrapper = render(<ColorPicker presetColors={presetColors} withInput={true} />);
        expect(wrapper.getAllByRole('button')).toHaveLength(5);

        expect(wrapper.getAllByRole('button')[0]).toHaveStyle(`background-color: ${presetColors[0]}`);
        expect(wrapper.getAllByRole('button')[1]).toHaveStyle(`background-color: ${presetColors[1]}`);
        expect(wrapper.getAllByRole('button')[2]).toHaveStyle(`background-color: ${presetColors[2]}`);
        expect(wrapper.getAllByRole('button')[3]).toHaveStyle(`background-color: ${presetColors[3]}`);
        expect(wrapper.getAllByRole('button')[4]).toHaveStyle(`background-color: ${presetColors[4]}`);

        expect(wrapper.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render with zero color options & without input', () => {
        const wrapper = render(<ColorPicker presetColors={[]} withInput={false} />);
        expect(wrapper.queryAllByRole('button')).toHaveLength(0);
        expect(wrapper.queryByRole('textbox')).not.toBeInTheDocument();
    });
});

import styles from './hint.module.scss';
import classNames from 'classnames';
import { useDebouncedWidth } from '@hooks/useWindowDimensions';
import breakpoints from '@utils/breakpoints';

const Hint = () => {
    const w = useDebouncedWidth();

    if (w < breakpoints.tablet2) return null;
    return (
        <div className={classNames(styles.hint_cont)}>
            💡Hint: use your keyboard to navigate between users with ⬅️&nbsp;➡️
        </div>
    );
};
export default Hint;

import styles from './hint.module.scss';
import classNames from 'classnames';

const Hint = () => {
    return (
        <div className={classNames(styles.hint_cont)}>
            💡Hint: use your keyboard to navigate between users with ⬅️&nbsp;➡️
        </div>
    );
};
export default Hint;

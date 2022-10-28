import styles from './header.module.scss';
import classNames from 'classnames';

const AppHeader = () => {
    return (
        <header className={classNames(styles.header, 'h-flex center')}>
            <span className={styles.logo}>My Clerks</span>
        </header>
    );
};

export default AppHeader;

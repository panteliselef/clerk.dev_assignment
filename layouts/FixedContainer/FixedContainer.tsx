import React, { createElement } from 'react';
import styles from './fixedContainer.module.scss';
import classNames from 'classnames';

interface ContainerProps extends React.HTMLProps<HTMLElement> {
    as?: string;
}

const FixedContainer: React.FC<ContainerProps> = ({ as = 'div', children, className, ...props }) => {
    return createElement(
        as,
        {
            ...props,
            className: classNames({
                [styles.fixed_container]: true,
                [className as string]: !!className,
            }),
        },
        children,
    );
};

export default FixedContainer;

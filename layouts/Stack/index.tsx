import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './stack.module.scss';

export interface StackProps extends React.HTMLProps<HTMLDivElement> {
    direction?: 'row' | 'column';
    alignItems?: 'flex-start' | 'flex-end' | 'start' | 'end' | 'center' | 'stretch';
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'start'
        | 'end'
        | 'center'
        | 'stretch'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    gap?: number | string;
}

/**
 * Flexbox container with a direction, alignment and gap
 */
const Stack = forwardRef<HTMLDivElement, StackProps>(
    ({ style, justifyContent, children, direction, gap = 0, alignItems, ...props }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    ...(gap && { gap }),
                    alignItems,
                    justifyContent,
                    ...style,
                }}
                className={classNames({
                    [props.className || '']: true,
                    [styles.asRow]: direction === 'row',
                    ['as_row_tablet_col']: direction === 'row',
                    [styles.asCol]: direction === 'column',
                })}
            >
                {children}
            </div>
        );
    },
);

Stack.displayName = 'Stack';

export default Stack;

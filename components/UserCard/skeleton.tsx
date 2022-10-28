import React from 'react';
import styles from './skeleton.module.scss';
import classNames from 'classnames';
import Stack from '@layouts/Stack';

const UserCardSkeleton = () => {
    return (
        <div className={classNames(styles.user_card_cont, 'v-flex align-center')}>
            <div className={classNames(styles.user_card_img, styles.user_card__skeleton_item)} />
            <div className={classNames(styles.user_card_name, styles.user_card__skeleton_item)} />
            <div className={classNames(styles.user_card_location, styles.user_card__skeleton_item)} />

            <Stack
                direction={'row'}
                gap={'8px'}
                style={{
                    width: '100%',
                }}
            >
                <div className={classNames(styles.user_card_button, styles.user_card__skeleton_item)} />
                <div className={classNames(styles.user_card_button, styles.user_card__skeleton_item)} />
            </Stack>
        </div>
    );
};
export default UserCardSkeleton;

import React from 'react';
import { RandomUser } from '@services/api/random-user';
import styles from './userCard.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import ExternalLink from '@components/ExternalLink';
import Stack from '@layouts/Stack';
import { useGoogleMapsLink } from '@hooks/useGoogleMapsLink';
import PhoneIcon from '@components/icons/PhoneIcon';

const UserCardImage: React.FC<Pick<RandomUser, 'picture' | 'name'>> = ({ picture, name }) => (
    <div style={{ position: 'relative' }}>
        <Image
            width={60}
            height={60}
            src={picture.large}
            alt={`profile pic for user ${name.first}`}
            className={styles.user_card_img}
        />
        <span aria-label={name.title} className={styles.user_card_pill}>
            {name.title}
        </span>
    </div>
);

const UserLocation: React.FC<Pick<RandomUser, 'location'>> = ({ location }) => {
    const locationUrl = useGoogleMapsLink(location);
    const txt = `${location.country}, ${location.country}`;
    return (
        <ExternalLink tabIndex={1} href={locationUrl} className={classNames(styles.user_card_location)}>
            {txt}
        </ExternalLink>
    );
};

const UserCard: React.FC<RandomUser> = ({ name, email, location, phone, picture }) => {
    return (
        <div className={classNames(styles.user_card_cont, 'v-flex align-center')}>
            <UserCardImage picture={picture} name={name} />

            <Stack
                direction={'column'}
                gap={3}
                style={{
                    width: '100%',
                }}
            >
                <p aria-label={`${name.first} ${name.last}`} className={classNames(styles.user_card_name)}>
                    {name.first} {name.last}
                </p>

                <UserLocation location={location} />
            </Stack>

            <Stack
                direction={'row'}
                gap={10}
                style={{
                    width: '100%',
                }}
            >
                <ExternalLink
                    href={`mailto://${email}`}
                    style={{
                        flex: '1 1 100px',
                    }}
                    tabIndex={1}
                    className={styles.user_card_button}
                >
                    Email
                </ExternalLink>

                <ExternalLink tabIndex={1} href={`tel://${phone}`} className={styles.user_card_button}>
                    <PhoneIcon width={20} />
                </ExternalLink>
            </Stack>
        </div>
    );
};
export default React.memo(UserCard);

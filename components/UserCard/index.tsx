import React from 'react';
import { RandomUser } from '@services/api/random-user';
import styles from './userCard.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import ExternalLink from '@components/ExternalLink';
import Stack from '@layouts/Stack';
import { useGoogleMapsLink } from '@hooks/useGoogleMapsLink';
import EmailIcon from '@components/icons/EmailIcon';
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
        <ExternalLink
            href={locationUrl}
            className={classNames(styles.user_card_location, 'h-flex align-center')}
            style={{
                gap: '5px',
            }}
        >
            <span aria-label={txt} title={txt}>
                {txt}
            </span>
        </ExternalLink>
    );
};

const UserCTA: React.FC<{ label: string; url: string; icon: JSX.Element }> = ({ label, url, icon }) => {
    return (
        <Stack
            direction={'row'}
            gap={'8px'}
            alignItems={'center'}
            justifyContent={'space-between'}
            style={{
                fontSize: 12,
                position: 'relative',
            }}
        >
            <span
                title={label}
                aria-label={label}
                className={'text-ellipsis'}
                style={{
                    width: '100%',
                    maxWidth: '90%',
                    flex: '1 1 100px',
                }}
            >
                {label}
            </span>
            <ExternalLink href={url} className={styles.user_card_button}>
                <span
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: 0,
                        top: 0,
                    }}
                />
                {icon}
            </ExternalLink>
        </Stack>
    );
};

const UserCard: React.FC<RandomUser> = ({ name, email, location, phone, picture }) => {
    return (
        <div className={classNames(styles.user_card_cont, 'v-flex align-center')}>
            <Stack
                direction={'row'}
                gap={'16px'}
                alignItems={'center'}
                style={{
                    width: '100%',
                }}
            >
                <UserCardImage picture={picture} name={name} />

                <Stack direction={'column'} gap={3}>
                    <p aria-label={`${name.first} ${name.last}`} className={classNames(styles.user_card_name)}>
                        {name.first} {name.last}
                    </p>

                    <UserLocation location={location} />
                </Stack>
            </Stack>

            <Stack
                direction={'column'}
                gap={3}
                style={{
                    width: '100%',
                    position: 'relative',
                }}
            >
                <UserCTA label={email} url={`mailto://${email}`} icon={<EmailIcon width={20} />} />

                <hr
                    style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        width: '100%',
                    }}
                />

                <UserCTA label={phone} url={`tel://${phone}`} icon={<PhoneIcon width={20} />} />
            </Stack>
        </div>
    );
};
export default UserCard;

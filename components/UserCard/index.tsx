import React from 'react';
import { Location, RandomUser } from '@services/api/random-user';
import styles from './userCard.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import ExternalLink from '@components/ExternalLink';
import Stack from '@layouts/Stack';

const GmapsUrl = `https://maps.google.com/?q=`;

const useGoogleMapsLink = (location: Location) =>
    `${GmapsUrl}${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.postcode}`;

const UserCard: React.FC<RandomUser> = ({ name, email, location, phone, picture }) => {
    const locationUrl = useGoogleMapsLink(location);
    return (
        <div className={classNames(styles.user_card_cont, 'v-flex align-center')}>
            <Image width={50} height={50} src={picture.large} alt={'wow'} className={styles.user_card_img} />
            <p className={classNames(styles.user_card_name)}>
                {name.first} {name.last}
            </p>
            <ExternalLink href={locationUrl} className={styles.user_card_location}>
                {location.city}, {location.country}
            </ExternalLink>

            <Stack direction={'row'} gap={'8px'}>
                <ExternalLink href={`mailto://${email}`} className={styles.user_card_button}>
                    DM me
                </ExternalLink>
                <ExternalLink href={`tel://${phone}`} className={styles.user_card_button}>
                    Call me
                </ExternalLink>
            </Stack>
        </div>
    );
};
export default UserCard;

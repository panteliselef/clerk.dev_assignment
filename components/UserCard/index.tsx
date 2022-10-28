import React from 'react';
import { RandomUser } from '@services/api/random-user';
import styles from './userCard.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import ExternalLink from '@components/ExternalLink';
import Stack from '@layouts/Stack';
import GlobeIcon from '@components/icons/GlobeIcon';
import { useGoogleMapsLink } from '@hooks/useGoogleMapsLink';

const UserCard: React.FC<RandomUser> = ({ name, email, location, phone, picture }) => {
    const locationUrl = useGoogleMapsLink(location);
    return (
        <div className={classNames(styles.user_card_cont, 'v-flex align-center')}>
            <div style={{ position: 'relative' }}>
                <Image width={60} height={60} src={picture.large} alt={'wow'} className={styles.user_card_img} />
                <span className={styles.user_card_pill}>{name.title}</span>
            </div>

            <p className={classNames(styles.user_card_name)}>
                {name.first} {name.last}
            </p>
            <ExternalLink
                href={locationUrl}
                className={classNames(styles.user_card_location, 'h-flex align-center')}
                style={{
                    gap: '5px',
                }}
            >
                <GlobeIcon
                    width={18}
                    style={{
                        stroke: 'rgb(var(--card-text-color))',
                    }}
                />
                <span>
                    {location.city}, {location.country}
                </span>
            </ExternalLink>

            <Stack
                direction={'column'}
                gap={10}
                style={{
                    width: '100%',
                    position: 'relative',
                    padding: '1rem',
                }}
            >
                <Stack
                    direction={'row'}
                    gap={'8px'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    style={{
                        fontSize: 12,
                    }}
                >
                    {email}
                    <ExternalLink href={`mailto://${email}`} className={styles.user_card_button}>
                        <span
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                left: 0,
                                top: 0,
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            width={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="var(--text-color)"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                        </svg>
                    </ExternalLink>
                </Stack>

                <hr
                    style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        width: '100%',
                    }}
                />

                <Stack
                    direction={'row'}
                    gap={'8px'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    style={{
                        fontSize: 12,
                    }}
                >
                    {phone}
                    <ExternalLink href={`tel://${phone}`} className={styles.user_card_button}>
                        <span
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                left: 0,
                                top: 0,
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            width={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="var(--text-color)"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                            />
                        </svg>
                    </ExternalLink>
                </Stack>
            </Stack>
        </div>
    );
};
export default UserCard;

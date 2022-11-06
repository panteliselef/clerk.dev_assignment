import type { RandomUserLocation } from '@services/api/random-user';

const GmapsUrl = `https://maps.google.com/?q=`;

export const useGoogleMapsLink = (location: RandomUserLocation) =>
    `${GmapsUrl}${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.postcode}`;

import { renderHook } from '@testing-library/react';
import { useGoogleMapsLink } from '@hooks/useGoogleMapsLink';
import { RandomUserLocation } from '@services/api/random-user';

const l: RandomUserLocation = {
    street: {
        number: 123,
        name: 'Fake Street',
    },
    state: 'state',
    postcode: 123,
    city: 'city',
    country: 'country',
};

test('ww', () => {
    const { result } = renderHook(() => useGoogleMapsLink(l));

    expect(result.current).toBe('https://maps.google.com/?q=123 Fake Street, city, state, 123');
});

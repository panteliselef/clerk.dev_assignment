import { RandomUserResults } from './types';

const fields = ['email', 'name', 'picture', 'phone', 'location', 'id'];

export const fieldsString = fields.join(',');

// This could also be stored as a .env variable
export const BASE_URL = 'https://randomuser.me';

function typesafe_fetch<T>(url: string): Promise<T> {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
    });
}

export const fetchRandomUsers = (page: number, results = 3) =>
    typesafe_fetch<RandomUserResults>(`${BASE_URL}/api?page=${page}&results=${results}&seed=abc&inc=${fieldsString}`);

export interface RandomUserResults {
    results?: RandomUser[] | null;
    info: Info;
}

export interface RandomUser {
    name: Name;
    location: RandomUserLocation;
    email: string;
    phone: string;
    picture: Picture;
    id: {
        name: string;
        value: string;
    };
}

export interface Name {
    title: string;
    first: string;
    last: string;
}

export interface RandomUserLocation {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates?: Coordinates;
    timezone?: Timezone;
}

interface Street {
    number: number;
    name: string;
}

interface Coordinates {
    latitude: string;
    longitude: string;
}

interface Timezone {
    offset: string;
    description: string;
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}

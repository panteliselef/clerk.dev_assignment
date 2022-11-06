import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import UserList, { UserListButtons } from '@modules/UserList/index';
import { useRandomUsers } from '@modules/UserList/useRandomUsers';

import renderer from 'react-test-renderer';
// Make TypeScript Happy, by resolving TS errors
const mockedUseUsersQuery = useRandomUsers as jest.Mock<any>;

// Mock the hook module
jest.mock('@modules/UserList/useRandomUsers');

const mockUsers = [
    {
        data: [
            {
                name: { title: 'Miss', first: 'Laura', last: 'Woods' },
                location: {
                    street: { number: 2479, name: 'Henry Street' },
                    city: 'Blessington',
                    state: 'Wexford',
                    country: 'Ireland',
                    postcode: 78276,
                    coordinates: { latitude: '2.0565', longitude: '95.2422' },
                    timezone: { offset: '+1:00', description: 'Brussels, Copenhagen, Madrid, Paris' },
                },
                email: 'laura.woods@example.com',
                phone: '031-623-5189',
                id: { name: 'PPS', value: '1101776T' },
                picture: {
                    large: 'https://randomuser.me/api/portraits/women/88.jpg',
                    medium: 'https://randomuser.me/api/portraits/med/women/88.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/88.jpg',
                },
            },
            {
                name: { title: 'Mr', first: 'Marten', last: 'Faber' },
                location: {
                    street: { number: 6167, name: 'Grüner Weg' },
                    city: 'Falkenberg/Elster',
                    state: 'Thüringen',
                    country: 'Germany',
                    postcode: 99553,
                    coordinates: { latitude: '89.4367', longitude: '135.6354' },
                    timezone: { offset: '+5:45', description: 'Kathmandu' },
                },
                email: 'marten.faber@example.com',
                phone: '0100-8354415',
                id: { name: 'SVNR', value: '18 010860 F 495' },
                picture: {
                    large: 'https://randomuser.me/api/portraits/men/1.jpg',
                    medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
                    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
                },
            },
        ],
    },
];

describe('<UserListButtons />', () => {
    beforeEach(() => {
        mockedUseUsersQuery.mockImplementation(() => ({ isLoading: true }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders without crashing', () => {
        render(<UserListButtons />);
    });

    it('Disabled buttons if error with fetching', async () => {
        mockedUseUsersQuery.mockImplementation(() => ({
            isError: true,
        }));

        render(<UserListButtons />);
        await waitFor(() => expect(screen.getByText('Prev')).toBeInTheDocument());
        const input = screen.getByText('Prev');
        expect(input).toHaveAttribute('disabled');
    });

    it('Hidden buttons on mobile', async () => {
        render(<UserListButtons />);

        await act(() => {
            global.window.innerWidth = 500;
            global.window.dispatchEvent(new Event('resize'));
        });

        await waitFor(() => expect(screen.queryByRole('button')).not.toBeInTheDocument());
    });
});

describe('<UserList />', () => {
    beforeEach(() => {
        mockedUseUsersQuery.mockImplementation(() => ({ isFetching: true }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders without crashing', () => {
        render(<UserList />);
    });

    it('Display 3 skeletons on Loading', async () => {
        const tree = renderer.create(<UserList />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Display Error if fetching failed', async () => {
        mockedUseUsersQuery.mockImplementation(() => ({ isError: true }));
        const tree = renderer.create(<UserList />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Display 2 user cards', () => {
        mockedUseUsersQuery.mockImplementation(() => ({
            data: {
                pages: mockUsers,
            },
        }));
        const tree = renderer.create(<UserList />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

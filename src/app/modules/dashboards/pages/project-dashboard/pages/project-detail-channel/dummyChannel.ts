export interface IChannel {
    id: number;
    image: string;
    name: string;
    detail: string;
    teams: any[];
    leads: number;
    click: number;
    trackingUrl: string;
    status: boolean;
}

export const dataDummyChannel: IChannel[] = [
    {
        id: 21,
        image: 'kosongansek.img',
        name: 'Channel IG',
        detail: 'Test test test',
        teams: [
            {
                id: 5,
                name: 'Team Jakarta Utara'
            },
            {
                id: 7,
                name: 'Team Jakarta Barat'
            }
        ],
        leads: 423,
        click: 200,
        trackingUrl: 'https://sdasdasasd',
        status: true
    },
    {
        id: 22,
        image: 'kosongansek.img',
        name: 'Channel FB',
        detail: 'Test test test',
        teams: [
            {
                id: 6,
                name: 'Team Jakarta Selatan'
            },
            {
                id: 7,
                name: 'Team Jakarta Barat'
            }
        ],
        leads: 423,
        click: 200,
        trackingUrl: 'https://sdasdasasd',
        status: true
    },
    {
        id: 23,
        image: 'kosongansek.img',
        name: 'Channel Twitter',
        detail: 'Test test test',
        teams: [
            {
                id: 6,
                name: 'Team Jakarta Selatan'
            },
            {
                id: 7,
                name: 'Team Jakarta Barat'
            }
        ],
        leads: 423,
        click: 200,
        trackingUrl: 'https://sdasdasasd',
        status: true
    },
    {
        id: 24,
        image: 'kosongansek.img',
        name: 'Channel Google',
        detail: 'Test test test',
        teams: [
            {
                id: 6,
                name: 'Team Jakarta Selatan'
            },
            {
                id: 7,
                name: 'Team Jakarta Barat'
            }
        ],
        leads: 423,
        click: 200,
        trackingUrl: 'https://sdasdasasd',
        status: true
    },
    {
        id: 25,
        image: 'kosongansek.img',
        name: 'Upload',
        detail: 'Test test test',
        teams: [
            {
                id: 6,
                name: 'Team Jakarta Selatan'
            },
            {
                id: 7,
                name: 'Team Jakarta Barat'
            }
        ],
        leads: 423,
        click: 200,
        trackingUrl: 'https://sdasdasasd',
        status: true
    },
];

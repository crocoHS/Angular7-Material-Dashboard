export interface Dummy {
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    picName: string;
    salesOfficer: number;
    leads: number;
    channels: number;
    status: boolean;
    coverage: any[];
}

export const dummyAss: Dummy[] = [
    {
        id: 231,
        name: 'Team Jakarta Utara',
        password: 'bangsat213',
        email: 'prasdkas@fsal.com',
        phone: '0812312311',
        address: 'jalan jalan bitch',
        picName: 'yayayaya',
        coverage: [1, 3, 5, 7],
        salesOfficer: 2,
        leads: 70,
        channels: 32,
        status: true
    },
    {
        id: 233,
        name: 'Team Jakarta Barat',
        password: 'bangsat2123',
        email: 'as3gdfg@fsal.com',
        phone: '0856454455',
        address: 'jalan jalan cok',
        picName: 'tutututu',
        coverage: [2, 4, 7],
        salesOfficer: 2,
        leads: 70,
        channels: 32,
        status: true
    },
    {
        id: 236,
        name: 'Team Jakarta Selatan',
        password: 'basat2123',
        email: 'as8864g@fsal.com',
        phone: '085784789',
        address: 'jalan jalan mbut',
        picName: 'tusutu',
        coverage: [6],
        salesOfficer: 2,
        leads: 70,
        channels: 32,
        status: true
    }
];

export interface Coverage {
    id: number,
    name: string
}

export const coverage: Coverage[] = [
    {
        id: 1,
        name: 'Jakarta Utara'
    },
    {
        id: 2,
        name: 'Jakarta Barat'
    },
    {
        id: 3,
        name: 'Sumatra'
    },
    {
        id: 4,
        name: 'Surabaya Kidul'
    },
    {
        id: 5,
        name: 'Jakarta Selatan'
    },
    {
        id: 6,
        name: 'Tangerang'
    },
    {
        id: 7,
        name: 'Sidoarjo'
    }
];

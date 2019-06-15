export interface Dummy {
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    joinDate: string;
    point: number;
    leads: number;
    channels: number;
    status: boolean;
    salesTeam: any[];
}

export const dummyAss: Dummy[] = [
    {
        id: 231,
        name: 'Sales Officer 1',
        password: 'bangsat213',
        email: 'prasdkas@fsal.com',
        phone: '0812312311',
        address: 'jalan jalan bitch',
        gender: 'male',
        joinDate: `${ new Date( +( new Date() ) - Math.floor( Math.random() * 10000000000 ) ) }`,
        salesTeam: [ 1, 3, 5, 7 ],
        point: 223,
        leads: 70,
        channels: 32,
        status: true
    },
    {
        id: 233,
        name: 'Sales Officer 2',
        password: 'bangsat2123',
        email: 'as3gdfg@fsal.com',
        phone: '0856454455',
        address: 'jalan jalan cok',
        gender: 'female',
        joinDate: `${ new Date( +( new Date() ) - Math.floor( Math.random() * 10000000000 ) ) }`,
        salesTeam: [ 2, 4, 7 ],
        point: 211,
        leads: 70,
        channels: 32,
        status: false
    },
    {
        id: 236,
        name: 'Sales Officer 3',
        password: 'basat2123',
        email: 'as8864g@fsal.com',
        phone: '085784789',
        address: 'jalan jalan mbut',
        gender: 'female',
        joinDate: `${ new Date( +( new Date() ) - Math.floor( Math.random() * 10000000000 ) ) }`,
        salesTeam: [ 6 ],
        point: 12,
        leads: 70,
        channels: 32,
        status: true
    },
    {
        id: 237,
        name: 'Sales Officer 4',
        password: 'basat2123',
        email: 'as88643s231g@fsal.com',
        phone: '085784789',
        address: 'jalan jalan mbut sda',
        gender: 'male',
        joinDate: `${ new Date( +( new Date() ) - Math.floor( Math.random() * 10000000000 ) ) }`,
        salesTeam: [ 6 ],
        point: 23,
        leads: 70,
        channels: 32,
        status: true
    },
    {
        id: 238,
        name: 'Sales Officer 5',
        password: 'basat2123',
        email: 'as8864111g@fsal.com',
        phone: '085784789',
        address: 'jalan jalan mbut dddsa',
        gender: 'male',
        joinDate: `${ new Date( +( new Date() ) - Math.floor( Math.random() * 10000000000 ) ) }`,
        salesTeam: [ 6 ],
        point: 2421,
        leads: 70,
        channels: 32,
        status: true
    }
];

export interface ISalesTeam {
    id: number;
    name: string;
}

export const salesTeams: ISalesTeam[] = [
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

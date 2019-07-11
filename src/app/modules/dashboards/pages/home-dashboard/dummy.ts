export interface DummyData {
    name: string;
    data: ValuePerformance[];
}

export interface ValuePerformance {
    name: string;
    value: number;
}

export const dummyData: DummyData[] = [ {
    name: 'Campaign Performance',
    data: [
        {
            name: 'Campaign Testing A',
            value: 80
        },
        {
            name: 'Campaign Testing A',
            value: 2
        }
    ]
},
    {
        name: 'Channel Performance',
        data: [
            {
                name: 'Channel Facebook Testing',
                value: 59
            },
            {
                name: 'Upload Database',
                value: 19
            },
            {
                name: 'Channel Testing',
                value: 2
            },
            {
                name: 'Channel Google',
                value: 0
            },
            {
                name: 'Walk In',
                value: 2
            }
        ]
    },
    {
        name: 'LeadModel Categories',
        data: [
            {
                name: 'New Leads',
                value: 71
            },
            {
                name: 'Hot',
                value: 7
            },
            {
                name: 'Warm',
                value: 0
            },
            {
                name: 'Cold',
                value: 2
            },
            {
                name: 'Unqualified',
                value: 0
            },
            {
                name: 'Closed',
                value: 1
            }
        ]
    },
    {
        name: 'LeadModel Status',
        data: [
            {
                name: 'New Leads',
                value: 71
            },
            {
                name: 'Walk In',
                value: 1
            },
            {
                name: 'Reservation',
                value: 1
            },
            {
                name: 'Booking',
                value: 1
            },
            {
                name: 'Closing',
                value: 1
            },
            {
                name: 'Not Interested',
                value: 2
            },
            {
                name: 'Callback',
                value: 4
            }
        ]
    }
];

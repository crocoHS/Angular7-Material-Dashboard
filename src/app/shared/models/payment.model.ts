export interface IPayment {
    id: number;
    type: string;
    qrCode: string;
    createdAt: string;
    updatedAt: string;
}

export class Payment {
    public initialApi: IPayment;
    public id: number;
    public type: string;
    public qrCode: string;
    public createdAt: string;
    public updatedAt: string;

    constructor( payload: IPayment ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.type = payload.type;
        this.qrCode = payload.qrCode;
        this.createdAt = payload.createdAt;
        this.updatedAt = payload.updatedAt;
    }

}

export const dataDummyPayment: IPayment[] = [
    {
        id: 1,
        type: 'Ovo',
        qrCode: 'https://www.welivesecurity.com/wp-content/uploads/2014/06/Simplocker_QR.png',
        createdAt: '2019-01-20 22:53:43',
        updatedAt: '2019-06-21 05:27:52'
    }, {
        id: 2,
        type: 'Ovo',
        qrCode: 'https://www.welivesecurity.com/wp-content/uploads/2014/06/Simplocker_QR.png',
        createdAt: '2019-03-19 18:31:35',
        updatedAt: '2019-06-19 23:22:15'
    }, {
        id: 3,
        type: 'Ovo',
        qrCode: 'https://www.welivesecurity.com/wp-content/uploads/2014/06/Simplocker_QR.png',
        createdAt: '2019-03-28 20:17:50',
        updatedAt: '2019-07-08 18:51:04'
    }, {
        id: 4,
        type: 'GoPay',
        qrCode: 'https://www.welivesecurity.com/wp-content/uploads/2014/06/Simplocker_QR.png',
        createdAt: '2019-01-18 11:08:33',
        updatedAt: '2019-07-19 12:26:09'
    }, {
        id: 5,
        type: 'DANA',
        qrCode: 'https://www.welivesecurity.com/wp-content/uploads/2014/06/Simplocker_QR.png',
        createdAt: '2019-01-24 08:58:03',
        updatedAt: '2019-06-04 23:46:40'
    }
];

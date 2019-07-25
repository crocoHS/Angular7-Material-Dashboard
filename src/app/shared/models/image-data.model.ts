export interface IImageData {
    field: string;
    origFile: string;
    status: boolean;
    newFile: string;
    fullPath: string;
}

export class ImageData {
    initialApi: IImageData;
    field: string;
    origFile: string;
    status: boolean;
    newFile: string;
    fullPath: string | ArrayBuffer;

    constructor( public payload: IImageData ) {
        this.initialApi = payload;
        this.field = payload.field;
        this.origFile = payload.origFile;
        this.status = payload.status;
        this.newFile = payload.newFile;
        this.fullPath = payload.fullPath;
    }
}

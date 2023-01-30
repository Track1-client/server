import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class InvalidImageFileType extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1003';
        this.name = 'Wrong_Image_File_Type';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};
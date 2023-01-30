import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class NotImageFile extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1003';
        this.name = 'Not_Image_File';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};
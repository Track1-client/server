import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class FileTooLarge extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1003';
        this.name = 'File_Too_Large';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};
import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class VocalTitleNotFound extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1006';
        this.name = 'Vocal_Title_Not_Found';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};
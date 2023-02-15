import { sc } from '../../../constants';
import { AbstractError } from '../abstractError';

export class InvalidPaginationParams extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '999';
        this.name = 'Wrong_Pagination_Parameters';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};
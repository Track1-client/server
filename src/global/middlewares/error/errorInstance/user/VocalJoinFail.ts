import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class VocalJoinFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1000';
        this.name = 'Vocal_Join_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};
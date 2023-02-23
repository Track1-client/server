import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class GetBeatsFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1004';
        this.name = 'Get_Beat_List_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};
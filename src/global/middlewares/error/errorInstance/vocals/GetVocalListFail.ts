import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class GetVocalListFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1008';
        this.name = 'Get_Vocal_List_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};
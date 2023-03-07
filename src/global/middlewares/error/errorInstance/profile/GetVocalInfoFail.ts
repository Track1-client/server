import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class GetVocalInfoFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'P004';
        this.name = 'Get_Vocal_Info_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;

    };

};
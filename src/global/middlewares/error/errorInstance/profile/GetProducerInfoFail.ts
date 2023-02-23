import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class GetProducerInfoFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1007';
        this.name = 'Get_Producer_Info_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};
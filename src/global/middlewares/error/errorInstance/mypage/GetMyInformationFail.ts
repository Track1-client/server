import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class GetMyInformationFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1006';
        this.name = 'Get_My_Information_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};
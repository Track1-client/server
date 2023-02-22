import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UpdateProducerNewTitleFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1006';
        this.name = 'Update_Producer_New_Title_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};
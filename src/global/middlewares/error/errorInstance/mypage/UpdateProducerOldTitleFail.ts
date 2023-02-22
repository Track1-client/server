import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UpdateProducerOldTitleFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1006';
        this.name = 'Update_Producer_Old_Title_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};
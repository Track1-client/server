import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UpdateVocalOldTitleFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1006';
        this.name = 'Update_Vocal_Old_Title_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};
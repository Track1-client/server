import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UpdateVocalProfileFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1007';
        this.name = 'Update_Vocal_Profile_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};
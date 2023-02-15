import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class BeatFileUpdateFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1004';
        this.name = 'Beat_File_Update_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};
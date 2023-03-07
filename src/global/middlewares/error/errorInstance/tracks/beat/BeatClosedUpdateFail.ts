import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class BeatClosedUpdateFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Tb001';
        this.name = 'Beat_Closed_Update_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;

    };

};
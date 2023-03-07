import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class GetBeatFileFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Tb005';
        this.name = 'Get_Beat_File_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;

    };

};
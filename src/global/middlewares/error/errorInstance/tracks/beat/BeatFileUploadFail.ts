import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class BeatFileUploadFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Tb003';
        this.name = 'Beat_File_Upload_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;

    };

};
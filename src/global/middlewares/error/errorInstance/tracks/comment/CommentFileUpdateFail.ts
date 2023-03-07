import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class CommentFileUpdateFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Tc001';
        this.name = 'Comment_File_Update_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;

    };

};
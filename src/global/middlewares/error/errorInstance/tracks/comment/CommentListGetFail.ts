import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class CommentFilesGetFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Tc003';
        this.name = 'Comment_Files_Get_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;

    };

};
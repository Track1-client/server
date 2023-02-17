import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class CommentFileUploadFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1004';
        this.name = 'Comment_File_Upload_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};
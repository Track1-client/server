import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class DeleteCommentS3Object extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1005';
        this.name = 'Delete_Comment_S3Object_Audio_And_Image';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};
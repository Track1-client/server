import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class DeleteTrackS3Object extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'S003';
        this.name = 'Delete_Track_S3Object_Audio_And_Image';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;

    };

};

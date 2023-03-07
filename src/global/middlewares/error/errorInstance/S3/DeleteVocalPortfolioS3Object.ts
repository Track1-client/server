import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class DeleteVocalPortfolioS3Object extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'S004';
        this.name = 'Delete_Vocal_Portfolio_S3_Object';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;

    };

};
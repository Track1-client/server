import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class DeleteProducerPortfolioS3Object extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1005';
        this.name = 'Delete_Producer_Portfolio_S3_Object';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};
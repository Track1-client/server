import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UploadVocalPortfolioFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'G014';
        this.name = 'Upload_Vocal_Portfolio_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
        
    };

};
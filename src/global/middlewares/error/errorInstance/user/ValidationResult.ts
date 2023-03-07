import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class InvalidValidationFormResult extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'U007';
        this.name = 'Invalid_Form_Validation';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};
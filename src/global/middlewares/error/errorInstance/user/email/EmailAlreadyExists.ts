import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class AlreadyExistsEmail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Ue002';
        this.name = 'Email_Already_Exists';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};
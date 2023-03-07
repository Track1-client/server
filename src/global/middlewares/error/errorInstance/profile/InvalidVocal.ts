import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class InvalidVocal extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'P006';
        this.name = 'Invalid_Vocal';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};
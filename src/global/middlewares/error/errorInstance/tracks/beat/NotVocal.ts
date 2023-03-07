import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class NotVocal extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Tb010';
        this.name = 'Not_Vocal';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};
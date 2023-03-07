import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class NotProducerBeat extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Tb009';
        this.name = 'Not_Producer_Beat';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};
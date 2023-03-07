import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class NotAudioFile extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Ft003';
        this.name = 'Not_Audio_File';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};
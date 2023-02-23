import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class NoAudioFile extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1004';
        this.name = 'No_Audio_File';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};
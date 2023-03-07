import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class InvalidAudioFileType extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Ft001';
        this.name = 'Wrong_Audio_File_Type';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};
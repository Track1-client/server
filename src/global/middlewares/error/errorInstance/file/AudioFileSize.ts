import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class AudioFileTooLarge extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'F002';
        this.name = 'Audio_File_Too_Large';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };
    
};
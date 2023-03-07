import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class GetProducerBeatsFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'P002';
        this.name = 'Get_Producer_Beats_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;

    };

};
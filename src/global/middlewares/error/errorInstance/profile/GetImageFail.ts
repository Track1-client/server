import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class GetImageFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1007';
        this.name = 'Get_Image_List_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};
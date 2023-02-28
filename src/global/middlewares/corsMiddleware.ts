import { Request, Response, NextFunction } from 'express';

function corsMiddleware(corsOriginList: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const origin: string = req.headers.origin as string;
    
        if (corsOriginList.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Contol-Allow-Credentials', 'true');
        }
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        res.header(
            'Access-Control-Allow-Headers',
            'X-Requested-With, content-type, x-access-token',
        );
        next();
    }
};

export default corsMiddleware;
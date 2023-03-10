import morgan from 'morgan';
import LOGGER from './winstonLogger';
import { Request, Response } from "express";
import colors from 'colors';

const stream = {

    write : (message: any) => { LOGGER.http(message) }

};


const skip = () => {

    const env = process.env.NODE_ENV || "development";
    return env !== "development";

};


morgan.token("status", (req: Request, res: Response) => {

    let color ;

    if (res.statusCode < 300) color = "\x1b[32m"    //green
    else if (res.statusCode < 400) color = "\x1b[36m" //cyan
    else if (res.statusCode < 500) color = "\x1b[33m"   //yellow
    else if (res.statusCode < 600) color = "\x1b[31m"   //red
    else color = "\x1b[0m" /*글자색 초기화*/

    return color + res.statusCode + "\x1b[35m" /*보라색*/;

});

morgan.token("request", (req: Request, res: Response) => {
    
    return "[Request] -> " + JSON.stringify(req.body);

});

morgan.token("makeLine", (req: Request, res: Response) => {

    let line = "-----------------------------------------------*(੭*ˊᵕˋ)੭* 응답 결과 ╰(*'v'*)╯-----------------------------------------------"
    let blank = "                                   ";
    return line + "\n" + blank;

});


const morganMiddleware = morgan (
    ":makeLine [요청] -> :method | [url] -> ':url' | :request | [Status] -> :status | [응답시간] :response-time ms (:res[content-length]줄)",
    { stream }
);

export default morganMiddleware;
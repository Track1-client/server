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
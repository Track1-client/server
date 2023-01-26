import express, { NextFunction, Request, Response } from "express";
import router from './domain';
import cors from "cors";
import { corsMiddleware, globalErrorHandler } from './global/middlewares';
import path from 'path';

const app = express(); 
const PORT = 3000;

const corsOriginList = [
    'http://localhost:3000',
    'https://www.track1.site'
];

const corsOptions = {
    origin: corsOriginList,
    credential: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(corsMiddleware(corsOriginList));

app.use(express.json());
app.use("/", router); 
app.use(globalErrorHandler);
app.use(express.static(path.join(__dirname, 'static')));
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("BTS 손흥민 봉준호 Track-1 Let's go!!!🔥🔥🔥");
});

app.listen(PORT, () => {
    console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
}); 
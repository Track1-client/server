import express, { NextFunction, Request, Response } from "express";
import router from './domain';
import { globalErrorHandler } from './global/middlewares/error';

const app = express(); 
const PORT = 3000;

app.use(express.json());
app.use("/", router); 
app.use(globalErrorHandler);

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
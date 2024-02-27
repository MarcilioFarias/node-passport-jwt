import { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import router from './routes/routes';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.urlencoded({extended:true}));
server.use(express.static(path.join(__dirname, '../public')));

server.use(passport.initialize());

server.use('/ping', (req:Request, res: Response)=> res.json({pong: true}));
server.use(router);

server.use((req: Request, res: Response)=> {
    res.status(404);
    res.json({error: 'Endpoint Not Found'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    
    if(err.status){
        res.status(err.status);
    } else {
        res.status(400);//Bad Request 
    }   
    if(err.message){
        res.json({error: err.message});
    } else {
        res.json({error: 'Bad Request error'});  
    }   
     
}
server.use(errorHandler);

server.listen(process.env.PORT);


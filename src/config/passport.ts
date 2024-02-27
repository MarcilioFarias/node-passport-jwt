import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import  jwt  from 'jsonwebtoken';
import { modelData } from "../models/mariadbModel";

dotenv.config();

const notAuthorized = {status: 401, message: 'Not Authorized'};
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string
}

passport.use(new JWTStrategy(options, async (payload, done)=> {

    const user = await modelData.findByPk(payload.id);

    if(user){
        return done(null, user);
    } else {
        return done(notAuthorized, false);
    }    
}));

export const generateToken = (data:object) => {
    return jwt.sign(data, process.env.JWT_KEY as string);
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    
    const authFunction = passport.authenticate('jwt', (error: string, user: string) => {
        //req.user = user;
        if(user){
            next();
        } else {
            next(notAuthorized);
        }
    });
    authFunction(req, res, next);
}

export default passport;
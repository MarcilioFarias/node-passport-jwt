import { Request, Response } from "express";
import { modelData } from "../models/mariadbModel";
import { generateToken } from '../config/passport';

export const ping = (req: Request, res: Response) => {

    res.json({pong: true});
}

export const list = async (req: Request, res: Response) => {
    const listData = await modelData.findAll();

    res.json({listData});
}

export const mainR = async (req:Request, res:Response) => {
    

    res.send({status: true});
};

export const login = async (req: Request, res: Response) => {

    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await modelData.findOne( {
            where: {email, password}
        });
        if(user) {
            const token = generateToken({id: user.id });
            res.json({status: true, token});
            return;
        }
    }
    res.json({status: false});
}


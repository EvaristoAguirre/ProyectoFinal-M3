import { Express, NextFunction, Request, Response } from "express";


export default function checkCredential (req:Request, res:Response, next:NextFunction){
    const {username, password} = req.body;
    if(!username || !password){
            res.status(400).send({message:"Los datos ingresados son incorrectos"});
    } else{
        next();
    }
}
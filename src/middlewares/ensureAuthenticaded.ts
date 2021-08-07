import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticaded(
    request: Request, 
    response: Response, 
    next: NextFunction
    ){
    
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).end();
    }

    const token = authToken.slice(7);

    try{
        const {sub} = verify((<string>token), "94c47448f51386073450c44b86ce7367") as IPayload;

        request.user_id = sub;

        return next();
    }catch(err){
        return response.status(401).end();
    }


    
}
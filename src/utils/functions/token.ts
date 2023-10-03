import { NextFunction, Request, Response } from "express";
import jwt, {Secret} from "jsonwebtoken"
import { UserType} from "../interfaces/UserType";

const token_secret = process.env.TOKEN_SECRET as Secret;

export function generateToken (user: UserType): string {
    return jwt.sign({id: user.user_id, password: user.password} ,token_secret)
}

export function verifyToken (_req: Request, res: Response, next: NextFunction): void {
    try {
        const authorization = _req.headers.authorization;
        const token = authorization? authorization.split(' ')[1]: '';
        jwt.verify(token, token_secret);
        next();
    } catch (error) {
        res.status(401)
        res.json(`Invalid authorization with ${error}!!!`)
    }
}
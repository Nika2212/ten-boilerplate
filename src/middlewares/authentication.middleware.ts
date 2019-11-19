import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function authenticate(req: Request, res: Response, next: Function) {
    const token: string = <string>req.headers['X-Access-Token'] || null;

    if (!token) return res.status(401).send('Access denied, no token provided.');

    try {
        req.user = jwt.verify(token, process.env.SERVER_KEY);
        next();
    } catch (e) {
        res.status(400).send('Invalid token');
    }
}

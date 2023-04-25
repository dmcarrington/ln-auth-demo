import { Request, Response, NextFunction } from 'express';
import {  responseError } from '../helpers';
import lnurlServer from '../helpers/lnurl';
const Pusher = require("pusher");

export const lnurlLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await lnurlServer.generateNewUrl("login");
        res.send(result);
    } catch (err) {
        next(err);
    }
}

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  });

export const pseudoLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.query;
        if (query.key) {
            const key: string = String(query.key);

            pusher.trigger("lnd-auth", "auth", {
                key
              });
            // Send {status: "OK"} so the client acknowledges the login success
            res.json({status: "OK"})
        } else {
            return responseError(res, 404, 'Unsuccesful LNURL AUTH login'); 
        }
    } catch (err) {
        next(err);
    }
}
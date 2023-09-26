import express, { Request, Response } from "express";
import { Account, User } from "../model/user";

const store = new User();
const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: Account = {
            username: req.body.username,
            password: req.body.password,
        }

        const newUser = await store.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: Account = {
            username: req.body.username,
            password: req.body.password,
        }

        const newUser = await store.authenticate(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authencationApi = (app: express.Application) => {
    app.get('/login', show);
    app.post('/signup', create);
  };

export default authencationApi;
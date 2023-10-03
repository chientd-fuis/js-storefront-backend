import express, { Request, Response } from "express";
import { UserModel } from "../model/user";
import { UserType, UserTypeAccount, UserTypeRequest } from "../utils/interfaces/UserType";
import { verifyToken } from "../utils/functions/token";
import { checkValidateNumber, checkValidateText } from "../utils/functions/validation";


const store = new UserModel();

const create = async (_req: Request, res: Response): Promise<void> => {
    const user: UserTypeRequest = {
        first_name: checkValidateText(_req.body.first_name),
        last_name: checkValidateText(_req.body.last_name),
        password: checkValidateText(_req.body.password),
    }
    try {
        const userAuth = await store.create(user);
        res.json(userAuth);
    } catch(err) {
        res.status(401)
        res.json({code: 401, message: `${err}`})
    }
}

const authenticate = async (_req: Request, res: Response): Promise<void> => {
    const user: UserTypeAccount = {
        user_id: checkValidateNumber(_req.body.user_id),
        password: checkValidateText(_req.body.password),
    }
    try {
        const auth = await store.authenticate(user);
        res.json(auth)
    } catch(err) {
        res.status(401)
        res.json({code: 401, message: `${err}`})
    }
}

const updateUserInfo = async (_req: Request, res: Response): Promise<void> => {
    const user: UserType = {
        user_id: parseInt(_req.params.user_id),
        first_name: checkValidateText(_req.body.first_name),
        last_name: checkValidateText(_req.body.last_name),
        password: checkValidateText(_req.body.password),
    }
    try {
        const newUserUpdate = await store.update(user);
        res.json(newUserUpdate)
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const deleteUser = async (_req: Request, res: Response): Promise<void> => {
    const userId: string =  _req.params.user_id;
    try {
        const userDelete = await store.delete(parseInt(userId));
        res.json(userDelete);
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const getUserInfo = async (_req: Request, res: Response): Promise<void> => {
    const userId: string =  _req.params.user_id;
    try {
        const userInfo = await store.show(parseInt(userId));
        if(!userInfo){
            res.status(404)
            res.json({code: 404, message: `Not Found user ${userId}`})
        }
        res.json(userInfo);
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const userHandler = (app: express.Application) => {
    app.post('/users/sign-up', create);
    app.post('/users/sign-in', authenticate);
    app.put('/users/:user_id', verifyToken, updateUserInfo);
    app.delete('/users/:user_id', verifyToken, deleteUser);
    app.get('/users/:user_id', verifyToken, getUserInfo);
  };

export default userHandler;
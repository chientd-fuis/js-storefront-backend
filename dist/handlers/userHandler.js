"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const token_1 = require("../utils/functions/token");
const validation_1 = require("../utils/functions/validation");
const store = new user_1.UserModel();
const create = async (_req, res) => {
    const user = {
        first_name: (0, validation_1.checkValidateText)(_req.body.first_name),
        last_name: (0, validation_1.checkValidateText)(_req.body.last_name),
        password: (0, validation_1.checkValidateText)(_req.body.password),
    };
    try {
        const userAuth = await store.create(user);
        res.json(userAuth);
    }
    catch (err) {
        res.status(401);
        res.json({ code: 401, message: `${err}` });
    }
};
const authenticate = async (_req, res) => {
    const user = {
        user_id: (0, validation_1.checkValidateNumber)(_req.body.user_id),
        password: (0, validation_1.checkValidateText)(_req.body.password),
    };
    try {
        const auth = await store.authenticate(user);
        res.json(auth);
    }
    catch (err) {
        res.status(401);
        res.json({ code: 401, message: `${err}` });
    }
};
const updateUserInfo = async (_req, res) => {
    const user = {
        user_id: parseInt(_req.params.user_id),
        first_name: (0, validation_1.checkValidateText)(_req.body.first_name),
        last_name: (0, validation_1.checkValidateText)(_req.body.last_name),
        password: (0, validation_1.checkValidateText)(_req.body.password),
    };
    try {
        const newUserUpdate = await store.update(user);
        res.json(newUserUpdate);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const deleteUser = async (_req, res) => {
    const userId = _req.params.user_id;
    try {
        const userDelete = await store.delete(parseInt(userId));
        res.json(userDelete);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const getUserInfo = async (_req, res) => {
    const userId = _req.params.user_id;
    try {
        const userInfo = await store.show(parseInt(userId));
        if (!userInfo) {
            res.status(404);
            res.json({ code: 404, message: `Not Found user ${userId}` });
        }
        res.json(userInfo);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const userHandler = (app) => {
    app.post('/users/sign-up', create);
    app.post('/users/sign-in', authenticate);
    app.put('/users/:user_id', token_1.verifyToken, updateUserInfo);
    app.delete('/users/:user_id', token_1.verifyToken, deleteUser);
    app.get('/users/:user_id', token_1.verifyToken, getUserInfo);
};
exports.default = userHandler;

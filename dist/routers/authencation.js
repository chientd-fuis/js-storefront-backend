"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const store = new user_1.User();
const create = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const newUser = await store.authenticate(user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authencationApi = (app) => {
    app.get('/login', show);
    app.post('/signup', create);
};
exports.default = authencationApi;

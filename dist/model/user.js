"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../utils/functions/token");
const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
class UserModel {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT user_id, first_name, last_name FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`[Users] Error get all users`);
        }
    }
    async show(userId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT user_id, first_name, last_name FROM users WHERE user_id = $1';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`[Users] Error get user by ID ${userId}`);
        }
    }
    async create(user) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (first_name, last_name, user_password) VALUES ($1, $2, $3) RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password + PEPPER, parseInt(SALT_ROUNDS));
            const result = await conn.query(sql, [
                user.first_name,
                user.last_name,
                hash
            ]);
            const userAuth = {
                user_id: result.rows[0].user_id,
                token: (0, token_1.generateToken)(result.rows[0].user_id)
            };
            conn.release();
            return userAuth;
        }
        catch (error) {
            throw new Error(`[Users] Error creating user with error ${error}`);
        }
    }
    async update(user) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE users SET first_name = $1, last_name = $2, user_password = $3 WHERE user_id = $4 RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password + PEPPER, parseInt(SALT_ROUNDS));
            const result = await conn.query(sql, [
                user.first_name,
                user.last_name,
                hash,
                user.user_id
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error('[Users] Error updating user');
        }
    }
    async delete(userId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error('[Users] Error deleting user');
        }
    }
    async authenticate(user) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT user_password FROM users WHERE user_id=($1)';
            const result = await conn.query(sql, [user.user_id]);
            if (result.rows.length) {
                const userRes = result.rows[0];
                if (bcrypt_1.default.compareSync(user.password + PEPPER, userRes.user_password)) {
                    const auth = {
                        user_id: user.user_id,
                        token: (0, token_1.generateToken)(userRes)
                    };
                    return auth;
                }
            }
            throw new Error('[Users] Error authencation');
        }
        catch (error) {
            throw new Error('[Users] Error authencation');
        }
    }
}
exports.UserModel = UserModel;

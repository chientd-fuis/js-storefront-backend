"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS || 1;
class User {
    async create(user) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *";
            const hash = bcrypt_1.default.hashSync(user.password + pepper, saltRounds);
            console.log(user.username);
            const result = await conn.query(sql, [user.username, hash]);
            conn.release();
            return result;
        }
        catch (error) {
            throw new Error("Error creating user");
        }
    }
    async authenticate(user) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';
        const result = await conn.query(sql, [user.username]);
        console.log(user.password + pepper);
        if (result.rows.length) {
            const userRes = result.rows[0];
            console.log(userRes);
            if (bcrypt_1.default.compareSync(user.password + pepper, userRes.password_digest)) {
                return userRes;
            }
        }
        return null;
    }
}
exports.User = User;

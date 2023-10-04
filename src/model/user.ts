// @ts-ignore
import client from '../database';
import bcrypt from 'bcrypt';
import {
  UserType,
  UserTypeAccount,
  UserTypeAuth,
  UserTypeInformation,
  UserTypeRequest
} from '../utils/interfaces/UserType';
import { generateToken } from '../utils/functions/token';

const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS as unknown as string;

export class UserModel {
  async show(userId: number): Promise<UserTypeInformation> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'SELECT user_id, first_name, last_name FROM users WHERE user_id = $1';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`[Users] Error get user by ID ${userId}`);
    }
  }

  async create(user: UserTypeRequest): Promise<UserTypeAuth> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, user_password) VALUES ($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + PEPPER,
        parseInt(SALT_ROUNDS)
      );
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash
      ]);
      const userAuth: UserTypeAuth = {
        user_id: result.rows[0].user_id,
        token: generateToken(result.rows[0].user_id)
      };
      conn.release();
      return userAuth;
    } catch (error) {
      throw new Error(`[Users] Error creating user with error ${error}`);
    }
  }

  async update(user: UserType): Promise<UserTypeInformation> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'UPDATE users SET first_name = $1, last_name = $2, user_password = $3 WHERE user_id = $4 RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + PEPPER,
        parseInt(SALT_ROUNDS)
      );
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash,
        user.user_id
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('[Users] Error updating user');
    }
  }

  async delete(userId: number): Promise<UserTypeInformation> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('[Users] Error deleting user');
    }
  }

  async authenticate(user: UserTypeAccount): Promise<UserTypeAuth> {
    // @ts-ignore
    const conn = await client.connect();
    try {
      const sql = 'SELECT user_password FROM users WHERE user_id=($1)';
      const result = await conn.query(sql, [user.user_id]);

      if (result.rows.length) {
        const userRes = result.rows[0];
        if (bcrypt.compareSync(user.password + PEPPER, userRes.user_password)) {
          const auth: UserTypeAuth = {
            user_id: user.user_id,
            token: generateToken(userRes)
          };
          return auth;
        }
      }
      throw new Error('[Users] Error authencation');
    } catch (error) {
      throw new Error('[Users] Error authencation');
    }
  }
}

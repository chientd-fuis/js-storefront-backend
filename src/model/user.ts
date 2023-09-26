// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";
export type Account = {
    username: string,
    password: string
}
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS || 1;
export class User {

    async create(user: Account): Promise<Account> {
       try {
           // @ts-ignore
           const conn = await client.connect();
           const sql = "INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *";
           const hash = bcrypt.hashSync(user.password+pepper, saltRounds)
           console.log(user.username)
           const result = await conn.query(sql, [user.username, hash])
           
           conn.release();
           return result;
       } catch (error) {
           throw new Error("Error creating user");
           
       }
    }

    async authenticate(user: Account): Promise<User | null> {
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [user.username])
    
        console.log(user.password+pepper)
    
        if(result.rows.length) {
    
          const userRes = result.rows[0]
    
          console.log(userRes)
    
          if (bcrypt.compareSync(user.password+pepper, userRes.password_digest)) {
            return userRes
          }
        }
    
        return null
      }
}
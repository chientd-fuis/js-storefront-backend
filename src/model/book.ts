// @ts-ignore
import client from "../database";

export type BookModel = {
    id: Number;
    name: string;
    author: string;
}

export class Book {
    async index(): Promise<BookModel[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "SELECT * FROM books";
            const query = await conn.query(sql);
            conn.release();
            return query.rows;
        } catch (error) {
            throw new Error(`Failed to get Book from database ${error}`);
        }
    }
}
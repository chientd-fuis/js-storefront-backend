// @ts-ignore
import { Client } from "../database";
import { Book, BookModel } from "./book";

const store = new Book();
describe("Client test", () => {
    it("should test ok", async () => {
        const res = await store.index();
        expect(res).toEqual([{id: 1, name: "asdasd", author:""} as BookModel])
    })
})
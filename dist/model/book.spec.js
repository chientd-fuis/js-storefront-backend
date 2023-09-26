"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("./book");
const store = new book_1.Book();
describe("Client test", () => {
    it("should test ok", async () => {
        const res = await store.index();
        expect(res).toEqual([{ id: 1, name: "asdasd", author: "" }]);
    });
});

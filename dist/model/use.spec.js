"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const store = new user_1.UserModel();
describe('User Model', () => {
    it('should have a getUsers  method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a getUserById method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('should have a createUser method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a deleteUser method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should create a user with auth to true using createUser method', async () => {
        const userReq = {
            first_name: 'John',
            last_name: 'Smith',
            password: 'thisismypassword'
        };
        const result = await store.create(userReq);
        expect(result.user_id).toEqual(1);
        expect(result.token).toBeDefined();
    });
});

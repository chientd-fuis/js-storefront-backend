import { UserTypeAuth, UserTypeRequest } from "../utils/interfaces/UserType";
import { UserModel } from "./user";


const store = new UserModel();

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
    const userReq: UserTypeRequest = {
      first_name: 'John',
      last_name: 'Smith',
      password: 'thisismypassword'
    }
    const result: UserTypeAuth = await store.create(userReq);
    expect(result.user_id).toEqual(1);
    expect(result.token).toBeDefined();
  });
});
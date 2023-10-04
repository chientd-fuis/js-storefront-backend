import {
  UserType,
  UserTypeAccount,
  UserTypeAuth,
  UserTypeInformation,
  UserTypeRequest
} from '../utils/interfaces/UserType';
import { UserModel } from './user';

const store = new UserModel();
let userId: number;
describe('User Model', () => {
  it('should return token when create a user', async () => {
    const userReq: UserTypeRequest = {
      first_name: 'John',
      last_name: 'Smith',
      password: 'thisismypassword'
    };
    const result: UserTypeAuth = await store.create(userReq);
    userId = result.user_id;
    expect(result.user_id).toEqual(5);
    expect(result.token).toBeDefined();
  });

  it('should return user information when call show function', async () => {
    const result: UserTypeInformation = await store.show(userId);
    expect(result.first_name).toEqual('John');
    expect(result.last_name).toEqual('Smith');
  });

  it('should return user token when call authenticate function', async () => {
    const userAuth: UserTypeAccount = {
      user_id: userId,
      password: 'thisismypassword'
    };
    const result: UserTypeAuth = await store.authenticate(userAuth);
    expect(result.user_id).toEqual(userId);
    expect(result.token).not.toBeNull();
  });

  it('should update successfully when call update function', async () => {
    const userUpdate: UserType = {
      user_id: userId,
      first_name: 'Update first name',
      last_name: 'Update last name',
      password: 'new password'
    };
    const result: UserTypeInformation = await store.update(userUpdate);
    expect(result.user_id).toEqual(userId);
    expect(result.first_name).toEqual('Update first name');
    expect(result.last_name).toEqual('Update last name');
  });

  it('should delete successfully when call delete function', async () => {
    await store.delete(userId);
    const exist: UserTypeInformation = await store.show(userId);
    expect(exist).toBeUndefined();
  });
});

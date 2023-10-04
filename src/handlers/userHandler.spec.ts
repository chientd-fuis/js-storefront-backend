import supertest from 'supertest';

import app from '../server';
import {
  UserType,
  UserTypeAccount,
  UserTypeRequest
} from '../utils/interfaces/UserType';

const request = supertest(app);

describe('User Handler', () => {
  const userData: UserTypeRequest = {
    first_name: 'Chien',
    last_name: 'TD',
    password: 'password123'
  };

  let token: string, userId: number;

  describe('POST /users/sign-up', () => {
    it('should return 200', async (): Promise<void> => {
      const response = await request.post('/users/sign-up').send(userData);
      userId = response.body.user_id;
      token = response.body.token;
      expect(response.status).toBe(200);
    });

    it('should return 401 when missing params', async (): Promise<void> => {
      const response = await request.post('/users/sign-up');
      expect(response.status).toBe(401);
    });
  });

  describe('POST /users/sign-in', () => {
    it('should return 200', async (): Promise<void> => {
      const response = await request.post('/users/sign-in').send({
        user_id: userId,
        password: 'password123'
      });
      expect(response.status).toBe(200);
    });

    it('should return 401 when invalid password', async (): Promise<void> => {
      const accountFailuare: UserTypeAccount = {
        user_id: userId,
        password: 'password incorrect'
      };
      const response = await request
        .post('/users/sign-in')
        .send(accountFailuare);
      expect(response.status).toBe(401);
    });
  });

  describe('GET /users/:user_id', () => {
    it('should return 200', async (): Promise<void> => {
      const response = await request
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.first_name).toEqual('Chien');
      expect(response.body.last_name).toEqual('TD');
    });

    it('should return 200 but no data', async (): Promise<void> => {
      const response = await request
        .get('/users/100')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.first_name).toBeUndefined();
    });

    it('should return 401 when token invalid', async (): Promise<void> => {
      const response = await request.get(`/users/${userId}`);
      expect(response.status).toBe(401);
    });
  });

  describe('PUT /users/:user_id', () => {
    const userUpdate: UserType = {
      user_id: userId,
      first_name: 'First Name Update',
      last_name: 'Last Name Update',
      password: 'Password Update'
    };
    it('should return 200', async (): Promise<void> => {
      const response = await request
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(userUpdate);
      expect(response.status).toBe(200);
      expect(response.body.first_name).toEqual('First Name Update');
      expect(response.body.last_name).toEqual('Last Name Update');
      const response1 = await request.post('/users/sign-in').send({
        user_id: userId,
        password: 'Password Update'
      });
      expect(response1.status).toBe(200);
    });

    it('should return 401 when no token', async (): Promise<void> => {
      const response = await request.put('/users/100');
      expect(response.status).toBe(401);
    });

    it('should return 403 when wrong params', async (): Promise<void> => {
      const response = await request
        .put('/users/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /users/:user_id', () => {
    it('should return 200 when deleting success', async (): Promise<void> => {
      const response = await request
        .delete('/users/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('should return 401 when no token', async (): Promise<void> => {
      const response = await request.delete('/users/100');
      expect(response.status).toBe(401);
    });
  });
});

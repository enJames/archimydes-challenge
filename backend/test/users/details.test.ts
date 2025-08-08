
import request from 'supertest';
import { beforeAll, describe, it, expect } from 'vitest';
import appConfig from '../../src/app.config';

const { app, tools } = appConfig;
const { StatusCode } = tools.enums;

describe('GET Users', () => {
  const server = app.server;

  beforeAll(async () => {
    await tools.seedDB();
  });

  it('should return users', async () => {
    const res = await request(server).get('/v1/users');

    const dbUsers = res.body.map((user: any) => ({
      name: user.name,
      email: user.emailAddress,
      role: user.role,
    }));
    const sampleUsers = tools.sampleUsers.map(users => ({
      name: users.name,
      email: users.emailAddress,
      role: users.role,
    }));

    expect(res.status).toBe(StatusCode.SUCCESS);
    expect(dbUsers).toHaveLength(sampleUsers.length);
    expect(dbUsers).toEqual(expect.arrayContaining(sampleUsers));
  });

  it('should return 400 if userId param is invalid', async () => {
    const res = await request(server).get('/v1/users/invalid-id');
    console.log(res.body);
    expect(res.status).toBe(StatusCode.BAD_REQUEST);
    expect(res.body.errors).toEqual(["User ID must be a number"]);
  });

  it('should return 404 for non-existent user', async () => {
    const res = await request(server).get('/v1/users/9999');
    expect(res.status).toBe(StatusCode.NOT_FOUND);
  });

  it('should return details of a user', async () => {
    const userId = 3;
    const res = await request(server).get(`/v1/users/${userId}`);

    expect(res.status).toBe(StatusCode.SUCCESS);
    expect(res.body).toEqual({
      id: userId,
      name: expect.any(String),
      emailAddress: expect.any(String),
      role: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      deletedAt: null,
    });
  });
});

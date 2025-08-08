
import request from 'supertest';
import { beforeAll, describe, it, expect } from 'vitest';
import appConfig from '../../src/app.config';

const { app, tools } = appConfig;
const { StatusCode, UserRole } = tools.enums;

describe('Create Users', () => {
  const server = app.server;

  beforeAll(async () => {
    await tools.seedDB();
  });

  it('should fail if payload data is incorrect', async () => {
    const updatePayload = {
      name: 'Updated User',
      emailAddress: 'invalid-email', // Invalid email
      role: 'InvalidRole', // Invalid role
    };
    const res = await request(server)
      .post(`/v1/users`)
      .send(updatePayload);
    expect(res.status).toBe(StatusCode.BAD_REQUEST);
    expect(res.body.errors).toEqual([
      'Email address is invalid',
      "Role must be either 'Admin' or 'User'",
    ]);
  });

  it('should create user details', async () => {
    const createPayload = {
      name: 'New User',
      emailAddress: `newForyou@email.com`,
      role: UserRole.User,
    };
    const response = await request(server)
      .post(`/v1/users`)
      .send(createPayload);

    const fetchResponse = await request(server).get(`/v1/users/${response.body.id}`);
    console.log('fetchResponse', response.body);

    const { name, emailAddress, role } = fetchResponse.body;

    expect({ name, emailAddress, role }).toEqual(createPayload);
  });
});

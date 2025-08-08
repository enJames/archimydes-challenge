
import request from 'supertest';
import { beforeAll, describe, it, expect } from 'vitest';
import appConfig from '../../src/app.config';

const { app, tools } = appConfig;
const { StatusCode, UserRole } = tools.enums;

describe('Update Users', () => {
  const server = app.server;

  beforeAll(async () => {
    await tools.seedDB();
  });

  it('should fail if payload data is incorrect', async () => {
    const userId = 1;
    const updatePayload = {
      name: 'Updated User',
      emailAddress: 'invalid-email', // Invalid email
      role: 'InvalidRole', // Invalid role
    };
    const res = await request(server)
      .put(`/v1/users/${userId}`)
      .send(updatePayload);
    expect(res.status).toBe(StatusCode.BAD_REQUEST);
    expect(res.body.errors).toEqual([
      'Email address is invalid',
      "Role must be either 'Admin' or 'User'",
    ]);
  });

  it('should update user details', async () => {
    const userId = 2;
    const updatePayload = {
      name: 'Updated User',
      emailAddress: `email.update${Date.now()}@email.com`,
      role: UserRole.User,
    };
    await request(server)
      .put(`/v1/users/${userId}`)
      .send(updatePayload);

    const fetchResponse = await request(server).get(`/v1/users/${userId}`);

    const { name, emailAddress, role } = fetchResponse.body;

    expect({ name, emailAddress, role }).toEqual(updatePayload);
  });
});

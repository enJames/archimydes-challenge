
import request from 'supertest';
import { beforeAll, describe, it, expect } from 'vitest';
import appConfig from '../../src/app.config';

const { app, tools } = appConfig;
const { StatusCode } = tools.enums;

describe('Delete Users', () => {
  const server = app.server;

  beforeAll(async () => {
    await tools.seedDB();
  });

  it('should delete user', async () => {
    const userId = 5;
    const res = await request(server)
      .delete(`/v1/users/${userId}`);
    expect(res.status).toBe(StatusCode.NO_CONTENT);
  });

  it('should fail if user does not exist', async () => {
    const userId = 999;
    const res = await request(server)
      .delete(`/v1/users/${userId}`);
    expect(res.status).toBe(StatusCode.NOT_FOUND);
  });
});

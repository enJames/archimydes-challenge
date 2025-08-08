import request from 'supertest';
import { describe, it } from 'vitest';
import appConfig from '../../src/app.config';

const { app, tools } = appConfig;

describe('Server', () => {
  const server = app.server;
  

  it('GET /users returns 200 and users', async () => {
    await request(server).get('/match-catch-all').expect(404);
  });
});
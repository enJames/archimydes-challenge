import * as express from 'express';

declare global {
  type Router = express.Router;
  namespace Express {
    interface Request {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      locals: {
        user: UserPayload;
      }
    }
  }
}

export { }
interface AppRoutes {
  path: string;
  router: import('express').Router;
}

interface RouteConfig {
  authRoutes: AppRoutes[];
  unAuthRoutes: AppRoutes[];
}

type Tools = typeof import('../src/tools').default;

interface CookieData {
  accessToken: string;
  refreshToken: string;
  login: boolean;
}

type ExpressResponse = typeof import('express').response;
type NextFunction = import('express').NextFunction;
type ExpressRequest = typeof import('express').request;


declare enum RequestMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

interface ObjectKeyValueString {
  [key: string]: string;
}

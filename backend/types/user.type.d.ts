interface UserPayload {
  id: number;
  role: UserRole;
}

interface JWTPayload {
  user: UserPayload;
  exp?: number
}

interface JWT {
  verify: (token: string, secret: string) => string | JWTPayload;
  decode: (token: string, secret: string) => string | JWTPayload;
  sign: (payload: JWTPayload, secret: string) => string;
}

interface BaseUser {
  name: string;
  emailAddress: string;
  role: UserRole;
}

interface User  extends BaseUser {
  id: number;
}

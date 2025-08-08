enum UserRole {
  Admin = 'Admin',
  User = 'User',
  System = 'System'
}

enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  NOT_FOUND = 404,
  NO_CONTENT = 204,
  FORBIDDEN = 403,
  CONFLICT = 409,
  INTERNAL_ERROR = 500
}

export default {
  StatusCode,
  UserRole,
}
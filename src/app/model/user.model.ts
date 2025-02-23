export interface User {
  id: string;
  username: string;
  token: string;
  role: Role;
}

export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  MODERATOR = 'ROLE_MODERATOR'
}

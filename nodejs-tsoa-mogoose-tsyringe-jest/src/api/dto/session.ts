export type UserSession = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export type AuthRequest = {
  user: UserSession;
};

import { Session } from "next-auth";

enum Role {
  ADMIN,
  USER,
}

export interface Credentials {
  email: string;
  password: string;
}

export interface CreateUser {
  name: string;
  image?: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}

export interface UserProfile {
  id: string;
  image: string;
  name: string;
  phone: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfile {
  image: string;
  name: string;
  phone: string;
  email: string;
  username: string;
}

export interface SessionInterface extends Session {
  user: UserSession;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: Role;
  isActive: boolean;
  urlsLimit: number;
}

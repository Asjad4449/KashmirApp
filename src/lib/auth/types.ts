// src/types.ts

import { Role } from '../../constants/enums';

export interface UserSession {
  id: string;
  email: string;
  name: string | null;
  role: Role; // Updated to use Role type
  image?: string | null;
}

export interface AuthError {
  type: 'AuthError';
  message: string;
}

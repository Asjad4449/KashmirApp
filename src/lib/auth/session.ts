import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { UserSession } from './types';

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const session = await getSession();
  return session?.user as UserSession || null;
}
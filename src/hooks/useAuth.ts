// src/hooks/useAuth.ts

import { useSession } from 'next-auth/react';
import { Roles, Role } from '../constants/enums'; // Ensure the correct import path to enums
import type { UserSession } from '../lib/auth/types'; // Ensure the correct path to types

/**
 * Custom hook to manage user authentication and role-based access.
 */
export function useAuth() {
  const { data: session, status } = useSession(); // Fetch session data
  const user = session?.user as UserSession | undefined; // Type assertion for UserSession

  // Return user info and utility functions for role-based checks
  return {
    user,
    isAuthenticated: !!session, // Check if the session exists
    isLoading: status === 'loading', // Check if the session is still loading
    isSeller: user?.role === Roles.SELLER, // Check if the user is a seller
    isAdmin: user?.role === Roles.ADMIN,  // Check if the user is an admin
    isBuyer: user?.role === Roles.BUYER, // Check if the user is a buyer
  };
}

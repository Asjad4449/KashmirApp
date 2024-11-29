// src/lib/auth/guards.ts

import { Roles, Role } from '../../constants/enums'; // Ensure correct path to enums

/**
 * Function to check if a user role is authorized to access certain functionality.
 *
 * @param userRole - The role of the user (e.g., ADMIN, SELLER).
 * @param allowedRoles - An array of roles that are allowed.
 * @returns True if the user is authorized, otherwise false.
 */
export const canAccess = (userRole: Role, allowedRoles: Role[]): boolean => {
  return allowedRoles.includes(userRole); // Check if userRole is in the allowedRoles list
};

/**
 * Example guard to check if a user has admin access.
 *
 * @param userRole - The role of the user.
 * @returns True if the user is an admin, otherwise false.
 */
export const isAdminGuard = (userRole: Role): boolean => {
  return userRole === Roles.ADMIN; // Check if the role is ADMIN
};

/**
 * Example guard to check if a user has seller access.
 *
 * @param userRole - The role of the user.
 * @returns True if the user is a seller, otherwise false.
 */
export const isSellerGuard = (userRole: Role): boolean => {
  return userRole === Roles.SELLER; // Check if the role is SELLER
};

/**
 * Example guard to check if a user has buyer access.
 *
 * @param userRole - The role of the user.
 * @returns True if the user is a buyer, otherwise false.
 */
export const isBuyerGuard = (userRole: Role): boolean => {
  return userRole === Roles.BUYER; // Check if the role is BUYER
};

// Usage examples:
// const allowedRoles: Role[] = [Roles.ADMIN, Roles.SELLER];
// const isAuthorized = canAccess(userRole, allowedRoles);

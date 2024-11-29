// src/constants/enums.ts

// Role constants
export const Roles = {
    ADMIN: 'ADMIN',
    SELLER: 'SELLER',
    BUYER: 'BUYER',
  } as const;
  
  export type Role = typeof Roles[keyof typeof Roles];
  
  // Store Tier constants
  export const StoreTiers = {
    BASIC: 'BASIC',
    PREMIUM: 'PREMIUM',
    EXCLUSIVE: 'EXCLUSIVE',
  } as const;
  
  export type StoreTier = typeof StoreTiers[keyof typeof StoreTiers];
  
  // Order Status constants
  export const OrderStatuses = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
  } as const;
  
  export type OrderStatus = typeof OrderStatuses[keyof typeof OrderStatuses];
  
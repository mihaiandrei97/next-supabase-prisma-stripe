export const ProTier = {
    BASIC: "BASIC",
    GOLD: "GOLD",
    PLATINUM: "PLATINUM"
} as const;
export type ProTier = (typeof ProTier)[keyof typeof ProTier];
export const Role = {
    ADMIN: "ADMIN",
    USER: "USER"
} as const;
export type Role = (typeof Role)[keyof typeof Role];

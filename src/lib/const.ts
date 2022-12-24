require('dotenv').config();

export const JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRED: process.env.JWT_EXPIRED,
};

export const ROLES = {
  SUPERADMIN: "Super Admin",
  ADMIN: "Admin",
  MEMBER: "Member",
};

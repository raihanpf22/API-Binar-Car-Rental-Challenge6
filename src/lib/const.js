"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.JWT = void 0;
require('dotenv').config();
exports.JWT = {
    SECRET: process.env.JWT_SECRET,
    EXPIRED: process.env.JWT_EXPIRED,
};
exports.ROLES = {
    SUPERADMIN: "Super Admin",
    ADMIN: "Admin",
    MEMBER: "Member",
};

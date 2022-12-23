"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.isNotMember = exports.isSuperAdmin = exports.authenticate = void 0;
const const_1 = require("../lib/const");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const const_2 = require("../lib/const");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get("Authorization");
    let token = "";
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }
    else {
        return res.status(401).send({
            status_code: 401,
            message: "You must be login first, before access this endpoint.",
            data: "Null",
        });
    }
    try {
        const { email } = jsonwebtoken_1.default.verify(token, const_2.JWT.SECRET);
        const getUser = yield userRepository_1.default.getByEmail({ email });
        req.user = getUser;
        next();
        return;
    }
    catch (error) {
        return res.status(401).send({
            status_code: 401,
            message: error.message,
            data: "Null",
        });
    }
});
exports.authenticate = authenticate;
const isSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.role === const_1.ROLES.SUPERADMIN)
        return next();
    return res.status(401).send({
        status_code: 401,
        message: "You are unauthorized, Please go back !",
        data: "Null",
    });
});
exports.isSuperAdmin = isSuperAdmin;
const isNotMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.role !== const_1.ROLES.MEMBER)
        return next();
    return res.status(401).send({
        status_code: 401,
        message: "You're role is member, can't create new data.",
        data: "Null",
    });
});
exports.isNotMember = isNotMember;
const currentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send(req.user);
});
exports.currentUser = currentUser;

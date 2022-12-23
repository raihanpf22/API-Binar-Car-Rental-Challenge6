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
exports.googleLogin = exports.login = exports.registerAdmin = exports.register = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const { status_code, message, data } = yield authService_1.default.register({
        name,
        email,
        password,
    });
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        data: data,
    });
});
exports.register = register;
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const { status_code, message, data } = yield authService_1.default.registerAdmin({
        name,
        email,
        password,
    });
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        data: data,
    });
});
exports.registerAdmin = registerAdmin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { status_code, message, data, token } = yield authService_1.default.login({
        email,
        password,
    });
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        token: token,
        data: data,
    });
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential } = req.body;
    const { status_code, message, data } = yield authService_1.default.loginGoogle({ credential });
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        data: data,
    });
});
exports.googleLogin = googleLogin;

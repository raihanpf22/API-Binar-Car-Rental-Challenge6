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
exports.userList = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = __importDefault(require("../services/userService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield userService_1.default.list();
    return res.status(Result.status_code).send({
        status_code: Result.status_code,
        message: Result.message,
        data: Result.data,
    });
});
exports.userList = userList;

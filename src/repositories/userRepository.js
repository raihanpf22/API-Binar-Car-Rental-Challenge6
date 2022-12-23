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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../db/models/User");
class userRepository {
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield User_1.User.findAll();
            return list;
        });
    }
    static create({ name, email, role, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const create = yield User_1.User.create({
                name,
                email,
                role,
                password,
            });
            return create;
        });
    }
    static getByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUser = yield User_1.User.findOne({ where: { email } });
            return getUser;
        });
    }
}
exports.default = userRepository;

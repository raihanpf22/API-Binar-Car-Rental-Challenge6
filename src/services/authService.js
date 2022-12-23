"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const const_1 = require("../lib/const");
const dotenv = __importStar(require("dotenv"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
dotenv.config();
class authService {
    static register({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcrypt_1.default.genSaltSync(10);
            try {
                // Payload Validation
                if (!name) {
                    return {
                        status_code: 400,
                        messsage: "Name can't be null.",
                        data: null,
                    };
                }
                else if (!email) {
                    return {
                        status_code: 400,
                        message: "Email can't be null",
                        data: null,
                    };
                }
                else if (!password) {
                    return {
                        status_code: 400,
                        message: "Password can't be null",
                        data: null,
                    };
                }
                else if (password.length < 8) {
                    return {
                        status_code: 400,
                        message: "Password atleast 8 character",
                        data: "null",
                    };
                }
                const getUserByEmail = yield userRepository_1.default.getByEmail({ email });
                if (getUserByEmail) {
                    return {
                        status_code: 400,
                        message: "Email has been registered, try another email !",
                        data: "null",
                    };
                }
                else {
                    const hash = bcrypt_1.default.hashSync(password, salt);
                    const role = "Member";
                    const createdUser = yield userRepository_1.default.create({
                        name,
                        email,
                        role: role,
                        password: hash,
                    });
                    return {
                        status_code: 201,
                        message: "Success OK !",
                        data: createdUser,
                    };
                }
            }
            catch (error) {
                return {
                    status_code: 400,
                    message: error.message,
                    data: "null",
                };
            }
        });
    }
    static registerAdmin({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcrypt_1.default.genSaltSync(10);
            try {
                if (!name) {
                    return {
                        status_code: 400,
                        message: "Name can't be null",
                        data: "Null",
                    };
                }
                else if (!email) {
                    return {
                        status_code: 400,
                        message: "Email can't be null",
                        data: "Null",
                    };
                }
                else if (!password) {
                    return {
                        status_code: 400,
                        message: "Pasword can't be null",
                        data: "Null",
                    };
                }
                else if (password.length < 8) {
                    return {
                        status_code: 400,
                        message: "Password must be at least 8 character",
                        data: "Null",
                    };
                }
                const getUser = yield userRepository_1.default.getByEmail({ email });
                if (getUser) {
                    return {
                        status_code: 400,
                        message: "Email has registered, try another email !",
                        data: "Null",
                    };
                }
                else {
                    const hash = bcrypt_1.default.hashSync(password, salt);
                    const role = "Admin";
                    const createAdmin = yield userRepository_1.default.create({
                        name,
                        email,
                        role: role,
                        password: hash,
                    });
                    return {
                        status_code: 201,
                        message: "Success OK !",
                        data: createAdmin,
                    };
                }
            }
            catch (error) {
                return {
                    status_code: 400,
                    message: error.message,
                    data: "Null",
                };
            }
        });
    }
    static login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email) {
                    return {
                        status_code: 400,
                        message: "Email required.",
                        data: "Null",
                    };
                }
                else if (!password) {
                    return {
                        status_code: 400,
                        message: "Password required",
                        data: "Null",
                    };
                }
                const getUser = yield userRepository_1.default.getByEmail({ email });
                if (!getUser) {
                    return {
                        status_code: 404,
                        message: "Email can't be found, are your register yet ?",
                        data: "Null",
                    };
                }
                else {
                    const comparePassword = yield bcrypt_1.default.compare(password, getUser.password);
                    if (comparePassword) {
                        const istoken = jsonwebtoken_1.default.sign({
                            id: getUser.id,
                            email: getUser.email,
                        }, const_1.JWT.SECRET, { expiresIn: const_1.JWT.EXPIRED });
                        return {
                            status_code: 200,
                            message: "Success OK !",
                            token: istoken,
                            data: getUser,
                        };
                    }
                    else {
                        return {
                            status_code: 400,
                            message: "Password Invalid !",
                            data: "Null",
                        };
                    }
                }
            }
            catch (error) {
                return {
                    status_code: 400,
                    message: error.message,
                    data: "Null",
                };
            }
        });
    }
    static loginGoogle(googleCredential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get google user credential
                const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
                const userInfo = yield client.verifyIdToken({
                    idToken: googleCredential.credential,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = userInfo.getPayload();
                if (payload != undefined && payload.email_verified) {
                    const email = payload.email;
                    const getUserByEmail = yield userRepository_1.default.getByEmail({ email });
                    if (getUserByEmail) {
                        const token = jsonwebtoken_1.default.sign({
                            id: getUserByEmail.id,
                            email: getUserByEmail.email,
                        }, const_1.JWT.SECRET, {
                            expiresIn: const_1.JWT.EXPIRED,
                        });
                        return {
                            status_code: 200,
                            message: "Success OK!",
                            data: token,
                        };
                    }
                    else {
                        return {
                            status_code: 404,
                            message: "Data Not Found.",
                            data: "Null",
                        };
                    }
                }
                else {
                    return {
                        status_code: 404,
                        message: "User Info Not Found.",
                        data: "Null",
                    };
                }
            }
            catch (error) {
                return {
                    status_code: 400,
                    message: error.message,
                    data: "Null",
                };
            }
        });
    }
}
exports.default = authService;

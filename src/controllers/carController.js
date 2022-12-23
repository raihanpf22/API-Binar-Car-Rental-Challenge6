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
exports.carAvailable = exports.carDelete = exports.carUpdate = exports.carCreate = exports.carList = void 0;
const express_1 = __importDefault(require("express"));
const carService_1 = __importDefault(require("../services/carService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const const_1 = require("../lib/const");
const { Cloudinary } = require("../utils/cloudinary");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const carList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield carService_1.default.list();
    return res.status(Result.status_code).send({
        status_code: Result.status_code,
        message: Result.message,
        data: Result.data,
    });
});
exports.carList = carList;
const carCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
    const { email } = jsonwebtoken_1.default.verify(token, const_1.JWT.SECRET);
    const { no_police, brand, model, price_perday, capacity, status, transmision, type, } = req.body;
    const result = yield Cloudinary.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    const image = result.url;
    const { status_code, message, data } = yield carService_1.default.create({
        no_police,
        brand,
        model,
        image,
        price_perday,
        capacity,
        status,
        transmision,
        type,
        createdBy: email,
        updatedBy: email,
    });
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        data: data,
    });
});
exports.carCreate = carCreate;
const carUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
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
    const { email } = jsonwebtoken_1.default.verify(token, const_1.JWT.SECRET);
    const update_at = new Date();
    const { no_police, brand, model, image, price_perday, capacity, status, transmision, type, } = req.body;
    yield carService_1.default.update({
        id,
        no_police,
        brand,
        model,
        image,
        price_perday,
        capacity,
        status,
        transmision,
        type,
        updatedBy: email,
        UpdatedAt: update_at,
    });
    const { status_code, message, data } = yield carService_1.default.getById({
        id,
    });
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        data: data,
    });
});
exports.carUpdate = carUpdate;
const carDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status_code, message, data } = yield carService_1.default.deleted({
        id,
    });
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        data: data,
    });
});
exports.carDelete = carDelete;
const carAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status_code, message, data } = yield carService_1.default.getCarAvailable();
    return res.status(status_code).send({
        status_code: status_code,
        message: message,
        data: data,
    });
});
exports.carAvailable = carAvailable;

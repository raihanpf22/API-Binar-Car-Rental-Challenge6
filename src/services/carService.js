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
const carRepository_1 = __importDefault(require("../repositories/carRepository"));
class carService {
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAll = yield carRepository_1.default.list();
                if (!getAll) {
                    return {
                        status_code: 404,
                        message: "Error can't find data !",
                        data: "Null",
                    };
                }
                else {
                    return {
                        status_code: 200,
                        message: "Success OK!",
                        data: getAll,
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
    static create({ no_police, brand, model, image, price_perday, capacity, status, transmision, type, createdBy, updatedBy, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createCar = yield carRepository_1.default.create({
                    no_police,
                    brand,
                    model,
                    image,
                    price_perday,
                    capacity,
                    status,
                    transmision,
                    type,
                    createdBy,
                    updatedBy,
                });
                if (!createCar) {
                    return {
                        status_code: 400,
                        message: "Can't create data.",
                        data: "Null",
                    };
                }
                else {
                    return {
                        status_code: 201,
                        message: "Success OK!",
                        data: createCar,
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
    static update({ id, no_police, brand, model, image, price_perday, capacity, status, transmision, type, updatedBy, UpdatedAt }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateCar = yield carRepository_1.default.update({
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
                    updatedBy,
                    UpdatedAt,
                });
                if (!updateCar) {
                    return {
                        status_code: 400,
                        message: "Can't update data car.",
                        data: "Null",
                    };
                }
                else {
                    return {
                        status_code: 201,
                        message: "Success OK!",
                        data: updateCar,
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
    static getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCar = yield carRepository_1.default.getById({ id });
                if (!getCar) {
                    return {
                        status_code: 404,
                        message: "Error can't find data !",
                        data: "Null",
                    };
                }
                else {
                    return {
                        status_code: 201,
                        message: "Success OK!",
                        data: getCar,
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
    static deleted({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteCar = yield carRepository_1.default.deleted({ id });
                if (!deleteCar) {
                    return {
                        status_code: 400,
                        message: "Error data can't be deleted",
                        data: "Null",
                    };
                }
                else {
                    return {
                        status_code: 200,
                        message: "Success OK!",
                        data: "Successfully deleted data !",
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
    static getCarAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCar = yield carRepository_1.default.getCarAvailable();
                if (!getCar) {
                    return {
                        status_code: 404,
                        message: "Error can't find data !",
                        data: "Null",
                    };
                }
                else {
                    return {
                        status_code: 200,
                        message: "Success OK!",
                        data: getCar,
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
exports.default = carService;

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
const Car_1 = require("../../db/models/Car");
class carRepository {
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield Car_1.Car.findAll();
            return list;
        });
    }
    static create({ no_police, brand, model, image, price_perday, capacity, status, transmision, type, createdBy, updatedBy, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const create = yield Car_1.Car.create({
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
            return create;
        });
    }
    static update({ id, no_police, brand, model, image, price_perday, capacity, status, transmision, type, createdBy, updatedBy, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateCar = yield Car_1.Car.update({
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
            }, { where: { id } });
            return updateCar;
        });
    }
    static getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const getCar = yield Car_1.Car.findByPk(id);
            return getCar;
        });
    }
    static deleted({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteCar = yield Car_1.Car.destroy({ where: { id } });
            return deleteCar;
        });
    }
    static getCarAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = true;
            const getCar = yield Car_1.Car.findAndCountAll({ where: { status: status } });
            return getCar;
        });
    }
}
exports.default = carRepository;

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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("POST / - Login Module", () => {
    it("Should response with 200 as status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            email: "raihanpambagyo@gmail.com",
            password: "P@ssw0rd",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(payload)
            .set("Content-type", "application/json")
            .then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.data).not.toEqual(null);
        });
    }));
});

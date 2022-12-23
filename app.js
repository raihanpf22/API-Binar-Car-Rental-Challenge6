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
// Import the express in typescript file
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./src/config/connection"));
const authController_1 = require("./src/controllers/authController");
const carController_1 = require("./src/controllers/carController");
const userController_1 = require("./src/controllers/userController");
const authMiddleware_1 = require("./src/middlewares/authMiddleware");
const multer_1 = require("./src/utils/multer");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./src/swagger.json"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
// Initialize the express engine
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Take a port 3000 for running server.
const port = process.env.PORT;
// Post Google Login
app.post("/google_login", authController_1.googleLogin);
// Get All user
app.get("/users", authMiddleware_1.authenticate, userController_1.userList);
// Register user member role
app.post("/register", authController_1.register);
// Register user Admin role
app.post("/admin/register", authMiddleware_1.authenticate, authMiddleware_1.isSuperAdmin, authController_1.registerAdmin);
// Login
app.post("/login", authController_1.login);
// Get All car
app.get("/cars", carController_1.carList);
// Create data car
app.post("/cars/create", authMiddleware_1.authenticate, authMiddleware_1.isNotMember, multer_1.multerUpload.single("image"), carController_1.carCreate);
// Update data car
app.put("/cars/edit/:id", authMiddleware_1.authenticate, authMiddleware_1.isNotMember, carController_1.carUpdate);
// Delete data car
app.delete("/cars/delete/:id", authMiddleware_1.authenticate, authMiddleware_1.isNotMember, carController_1.carDelete);
// Current User
app.get("/current_user", authMiddleware_1.authenticate, authMiddleware_1.currentUser);
// Get By Status Available Car
app.get("/car_available", authMiddleware_1.authenticate, carController_1.carAvailable);
// Server setup
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.sync();
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}/`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
void start();
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRoute = express_1.default.Router();
userRoute.get('/me', user_controller_1.userController.findMe);
userRoute.put('/me', user_controller_1.userController.updateMe);
exports.default = userRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const zodValidation_1 = __importDefault(require("../utilities/validation/zodValidation"));
const authRoute = express_1.default.Router();
authRoute.post('/signup', (0, zodValidation_1.default)(auth_validation_1.authSignupValidation), auth_controller_1.authControllers.authControllerSignUp);
authRoute.post('/login', (0, zodValidation_1.default)(auth_validation_1.authValidationLogin), auth_controller_1.authControllers.authControllerLogin);
exports.default = authRoute;

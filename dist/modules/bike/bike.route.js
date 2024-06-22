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
exports.auth = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const bike_validation_1 = require("./bike.validation");
const zodValidation_1 = __importDefault(require("../utilities/validation/zodValidation"));
const auth_model_1 = require("../auth/auth.model");
const jwt_1 = require("../utilities/jwt/jwt");
const bikeRoute = express_1.default.Router();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const decode = jwt_1.jwts.jwtVerify(accessToken);
    const { payLoad } = decode;
    const { email, password } = payLoad;
    const adminCheck = yield auth_model_1.userModel.findOne({ email, password });
    const { role } = adminCheck;
    if (role === 'admin') {
        next();
    }
    else {
        res.json({
            message: 'you are not admin'
        });
    }
});
exports.auth = auth;
bikeRoute.post('/', exports.auth, (0, zodValidation_1.default)(bike_validation_1.bikeValidation), bike_controller_1.bikeController.createBike);
bikeRoute.get('/', bike_controller_1.bikeController.getAllBike);
bikeRoute.put('/:id', exports.auth, bike_controller_1.bikeController.updateBike);
bikeRoute.delete('/:id', exports.auth, bike_controller_1.bikeController.deleteBike);
exports.default = bikeRoute;

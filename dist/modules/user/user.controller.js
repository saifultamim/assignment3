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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const jwt_1 = require("../utilities/jwt/jwt");
const findMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            return ('No Access Token');
        }
        const verfiedToken = jwt_1.jwts.jwtVerify(accessToken);
        const result = yield user_service_1.userService.findMe(verfiedToken);
        res.json({
            success: true,
            statusCode: 200,
            message: "User profile retrieved successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const updateMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const updatedData = req.body;
        const accessToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!accessToken) {
            return ('No Access Token');
        }
        const verfiedToken = jsonwebtoken_1.default.verify(accessToken, config_1.default.access_token_secret);
        const result = yield user_service_1.userService.updateMe(updatedData, verfiedToken);
        res.json({
            success: true,
            statusCode: 200,
            message: "Profile updated successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    findMe,
    updateMe,
};

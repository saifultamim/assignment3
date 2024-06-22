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
exports.authControllers = void 0;
const auth_service_1 = require("./auth.service");
const authControllerSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payLoad = req.body;
        const result = yield auth_service_1.userServices.authServiceSignUp(payLoad);
        res.json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const authControllerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payLoad = req.body;
        const { success, jwt_token, loginUser } = yield auth_service_1.userServices.authServiceLogin(payLoad);
        res.json({
            success: success ? true : false,
            statusCode: success ? 200 : 401,
            message: success ? "User logged in successfully" : "plz sign up first",
            token: success ? jwt_token : 'not jwt token',
            data: success ? loginUser : 'no data found'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authControllers = {
    authControllerSignUp,
    authControllerLogin,
};

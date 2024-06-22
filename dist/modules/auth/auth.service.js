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
exports.userServices = void 0;
const auth_model_1 = require("./auth.model");
const jwt_1 = require("../utilities/jwt/jwt");
//import jwt from 'jsonwebtoken'
//import config from "../../config"
const authServiceSignUp = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.userModel.create(payLoad);
    const updateResult = result.toObject();
    delete updateResult.password;
    return updateResult;
});
const authServiceLogin = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    let jwt_token;
    let loginUser;
    let success;
    const { email, password } = payLoad;
    const findUser = yield auth_model_1.userModel.find({ email, password });
    if (findUser.length > 0) {
        const id = findUser[0]._id.toHexString();
        const payLoads = Object.assign(Object.assign({}, payLoad), { id });
        jwt_token = jwt_1.jwts.jwtSign(payLoads);
        yield auth_model_1.userModelLogin.create({ email, password });
        loginUser = yield auth_model_1.userModel.findOne({ email, password }).select({ password: 0, createdAt: 0, updatedAt: 0 });
        success = true;
        return {
            success,
            jwt_token,
            loginUser
        };
    }
    else {
        success = false;
        return success;
    }
});
exports.userServices = {
    authServiceSignUp,
    authServiceLogin,
};

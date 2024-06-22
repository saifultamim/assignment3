"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwts = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const jwtSign = (payLoad) => {
    return jsonwebtoken_1.default.sign({
        payLoad
    }, config_1.default.access_token_secret, { expiresIn: '5 days' });
};
const jwtVerify = (accessToken) => {
    return jsonwebtoken_1.default.verify(accessToken, config_1.default.access_token_secret);
};
exports.jwts = {
    jwtSign,
    jwtVerify
};

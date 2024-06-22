"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.userService = void 0;
const auth_model_1 = require("../auth/auth.model");
const findMe = (payLoads) => __awaiter(void 0, void 0, void 0, function* () {
    const { payLoad } = payLoads;
    const { email, password } = payLoad;
    const result = yield auth_model_1.userModel.find({ email, password }).select({ password: 0 });
    return result;
});
const updateMe = (updatedData, payLoads) => __awaiter(void 0, void 0, void 0, function* () {
    const { payLoad } = payLoads;
    const { email, password } = payLoad;
    const options = {
        new: true
    };
    const result = yield auth_model_1.userModel.findOneAndUpdate({ email, password }, updatedData, options).select({ _id: 1, name: 1, email: 1, phone: 1, address: 1, role: 1 });
    return result;
});
exports.userService = {
    findMe,
    updateMe,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModelLogin = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] }
}, {
    timestamps: true,
});
const userSchemaLogin = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});
exports.userModel = (0, mongoose_1.model)('user', userSchema);
exports.userModelLogin = (0, mongoose_1.model)('userLogin', userSchemaLogin);

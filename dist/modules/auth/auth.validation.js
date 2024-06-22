"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationLogin = exports.authSignupValidation = void 0;
const zod_1 = require("zod");
exports.authSignupValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name is required" }),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password must be at least 6 characters long"),
    phone: zod_1.z.string().min(1, 'Number is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
    role: zod_1.z.enum(['admin', 'user']).refine((val) => val === 'admin' || val === 'user', {
        message: "Role must be either 'admin' or 'user'"
    })
});
exports.authValidationLogin = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password must be at least 6 characters long")
});

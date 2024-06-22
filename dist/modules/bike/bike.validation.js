"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidation = void 0;
const zod_1 = require("zod");
exports.bikeValidation = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    pricePerHour: zod_1.z.number().positive(),
    isAvailable: zod_1.z.boolean().optional(),
    cc: zod_1.z.number().positive().int(),
    year: zod_1.z.number().int().gte(1900).lte(new Date().getFullYear()),
    model: zod_1.z.string(),
    brand: zod_1.z.string()
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dateStringSchema = zod_1.z.string().refine((date) => {
    //the ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
    return iso8601Regex.test(date);
}, {
    message: 'Invalid date format, expected ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)',
});
const rentValidation = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    bikeId: zod_1.z.string(),
    startTime: dateStringSchema,
    returnTime: dateStringSchema.optional(),
    totalCost: zod_1.z.number().default(0),
    isReturned: zod_1.z.boolean().default(false),
});
exports.default = rentValidation;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeModel = void 0;
const mongoose_1 = require("mongoose");
const bikeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true }
});
exports.bikeModel = (0, mongoose_1.model)('bike', bikeSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId },
    bikeId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, required: true, default: 0 },
    isReturned: { type: Boolean, required: true, default: false },
});
exports.bookingModel = (0, mongoose_1.model)('booking', bookingSchema);

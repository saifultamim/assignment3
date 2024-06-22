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
exports.bikeController = void 0;
const bike_service_1 = require("./bike.service");
const createBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.bikeService.createBike(req.body);
        res.json({
            success: true,
            statusCode: 200,
            message: "Bike added successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.bikeService.getAllBike();
        return res.json({
            success: true,
            statusCode: 200,
            message: "Bikes retrieved successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = req.body;
        const id = req.params.id;
        const result = yield bike_service_1.bikeService.updateBike(updatedData, id);
        return res.json({
            success: true,
            statusCode: 200,
            message: "Bike updated successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield bike_service_1.bikeService.deleteBike(id);
        return res.json({
            success: true,
            statusCode: 200,
            message: "Bike deleted successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.bikeController = {
    createBike,
    getAllBike,
    updateBike,
    deleteBike,
};

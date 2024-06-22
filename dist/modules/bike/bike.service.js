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
exports.bikeService = void 0;
const bike_model_1 = require("./bike.model");
const createBike = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.bikeModel.create(payLoad);
    return result;
});
const getAllBike = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.bikeModel.find({});
    return result;
});
const updateBike = (updatedData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        new: true
    };
    const result = yield bike_model_1.bikeModel.findOneAndUpdate({ _id: id }, updatedData, options);
    return result;
});
const deleteBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { new: true };
    const isAvailable = false;
    const result = yield bike_model_1.bikeModel.findOneAndUpdate({ _id: id }, { isAvailable }, options);
    return result;
});
exports.bikeService = {
    createBike,
    getAllBike,
    updateBike,
    deleteBike,
};

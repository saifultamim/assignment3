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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalService = void 0;
const rental_model_1 = require("./rental.model");
const bike_model_1 = require("../bike/bike.model");
const jwt_1 = require("../utilities/jwt/jwt");
const createRental = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const allData = Object.assign(Object.assign({}, data), { userId });
    const availableCheck = yield bike_model_1.bikeModel.findOne({ _id: data.bikeId }).select({ isAvailable: 1 });
    const { isAvailable } = availableCheck;
    if (!isAvailable) {
        const result = yield rental_model_1.bookingModel.create(allData);
        const modifyTime = result.startTime;
        const datePart1 = JSON.stringify(modifyTime).slice(1, 18);
        const datePart2 = JSON.stringify(modifyTime).slice(22, 25);
        const finalmodified = `${datePart1}${datePart2}`;
        const result2 = __rest(result, []);
        result2._doc.startTime = finalmodified;
        return result2._doc;
    }
    else {
        return 'Alrady Rent This Bike';
    }
});
const returnBike = (accessToken, id) => __awaiter(void 0, void 0, void 0, function* () {
    const BikeAvailabilityStatus1 = yield rental_model_1.bookingModel.findOne({ _id: id }).select({ bikeId: 1 });
    const _id = BikeAvailabilityStatus1 === null || BikeAvailabilityStatus1 === void 0 ? void 0 : BikeAvailabilityStatus1.bikeId;
    const options = {
        new: true
    };
    const BikeAvailabilityStatus2 = yield bike_model_1.bikeModel.findOneAndUpdate({ _id }, { isAvailable: true }, options);
    if (BikeAvailabilityStatus2 === null || BikeAvailabilityStatus2 === void 0 ? void 0 : BikeAvailabilityStatus2.isAvailable) {
        const timeReturn = new Date();
        const BikeAvailabilityStatus3 = yield rental_model_1.bookingModel.findOneAndUpdate({ _id: id }, { returnTime: timeReturn }, options);
        const startTime = new Date(BikeAvailabilityStatus3 === null || BikeAvailabilityStatus3 === void 0 ? void 0 : BikeAvailabilityStatus3.startTime);
        const returnTime = new Date(BikeAvailabilityStatus3 === null || BikeAvailabilityStatus3 === void 0 ? void 0 : BikeAvailabilityStatus3.returnTime);
        const diffHours = Math.abs((returnTime.getTime() - startTime.getTime()) / 36e5);
        const totalCost = (diffHours * 15).toFixed(2);
        const BikeAvailabilityStatus4 = yield rental_model_1.bookingModel.findOneAndUpdate({ _id: id }, { totalCost: totalCost,
            isReturned: true }, options);
        return BikeAvailabilityStatus4;
    }
});
const getAllRent = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jwt_1.jwts.jwtVerify(accessToken);
    const { payLoad } = decode;
    const id = payLoad.id;
    const userRent = yield rental_model_1.bookingModel.find({ userId: id });
    return userRent;
});
exports.rentalService = {
    createRental,
    returnBike,
    getAllRent
};

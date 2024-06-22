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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalController = void 0;
const rental_service_1 = require("./rental.service");
const jwt_1 = require("../utilities/jwt/jwt");
const noDataFound_1 = __importDefault(require("../utilities/noDataFound/noDataFound"));
const createRental = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.body;
        const access_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const verifiedToken = jwt_1.jwts.jwtVerify(access_token);
        const { payLoad } = verifiedToken;
        const id = payLoad.id;
        const result = yield rental_service_1.rentalService.createRental(data, id);
        return res.json({
            success: true,
            statusCode: 200,
            message: "Rental created successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const returnBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const accessToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        const id = req.params.id;
        const result = yield rental_service_1.rentalService.returnBike(accessToken, id);
        return res.json({
            success: true,
            statusCode: 200,
            message: "Bike returned successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllRent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const accessToken = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
        const result = yield rental_service_1.rentalService.getAllRent(accessToken);
        const statusCode = 200;
        const message = "Rentals retrieved successfully";
        return res.json((0, noDataFound_1.default)(result, statusCode, message));
    }
    catch (error) {
        next(error);
    }
});
exports.rentalController = {
    createRental,
    returnBike,
    getAllRent
};

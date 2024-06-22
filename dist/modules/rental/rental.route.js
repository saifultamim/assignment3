"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rental_controller_1 = require("./rental.controller");
const rental_validation_1 = __importDefault(require("./rental.validation"));
const bike_route_1 = require("../bike/bike.route");
const rentalRoute = express_1.default.Router();
const zodrentValidation = (zodValidation) => {
    return (req, res, next) => {
        try {
            const validData = zodValidation.parse(req.body);
            req.body = validData;
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
rentalRoute.post('/', zodrentValidation(rental_validation_1.default), rental_controller_1.rentalController.createRental);
rentalRoute.put('/:id/return', bike_route_1.auth, zodrentValidation(rental_validation_1.default), rental_controller_1.rentalController.returnBike);
rentalRoute.get('/', rental_controller_1.rentalController.getAllRent);
exports.default = rentalRoute;

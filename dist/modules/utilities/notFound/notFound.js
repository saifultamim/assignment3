"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    return res.json({
        success: false,
        statusCode: 404,
        message: "Not Found"
    });
};
exports.default = notFound;

"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
//import { Response } from "express"
Object.defineProperty(exports, "__esModule", { value: true });
const checkCollection = (param, statusCode, message) => {
    if (param.length > 0) {
        return {
            success: true,
            statusCode: statusCode,
            message: message,
            data: param
        };
    }
    else {
        return {
            success: false,
            message: "No Data Found",
            data: param
        };
    }
};
exports.default = checkCollection;

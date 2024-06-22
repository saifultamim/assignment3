"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodValidation = (zodValidation) => {
    return (req, res, next) => {
        try {
            const data = req.body;
            const validData = zodValidation.parse(data);
            req.body = validData;
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = zodValidation;

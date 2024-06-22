"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandaler = (err, req, res, next) => {
    let message = err.message || 'something went wrong';
    let errorSources = [
        {
            path: '',
            message: 'Error message'
        }
    ];
    const mongooseHandleError = (err) => {
        message = 'Validation Error';
        errorSources = Object.values(err.errors).map((val) => {
            return {
                path: val === null || val === void 0 ? void 0 : val.path,
                message: val.message
            };
        });
        return {
            message,
            errorSources
        };
    };
    const castHandleError = (err) => {
        message = ' Cast Error';
        errorSources = [
            {
                path: err.path,
                message: err.message
            }
        ];
        return {
            message,
            errorSources
        };
    };
    if (err.name === 'ValidationError') {
        const simplifyError = mongooseHandleError(err);
        message = simplifyError.message;
        errorSources = simplifyError.errorSources;
    }
    else if (err.name === 'CastError') {
        const simplifyError = castHandleError(err);
        message = simplifyError.message;
        errorSources = simplifyError.errorSources;
    }
    return res.json({
        success: false,
        message: message,
        errorSources: errorSources,
        stack: "error stack"
    });
};
exports.default = errorHandaler;

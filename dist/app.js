"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const bike_route_1 = __importDefault(require("./modules/bike/bike.route"));
const rental_route_1 = __importDefault(require("./modules/rental/rental.route"));
const error_1 = __importDefault(require("./modules/utilities/ErrrorHandaler/error"));
const notFound_1 = __importDefault(require("./modules/utilities/notFound/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', auth_route_1.default);
app.use('/api/users', user_route_1.default);
app.use('/api/bikes', bike_route_1.default);
app.use('/api/rentals', rental_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(error_1.default);
app.use(notFound_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
// configures dotenv to work in your application
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.get('/', function (request, response) {
    response.status(200).send('Hello World');
});
app
    .listen(PORT, function () {
    console.log('Server running at PORT: ', PORT);
})
    .on('error', function (error) {
    // gracefully handle error
    throw new Error(error.message);
});

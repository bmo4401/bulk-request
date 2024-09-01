"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const kysely_1 = require("../lib/kysely");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.use(express_1.default.json());
app.post('/api/update-records', async (req, res) => {
    const records = req.body;
    try {
        res.status(200).json({ message: 'Records updated successfully' });
    }
    catch (error) {
        console.error('Transaction failed:', error);
        res.status(500).json({ message: 'Failed to update records', error });
    }
});
app.get('/hello', async (req, res) => {
    const data = await kysely_1.db.selectFrom('user').execute();
    console.log('❄️ ~ res:', res);
    res.status(200).json(data);
});
app
    .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
})
    .on('error', (error) => {
    // gracefully handle error
    throw new Error(error.message);
});

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
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../services/auth"));
const ably_1 = __importDefault(require("../services/ably"));
const router = express_1.default.Router();
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = auth_1.default.generateFakeUser();
    const token = auth_1.default.generateToken(user.user_id);
    res.send({
        user,
        token,
    });
}));
router.post('/ably-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alby = req.body;
        auth_1.default.verifyToken(alby.auth_token);
        const user = auth_1.default.decodeToken(alby.auth_token);
        if (!user) {
            throw new Error('Invalid token');
        }
        const token = yield ably_1.default.requestToken(user.user_id);
        res.send({
            ably_token: token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}));
exports.default = router;

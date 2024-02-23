"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() { }
    static generateFakeUser() {
        return {
            user_id: (0, uuid_1.v4)(),
        };
    }
    static generateToken(userId) {
        return jsonwebtoken_1.default.sign({ user_id: userId }, process.env.JWT_SECRET || '', {
            expiresIn: '24h',
            jwtid: userId,
            issuer: 'dquark.network',
        });
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
    }
    static decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.default = AuthService;

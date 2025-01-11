"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("../controllers/users"));
var router = express_1.default.Router();
var userController = new users_1.default();
router.post('/login', userController.login);
exports.default = router;

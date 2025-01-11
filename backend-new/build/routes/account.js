"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var accounts_1 = __importDefault(require("../controllers/accounts"));
var router = express_1.default.Router();
var accountController = new accounts_1.default();
router.get('/create', accountController.getAccountDetails);
router.put('/:companyId', accountController.updateAccountDetails);
exports.default = router;

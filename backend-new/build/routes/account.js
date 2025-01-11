"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("../controllers/accounts"));
const router = express_1.default.Router();
const accountController = new accounts_1.default();
router.get('/:companyId', accountController.getAccountDetails);
router.put('/:companyId', accountController.updateAccountDetails);
exports.default = router;

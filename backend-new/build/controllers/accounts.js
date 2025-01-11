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
const account_1 = __importDefault(require("../models/account"));
class AccountController {
    constructor() {
        //  GET /:id (get account details)
        this.getAccountDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { companyId } = req.params;
            try {
                // Return the account information
                console.log(`Attempting to retrieve ${companyId}`);
                const account = yield account_1.default.findOne({ companyId });
                res.status(201).json({ data: account });
            }
            catch (error) {
                res.status(500).json({ message: `Failed to get account details for ${companyId}`, error: error });
            }
        });
        // PUT /update/:id (update account details)
        this.updateAccountDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { companyId } = req.params;
            try {
                const newData = req.body;
                console.log(`Updating account: ${companyId}`);
                const updatedAccount = yield account_1.default.findOneAndUpdate({ companyId }, newData);
                res.status(200).json({ data: updatedAccount });
            }
            catch (error) {
                res.status(500).json({ message: `Failed to update account details for ${companyId}`, error: error });
            }
        });
    }
}
exports.default = AccountController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var requests_1 = require("../controllers/requests");
var router = express_1.default.Router();
router.post('/create', requests_1.createRequest);
router.get('/:companyId', requests_1.getAllCompanyRequests);
router.get('/outstanding/:companyId', requests_1.getOutstandingRequests);
router.get('/incoming/:companyId', requests_1.getIncomingRequests);
// router.put('/incoming/update', editCompanyRequest)
// router.put('/edit/:requestId', editCompanyRequest)
// router.delete('/:requestId', deleteCompanyRequest)
exports.default = router;

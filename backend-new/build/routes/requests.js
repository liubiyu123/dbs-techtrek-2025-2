"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var requests_1 = __importDefault(require("../controllers/requests"));
var router = express_1.default.Router();
var requestController = new requests_1.default();
router.post('/create', requestController.createRequest);
router.get('/:companyId', requestController.getAllCompanyRequests);
router.get('/outstanding/:companyId', requestController.getOutstandingRequests);
router.get('/incoming/:companyId', requestController.getIncomingRequests);
router.put('/incoming/update', requestController.updateCompanyRequest);
//
// router.put('/edit/:requestId', requestController.editCompanyRequest)
//
// router.delete('/:requestId', requestController.deleteCompanyRequest)
exports.default = router;

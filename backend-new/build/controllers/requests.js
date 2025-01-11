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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = createRequest;
exports.getAllCompanyRequests = getAllCompanyRequests;
exports.getOutstandingRequests = getOutstandingRequests;
exports.getIncomingRequests = getIncomingRequests;
exports.editCompanyRequest = editCompanyRequest;
exports.deleteCompanyRequest = deleteCompanyRequest;
var OutstandingRequest_1 = __importDefault(require("../models/OutstandingRequest"));
//  POST /create (create into outstanding requests & requests received - 4) 
function createRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, companyId, requestorCompanyId, carbonUnitPrice, carbonQuantity, requestReason, requestStatus, requestType, newRequest, createdRequest, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log("Request body:", req.body);
                    _a = req.body, id = _a.id, companyId = _a.companyId, requestorCompanyId = _a.requestorCompanyId, carbonUnitPrice = _a.carbonUnitPrice, carbonQuantity = _a.carbonQuantity, requestReason = _a.requestReason, requestStatus = _a.requestStatus, requestType = _a.requestType;
                    newRequest = new OutstandingRequest_1.default({
                        id: id,
                        companyId: companyId,
                        requestorCompanyId: requestorCompanyId,
                        carbonUnitPrice: carbonUnitPrice,
                        carbonQuantity: carbonQuantity,
                        requestReason: requestReason,
                        requestStatus: requestStatus,
                        requestType: requestType,
                    });
                    return [4 /*yield*/, newRequest.save()];
                case 1:
                    createdRequest = _b.sent();
                    res.status(201).json({ message: 'Request created successfully', data: createdRequest });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error creating request:", error_1);
                    res.status(500).json({ message: 'Failed to create request', error: error_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// GET /:companyId (Get ALL for YOUR requests)
function getAllCompanyRequests(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var companyId, requests, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyId = req.params.companyId;
                    return [4 /*yield*/, OutstandingRequest_1.default.find({ companyId: companyId })];
                case 1:
                    requests = _a.sent();
                    res.status(200).json({ data: requests });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({ message: 'Failed to fetch requests', error: error_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// GET /outstanding/:companyId (Display outstanding of YOUR requests - 3)
function getOutstandingRequests(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var companyId, requests, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyId = req.params.companyId;
                    return [4 /*yield*/, OutstandingRequest_1.default.find({ companyId: companyId, status: 'outstanding' })];
                case 1:
                    requests = _a.sent();
                    res.status(200).json({ data: requests });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ message: 'Failed to fetch outstanding requests', error: error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// GET /incoming/:companyId (Display incoming of OTHER requests - 3)
function getIncomingRequests(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var requestorCompanyId, requests, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    requestorCompanyId = req.params.requestorCompanyId;
                    return [4 /*yield*/, OutstandingRequest_1.default.find({ requestorCompanyId: requestorCompanyId, type: 'incoming' })];
                case 1:
                    requests = _a.sent();
                    res.status(200).json({ data: requests });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(500).json({ message: 'Failed to fetch incoming requests', error: error_4 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// PUT /edit/:requestId (Edit user’s company request)
function editCompanyRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, updatedRequest, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, OutstandingRequest_1.default.findByIdAndUpdate(id, req.body, { new: true })];
                case 1:
                    updatedRequest = _a.sent();
                    if (!updatedRequest) {
                        return [2 /*return*/, res.status(404).json({ message: 'Request not found' })];
                    }
                    res.status(200).json({ message: 'Request updated successfully', data: updatedRequest });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(500).json({ message: 'Failed to update request', error: error_5 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// DELETE /company/:requestId (Delete user’s company request)
function deleteCompanyRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, deletedRequest, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, OutstandingRequest_1.default.findByIdAndDelete(id)];
                case 1:
                    deletedRequest = _a.sent();
                    if (!deletedRequest) {
                        return [2 /*return*/, res.status(404).json({ message: 'Request not found' })];
                    }
                    res.status(200).json({ message: 'Request deleted successfully' });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.status(500).json({ message: 'Failed to delete request', error: error_6 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// PUT /incoming/update (Accept/ Reject requests, DEFAULT: Pending)

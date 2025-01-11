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
const requests_1 = __importDefault(require("../models/requests"));
class RequestController {
    constructor() {
        //  POST /create (create into outstanding requests & requests received - 4) 
        this.createRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const request = new OutstandingRequest(req.body);
                // const savedRequest = await request.save();
                // res.status(201).json({ message: 'Request created successfully', data: savedRequest });
                res.status(201).json({ message: "test" });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to create request', error: error });
            }
        });
        // GET /:companyId (Get ALL for YOUR requests)
        this.getAllCompanyRequests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                const requests = yield requests_1.default.find({ companyId });
                res.status(200).json({ data: requests });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch requests', error: error });
            }
        });
        // GET /outstanding/:companyId (Display outstanding of YOUR requests - 3)
        this.getOutstandingRequests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                const requests = yield requests_1.default.find({ companyId, status: 'outstanding' });
                res.status(200).json({ data: requests });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch outstanding requests', error: error });
            }
        });
        // GET /incoming/:companyId (Display incoming of OTHER requests - 3)
        this.getIncomingRequests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { requestorCompanyId } = req.params;
                const requests = yield requests_1.default.find({ requestorCompanyId, type: 'incoming' });
                res.status(200).json({ data: requests });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch incoming requests', error: error });
            }
        });
        // PUT /edit/:requestId (Edit user’s company request)
        this.editCompanyRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedRequest = yield requests_1.default.findByIdAndUpdate(id, req.body, { new: true });
                if (!updatedRequest) {
                    return res.status(404).json({ message: 'Request not found' });
                }
                res.status(200).json({ message: 'Request updated successfully', data: updatedRequest });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to update request', error: error });
            }
        });
        // DELETE /company/:requestId (Delete user’s company request)
        this.deleteCompanyRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedRequest = yield requests_1.default.findByIdAndDelete(id);
                if (!deletedRequest) {
                    return res.status(404).json({ message: 'Request not found' });
                }
                res.status(200).json({ message: 'Request deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to delete request', error: error });
            }
        });
        // PUT /incoming/update (Accept/ Reject requests, DEFAULT: Pending)
    }
}
exports.default = RequestController;

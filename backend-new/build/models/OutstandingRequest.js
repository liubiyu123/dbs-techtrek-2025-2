"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var outstandingRequestSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    companyId: {
        type: String, // Changed from mongoose.Schema.Types.Number to String
        ref: "CompanyAccount",
        required: true,
    },
    requestorCompanyId: {
        type: String, // Changed from mongoose.Schema.Types.Number to String
        ref: "CompanyAccount",
        required: true,
    },
    carbonUnitPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    carbonQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
    requestReason: {
        type: String,
        required: false,
    },
    requestStatus: {
        type: String,
        required: true,
        maxlength: 50,
    },
    requestType: {
        type: String,
        required: true,
        maxlength: 50,
    },
    createdDatetime: {
        type: Date,
        default: Date.now,
    },
    updatedDatetime: {
        type: Date,
        default: Date.now,
        set: function () { return Date.now(); },
    },
});
// Create model
var OutstandingRequest = mongoose_1.default.model("OutstandingRequest", outstandingRequestSchema);
exports.default = OutstandingRequest;

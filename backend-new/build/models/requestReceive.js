"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var requestReceivedSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        auto: true,
    },
    requestId: {
        type: mongoose_1.default.Schema.Types.Number,
        ref: 'CompanyAccount',
        required: true,
    },
    alertDatatime: {
        type: Date,
        default: (Date.now() + 7)
    },
    alertText: {
        type: Number,
        required: true,
        default: 0,
    },
    alertStatus: {
        type: String,
        default: 0,
    },
    alertViewDate: {
        type: Date,
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
var requestReceived = mongoose_1.default.model('RequestReceived', requestReceivedSchema);
module.exports = requestReceived;

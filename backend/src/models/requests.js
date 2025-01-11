import mongoose, {Schema} from "mongoose";
import {Double} from "mongoose";
import type {RequestStatus} from "../enum";
import {RequestType} from "../enum";

export interface IRequests {
    id: Number
    companyId: Number
    requestorCompanyId: Number
    carbonUnitPrice: Double
    carbonQuantity: Double
    requestReason: String
    requestStatus: RequestStatus
    requestType: RequestType
    createdDateTime: Date,
    updatedDateTime: Date,
}

const RequestSchema: Schema = new Schema<IRequests>({
    id: Number,
    companyId: Number,
    requestorCompanyId: Number,
    carbonUnitPrice: Double,
    carbonQuantity: Double,
    requestReason: String,
    requestStatus: RequestStatus,
    requestType: RequestType,
    createdDateTime: Date,
    updatedDateTime: Date,
});

const RequestModel = mongoose.model<IRequests>(
  'RequestModel',
    RequestSchema,
);

export default RequestModel;

const mongoose = require('mongoose');

const outstandingRequestSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    auto: true,
  },
  companyId: {
    type: mongoose.Schema.Types.Number,
    ref: 'CompanyAccount',
    required: true,
  },
  requestorCompanyId: {
    type: mongoose.Schema.Types.Number,
    ref: 'CompanyAccount',
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
    set: () => Date.now(),
  },
});

const OutstandingRequest = mongoose.model('OutstandingRequest', outstandingRequestSchema);

module.exports = OutstandingRequest;

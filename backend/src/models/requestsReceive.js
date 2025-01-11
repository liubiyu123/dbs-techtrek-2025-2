import mongoose from "mongoose";

const requestReceivedSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    auto: true,
  },
  requestId: {
    type: mongoose.Schema.Types.Number,
    ref: 'CompanyAccount',
    required: true,
  },
  alertDatatime: {
    type: Date,
    default: setDate(Date.now() + 7)
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
    set: () => Date.now(),
  },
});

const requestReceived = mongoose.model('RequestReceived', requestReceivedSchema);

module.exports = requestReceived;
import mongoose, {Schema} from "mongoose";

export interface IAccount {
    companyId: Number
    companyName: String
    activeAccount: Number
}

const AccountSchema: Schema = new Schema<IAccount>({
    companyId: {type: Number, required: true},
    companyName: {type: String },
    activeAccount: {type: Number}
});

const AccountModel = mongoose.model<IAccount>(
  'AccountModel',
    AccountSchema,
);

export default AccountModel;

// src/models/User.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   companyName: { type: String, required: true },  // The company name you want to return
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

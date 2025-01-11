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

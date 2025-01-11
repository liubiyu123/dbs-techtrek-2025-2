import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // company_name: {
    //     type: String,
    //     required: true,
    // },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);
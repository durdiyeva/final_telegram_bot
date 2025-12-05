import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    chatId: {
      required: true,
      type: String,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
    balance: {
      type: Number,
      default: 4000,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
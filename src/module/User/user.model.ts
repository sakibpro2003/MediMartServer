import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "admin"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Non-Binary", "Other", "Prefer Not to Say"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", (doc, next) => {
  doc.password = " ";
  next();
});
userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email: email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TUser, UserModel>("User", userSchema);

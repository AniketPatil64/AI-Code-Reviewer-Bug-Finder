import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    provider: { type: String }, // google, github
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);

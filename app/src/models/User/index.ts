import { Schema, model, Document } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export const schema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    // match: /.+\@.+\..+/,
    unique: true,
  },
});

export const User = model<IUser & Document>("User", schema);

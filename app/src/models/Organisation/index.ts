import { Schema, model, Document, Types, ObjectId } from "mongoose";
import { IUser, schema as User } from "../User";

export interface ICohort {
  name: string;
  journeyId: string;
  userIds: ObjectId[];
}

export interface IOrganisation {
  name: string;
  users: IUser[];
  cohorts: ICohort[];
}

const Cohort = new Schema({
  name: String,
  journeyId: String,
  userIds: [
    {
      type: Types.ObjectId,
      ref: "Organisation.users",
    },
  ],
});

// const Programme = new Schema({
//   name: String,
//   cohorts: [Cohort],
// });

const schema = new Schema(
  {
    name: String,
    cohorts: [
      {
        type: Types.ObjectId,
        ref: Cohort,
      },
    ],
    users: [User],
  },
  { toJSON: { virtuals: true } }
);

schema.pre("save", function (next) {
  if ("invalid" == this.name) {
    return next(new Error("#sadpanda"));
  }
  next();
});

schema.virtual("userCount").get(function () {
  if (!this.users) return null;

  return this?.users.length;
});

export const Organisation = model<IOrganisation & Document>(
  "Organisation",
  schema
);

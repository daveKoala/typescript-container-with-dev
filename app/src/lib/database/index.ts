import mongoose from "mongoose";

export const mongooseStatus = (): string => {
  const status = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
    99: "uninitialized",
  };
  return status[mongoose.connection.readyState || 99];
};

interface myMongoError {
  [key: string]: string | number;
}

export const isMongoDBError = (error: unknown): boolean => {
  const mongoError = error as { name?: string; code?: string };

  if (mongoError?.name != "MongoServerError" || mongoError?.code != "E11000") {
    return false;
  } else {
    return true;
  }
};

export const isValidDocId = (id: string | null): boolean => {
  if (id == null) return false;

  return mongoose.Types.ObjectId.isValid(id);
};

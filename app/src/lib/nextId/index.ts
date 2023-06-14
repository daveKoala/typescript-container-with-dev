import { Document } from "mongoose";

const nextId = (collection: Document[], limit: number): null | string => {
  if (!collection || collection.length <= limit) {
    return null;
  } else {
    return collection[limit]._id || null;
  }
};

export default nextId;

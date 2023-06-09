import { app } from "./app";
import { cache } from "./lib/cache";
import mongoose from "mongoose";

(async () => {
  // const connectionString = `redis[s]://[[username][:password]@][host][:port][/db-number]`
  const connectionString = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
  await cache.connect(connectionString, `${process.env.REDIS_PASSWORD}`);

  if (process.env.MONGODB_URL) {
    await mongoose.connect(process.env.MONGODB_URL);
  }

  app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
    console.log(`Build ID: ${process.env.BUILD_ID}`);
  });
})();

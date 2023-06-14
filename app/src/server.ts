import * as appInsights from "applicationinsights";
import { app } from "./app";
import { cache } from "./lib/cache";
import mongoose from "mongoose";

appInsights.setup(process.env.APPLICATION_INSIGHT_CONNECTION_STRING);

// appInsights.defaultClient.config.samplingPercentage = parseInt(
//   process.env.APPLICATION_INSIGHT_SAMPLING_PERCENTAGE,
//   10
// );

// appInsights.defaultClient.context.tags[
//   appInsights.defaultClient.context.keys.cloudRole
// ] = process.env.APPLICATION_INSIGHT_CLOUD_ROLE;

appInsights.start();

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

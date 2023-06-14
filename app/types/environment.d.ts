export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPLICATION_INSIGHT_CLOUD_ROLE: string;
      APPLICATION_INSIGHT_CONNECTION_STRING: string;
      APPLICATION_INSIGHT_SAMPLING_PERCENTAGE: string;
      BUILD_ID: string;
      MONGODB_URL: string;
      NODE_ENV: string;
      PORT: number;
      REDIS_HOST: string;
      REDIS_PASSWORD: string;
      REDIS_PORT: string;
    }
  }
}

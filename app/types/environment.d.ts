export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        BUILD_ID: string
        NODE_ENV: string
        PORT: number
        REDIS_HOST: string
        REDIS_PORT: string
        REDIS_PASSWORD: string
        MONGODB_URL: string
    }
  }
}

import * as redis from 'redis';

interface Cache {
    redisClient: redis.RedisClientType | null;
    error: Error | null;
    connect: (cacheURL: string, cachePassword: string) => Promise<Cache>;
    ping: () => Promise<string>;
    write: () => Promise<Cache>;
    fetch: () => Promise<Cache>;
}

export const cache: Cache = {
    redisClient: null,
    error: null,

    async connect(cacheURL: string, cachePassword: string) {
        try {
            this.redisClient = redis.createClient({
                // rediss for TLS
                url: cacheURL,
                password: cachePassword
            })

            this.redisClient.on('error', (error) => console.error(error)).on('connect', () => console.log("Cache connected"));
            await this.redisClient?.connect()
        } catch (error) {
            if(error instanceof Error) {
                this.error = error;
            }
        } finally {
            return this;
        }
    },

    async ping() {
        const pingCommandResult = await this.redisClient?.ping();
        console.log('Ping command result: ', pingCommandResult);

        if (pingCommandResult != 'PONG') return 'Cache not connected'

        return `${pingCommandResult}: cache connected`;
    },

    async write() {
        return this;
    },

    async fetch() {
        return this;
    },
}
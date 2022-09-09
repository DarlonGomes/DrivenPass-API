export {};

declare global{
    namespace NodeJS {
        interface ProcessEnv{
            PORT: number;
            DATABASE_URL: string;
            SHADOW_DATABASE_URL: string;
            CRYPTR_SECRET: string;
            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
        }
    }
}
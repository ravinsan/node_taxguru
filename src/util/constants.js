process.loadEnvFile();

export const PORT = process.env.PORT || 8080;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.DB_NAME;
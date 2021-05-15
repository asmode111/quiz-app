import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Cannot find .env file");
}

export default {
    port: parseInt(process.env.PORT, 10),
    databaseURL: process.env.DATABASE_URL,
    api: {
      prefix: "/api",
    },
  };
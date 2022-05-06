import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
};

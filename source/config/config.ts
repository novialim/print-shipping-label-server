import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 1337;

const config = {
  server: {
    port: PORT,
  },
};

export default config;

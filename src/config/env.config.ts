/** Global imports */
import dotenv from "dotenv";

/** Local imports */
import { EnvType } from "../utils/types.utils";

dotenv.config();

export const ENV: EnvType = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,
};

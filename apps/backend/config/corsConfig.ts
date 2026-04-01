import { CorsOptions } from "cors";

export const getCorsConfig = (): CorsOptions => {
  return {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
};
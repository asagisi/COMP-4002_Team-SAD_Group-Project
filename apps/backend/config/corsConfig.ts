import { CorsOptions } from "cors";

export const getCorsConfig = (): CorsOptions => {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    return {
      origin: true,
      credentials: true,
    };
  }

  return {
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
};
import cors from "cors";
import { env } from "../config/env";

/**
 * CORS configuration.
 * Allows the configured origin (from env) and common HTTP methods/headers.
 */
export const corsMiddleware = cors({
  origin: env.CORS_ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours preflight cache
});

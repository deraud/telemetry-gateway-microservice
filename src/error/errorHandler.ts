import { logger } from "../utils/logger";

export interface ErrorContext {
  source: "http" | "mqtt" | "ws" | "db" | "event";
  meta?: any;
}

export function handleError(err: any, context: ErrorContext) {
  logger.error("Unhandled error", {
    source: context.source,
    error: err?.message ?? String(err),
    stack: err?.stack,
    meta: context.meta,
  });
}
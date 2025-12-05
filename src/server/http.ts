import express, { Request, Response } from 'express';

export function createHttpServer() {
  const app = express();

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}

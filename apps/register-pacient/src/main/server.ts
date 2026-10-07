import express from "express";
import type { Request, Response, NextFunction } from "express";
import { setupRegisterRoutes } from "./routes/setup-register-pacient-routes";

export const createApp = (): express.Application => {
  // ExpresasJS Router
  const app = express();

  // Gloal MIddlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware de logging de requisições 
  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // Config service routes
  const router = express.Router();
  setupRegisterRoutes(router);
  app.use("/api/register-pacient", router);

  // Route to check the service health
  app.get("/health", (req: Request, res: Response): void => {
    res.json({ status: "OK" });
  });

  // Handler to 404 error
  app.use((req: Request, res: Response): void => {
    res.status(404).json({
      error: "Rota não encontrada",
      path: req.path,
      method: req.method,
    });
  });

  // Global error treatment Middleware
  app.use(
    (
      err: Error | any,
      req: Request,
      res: Response,
      next: NextFunction,
    ): void => {
      console.error("[ERROR]", err);

      const isDevelopment = process.env.NODE_ENV !== "production";
      const response: Record<string, any> = {
        error: err.message || "Internal server error",
      };

      if (isDevelopment) {
        response.stack = err.stack;
      }

      res.status(500).json(response);
    },
  );

  return app;
};

export const startServer = async (port: number = 3000): Promise<void> => {
  const app = createApp();

  app.listen(port, () => {
    console.log(`🚀 Server rodando em http://localhost:${port}`);
  });
};

// Iniciar servidor se executado diretamente
if (import.meta.main) {
  const port = parseInt(process.env.PORT ?? "3000", 10);
  startServer(port).catch(console.error);
}

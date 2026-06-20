import express from "express";
import type { Request, Response, NextFunction } from "express";
import { setupRegisterRoutes } from "./routes/SetupRegisterRoutes";

/**
 * Cria e configura a aplicação Express
 * 
 * - Adiciona middlewares globais (json, cors, etc)
 * - Configura rotas
 * - Adiciona middleware de tratamento de erro
 * 
 */
export const createApp = (): express.Application => { // Retorna um servidor de Rotas ExpressJS
  const app = express();

  // Configurando Middlewares globais
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware de logging de requisições (opcional, mas recomendado)
  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // Configura rotas
  const router = express.Router();
  setupRegisterRoutes(router);
  app.use("/", router);

  // Rota para checar saude dos endpoints base
  app.get("/health", (req: Request, res: Response): void => {
    res.json({ status: "OK" });
  });

  // Manipulador para erro 404
  app.use((req: Request, res: Response): void => {
    res.status(404).json({
      error: "Rota não encontrada",
      path: req.path,
      method: req.method,
    });
  });

  // Middleware de tratamento de erro global
  app.use(
    (
      err: Error | any,
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      console.error("[ERROR]", err);

      // Não vaza stack trace em produção
      const isDevelopment = process.env.NODE_ENV !== "production";
      const response: Record<string, any> = {
        error: err.message || "Erro interno do servidor",
      };

      if (isDevelopment) {
        response.stack = err.stack;
      }

      res.status(500).json(response);
    }
  );

  return app;
};

/**
 * Inicia o servidor na porta especificada
 * @param port - Porta para escutar (padrão: 3000)
 */
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

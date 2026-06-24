import express from "express";
import { loginController } from "../controllers/LoginController";
import { logoutController } from "../controllers/LogoutController";
import { authMiddleware } from "../middlewares/authMiddleware";

const app = express();

// Porta lida da env — padrão 3001 para não conflitar com register (3000) e historico (3002)
const port = parseInt(process.env.PORT ?? "3001", 10);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth" });
});

app.post("/auth/login", loginController);
app.post("/auth/logout", authMiddleware, logoutController);

app.listen(port, () => {
  console.log(`Auth service rodando na porta ${port}`);
});
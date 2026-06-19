import express from "express";
import { loginController } from "../controllers/LoginController";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth" });
});

app.post("/auth/login", loginController);

app.listen(port, () => {
  console.log(`Auth service rodando na porta ${port}`);
});
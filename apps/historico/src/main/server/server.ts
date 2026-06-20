import "dotenv/config";
import express from "express";
import { PrismaConsultaRepository } from "../../infra/database/PrismaConsultaRepository";
import { RegistrarConsulta } from "../../application/usecases/RegistrarConsulta";
import { GetHistoricoPaciente } from "../../application/usecases/GetHistoricoPaciente";

const app = express();
app.use(express.json());

const consultaRepo       = new PrismaConsultaRepository();
const registrarConsulta  = new RegistrarConsulta(consultaRepo);
const getHistorico       = new GetHistoricoPaciente(consultaRepo);

// POST /consultas
app.post("/consultas", async (req, res) => {
  const body = req.body;
  
  let dataFormatada: string;
  
  // Se já está no formato DD/MM/YYYY, usa direto
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(body.dataConsulta)) {
    dataFormatada = body.dataConsulta;
  } else {
    // Tenta converter de ISO
    const date = new Date(body.dataConsulta);
    const dia  = String(date.getUTCDate()).padStart(2, "0");
    const mes  = String(date.getUTCMonth() + 1).padStart(2, "0");
    const ano  = date.getUTCFullYear();
    dataFormatada = `${dia}/${mes}/${ano}`;
  }

  const dados = { ...body, dataConsulta: dataFormatada };

  const result = await registrarConsulta.registrar(dados);
  if (result.isError()) {
    res.status(400).json({ errors: result.value });
    return;
  }
  res.status(201).json({ id: result.value.consultaId.value });
});

// GET /consultas/:pacienteId
app.get("/consultas/:pacienteId", async (req, res) => {
  const consultas = await getHistorico.execute(req.params.pacienteId);
  res.status(200).json(consultas.map((c) => ({
    id:             c.consultaId.value,
    pacienteId:     c.pacienteId,
    profissionalId: c.profissionalId,
    motivoConsulta: c.motivoConsulta.value,
    diagnostico:    c.diagnostico?.value,
    instituicao:    c.instituicao.value,
    dataConsulta:   c.dataConsulta.value,
    criadoEm:       c.criadoEm.value,
  })));
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`[historico] rodando na porta ${PORT}`);
});
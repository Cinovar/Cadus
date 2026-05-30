# Cadus — Documentação do Projeto

> Arquitetura de microsserviços com monorepo gerenciado por Bun workspaces.

---

## Índice

- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Monorepo](#estrutura-do-monorepo)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Testes](#testes)
- [Criando um Novo Serviço](#criando-um-novo-serviço)
- [Princípios de Arquitetura](#princípios-de-arquitetura)
- [Ferramentas de Apoio](#ferramentas-de-apoio)

---

## Stack Tecnológica

| Camada               | Tecnologia                  |
|----------------------|-----------------------------|
| Runtime              | Bun 1.x                     |
| Backend              | Express                     |
| Frontend             | React via Vite              |
| Testes unitários     | Vitest                      |
| Testes E2E           | Playwright                  |
| Linter / Formatter   | ESLint + Prettier           |
| Versionamento        | Git + GitHub                |
| Gestão do projeto    | Jira / GitHub Projects      |
| Diagramas            | Mermaid / draw.io           |
| Prototipagem         | Figma                       |
| Deploy               | Vercel / Render             |

---

## Estrutura do Monorepo

```
cadus/
├── apps/
│   ├── frontend/           # React + Vite + TypeScript
│   ├── identity/           # Serviço de identidade dos pacientes
│   └── e2e/                # Testes end-to-end com Playwright
├── package.json            # Dependências, scripts e declaração de workspaces
├── tsconfig.json           # Configuração TypeScript base (estendida por cada app)
└── vitest.config.ts        # Configuração raiz do Vitest
```

---

## Pré-requisitos

- **Bun** 1.0 ou superior

```bash
# Instalar o Bun
curl -fsSL https://bun.sh/install | bash

# Verificar versão
bun --version
```

> O Bun já inclui runtime, bundler, gerenciador de pacotes e executor de scripts — não é necessário instalar Node.js separadamente.

---

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-org/cadus.git
cd cadus

# Instalar todas as dependências do workspace
bun install
```

---

## Executando o Projeto

### Frontend

```bash
# Modo desenvolvimento com HMR
bun --filter @cadus/frontend dev

# Build de produção
bun --filter @cadus/frontend build

# Preview do build de produção
bun --filter @cadus/frontend preview
```

### Todos os serviços em paralelo

```bash
bun dev:all
```

### Um app específico

```bash
bun --filter @cadus/identity dev
```

---

## Testes

### Testes Unitários (Vitest)

Os testes unitários vivem **dentro de cada app**, junto do código que testam.

> **Por que Vitest e não Bun Test?** O Vitest oferece integração nativa com Vite (usada no frontend), suporte a múltiplos projetos no monorepo e cobertura via V8/Istanbul.

```bash
# Rodar todos os testes unitários do monorepo
bun test

# Rodar em modo watch (desenvolvimento)
bun test --watch

# Rodar com relatório de coverage
bun test --coverage

# Rodar testes de um app específico
bun --filter @cadus/frontend test
bun --filter @cadus/identity test
```

### Testes E2E (Playwright)

Os testes E2E vivem em `apps/e2e` e testam o sistema como um todo, atravessando frontend e backend.

```bash
# Rodar todos os testes E2E
bun --filter @cadus/e2e test

# Rodar com interface visual do Playwright
bun --filter @cadus/e2e test --ui

# Rodar em modo debug (browser visível)
bun --filter @cadus/e2e test --debug

# Rodar um arquivo específico
bun --filter @cadus/e2e test tests/login.spec.ts

# Rodar testes que correspondem a um padrão
bun --filter @cadus/e2e test --grep "deve fazer login"
```

### Rodar tudo

```bash
# Unitários + E2E em sequência
bun test:all
```

### Localização dos testes por responsabilidade

| Tipo de teste        | Localização                        | Ferramenta |
|----------------------|------------------------------------|------------|
| Unitário/componente  | `apps/<app>/src/**/*.test.ts(x)`   | Vitest     |
| E2E / fluxo completo | `apps/e2e/tests/**/*.spec.ts`      | Playwright |

---

## Criando um Novo Serviço

Siga este passo a passo para adicionar um novo microsserviço ao workspace.

### 1. Criar a estrutura de pastas

```bash
mkdir -p apps/meu-servico/src/{controllers,services,repositories,routes,middlewares}
cd apps/meu-servico
```

### 2. Criar o `package.json`

```json
{
  "name": "@cadus/meu-servico",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target bun",
    "start": "bun dist/index.js",
    "test": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/bun": "latest",
    "vitest": "^3.2.4"
  }
}
```

### 3. Criar o `tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### 4. Criar o `vitest.config.ts`

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

### 5. Criar o entry point

```ts
// src/index.ts
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3002;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "meu-servico" });
});

app.listen(PORT, () => {
  console.log(`meu-servico rodando na porta ${PORT}`);
});
```

### 6. Registrar no `tsconfig.json` da raiz

```json
{
  "references": [
    { "path": "apps/frontend" },
    { "path": "apps/identity" },
    { "path": "apps/meu-servico" }
  ]
}
```

### 7. Instalar as dependências

```bash
# na raiz do monorepo
bun install
```

> O glob `apps/*` no `workspaces` do `package.json` raiz já cobre o novo serviço automaticamente.

---

## Princípios de Arquitetura

Cada serviço deve seguir rigorosamente estes princípios. Eles não são sugestões — são as regras que mantêm o sistema sustentável à medida que cresce.

### Responsabilidade Única

Cada serviço resolve **um único problema de negócio**. Se um serviço começa a acumular responsabilidades não relacionadas, é sinal de que precisa ser dividido.

```
✅ auth-service   → autenticação, geração e validação de tokens
✅ orders-service → criação, consulta e cancelamento de pedidos
❌ auth-service   → autenticação + envio de e-mails + gestão de perfil
```

### Isolamento de Dados

Cada serviço é o **único dono do seu banco de dados**. Nenhum serviço acessa diretamente o banco de outro.

```
✅ orders-service consulta seu próprio banco de pedidos
✅ orders-service chama auth-service via HTTP para validar um token
❌ orders-service faz SELECT diretamente no banco do auth-service
```

### Comunicação via Interface

Serviços se comunicam **exclusivamente por APIs HTTP** (ou eventos). Nunca por imports diretos de código de outro serviço.

```
✅ fetch("http://auth-service/validate")
❌ import { validateToken } from "@cadus/auth-service/src/services/token"
```

### Estrutura interna de cada serviço

```
src/
├── index.ts            # entry point — só inicializa o servidor
├── routes/             # define as rotas e conecta controllers
├── controllers/        # recebe a requisição, delega para services, retorna resposta
├── services/           # lógica de negócio pura — sem Express, sem banco
├── repositories/       # acesso ao banco de dados — sem lógica de negócio
└── middlewares/        # autenticação, validação, tratamento de erros
```

A regra de dependência flui em uma única direção:

```
routes → controllers → services → repositories
```

Nunca o inverso. Um `repository` jamais chama um `service`, e um `service` jamais conhece o Express.

### Onde cada tipo de código deve viver

| Código                | Onde colocar       |
|-----------------------|--------------------|
| Lógica de negócio     | dentro do app dono |
| Chamadas ao banco     | `repositories/`    |
| Regras de negócio     | `services/`        |
| Entrada/saída HTTP    | `controllers/`     |

---

## Ferramentas de Apoio

### Diagramas
- **Mermaid** — diagramas versionados junto ao código em arquivos `.md`
- **draw.io** — diagramas de arquitetura mais elaborados

### Prototipagem
- **Figma** — design de interfaces e design system
- **Lovable** - criação de protótipos de alta fidelidade

### Gestão
- **Jira** ou **GitHub Projects** — rastreamento de tarefas e sprints

### Deploy
- **Vercel** — frontend (`apps/frontend`)
- **Render** — serviços backend (`apps/identity`, demais serviços)
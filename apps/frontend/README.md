# Cadus — Documentação do Projeto

> Arquitetura de microsserviços com monorepo gerenciado por pnpm workspaces.

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
| Runtime              | Node.js 20+                 |
| Backend              | Express                     |
| Frontend             | React via Vite              |
| Testes unitários     | Vitest                      |
| Testes E2E           | Playwright                  |
| Linter / Formatter   | ESLint + Prettier           |
| Versionamento        | Git + GitHub                |
| Gestão do projeto    | Jira / GitHub Projects      |
| Diagramas            | Mermaid / draw.io           |
| Prototipagem         | Figma / Excalidraw          |
| Deploy               | Vercel / Render             |

---

## Estrutura do Monorepo

```
cadus/
├── apps/
│   ├── frontend/           # React + Vite + TypeScript
│   └── e2e/                # Testes end-to-end com Playwright
├── packages/
│   ├── ui/                 # Biblioteca de componentes React compartilhados
│   └── config/             # Configurações base de TypeScript e ESLint
├── package.json            # Dependências e scripts da raiz
├── pnpm-workspace.yaml     # Declaração dos workspaces
└── vitest.config.ts        # Configuração raiz do Vitest
```

---

## Pré-requisitos

- **Node.js** 20 ou superior
- **pnpm** 9 ou superior

```bash
# Instalar o pnpm globalmente
npm install -g pnpm

# Verificar versões
node --version
pnpm --version
```

---

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-org/cadus.git
cd cadus

# Instalar todas as dependências do workspace
pnpm install
```

---

## Executando o Projeto

### Frontend

```bash
# Modo desenvolvimento com HMR
pnpm --filter @cadus/frontend dev

# Build de produção
pnpm --filter @cadus/frontend build

# Preview do build de produção
pnpm --filter @cadus/frontend preview
```

### Todos os serviços em paralelo

```bash
pnpm dev:all
```

### Um pacote específico

```bash
pnpm --filter @cadus/ui dev
```

---

## Testes

### Testes Unitários (Vitest)

Os testes unitários vivem **dentro de cada serviço ou pacote**, junto do código que testam.

```bash
# Rodar todos os testes unitários do monorepo
pnpm test

# Rodar em modo watch (desenvolvimento)
pnpm test --watch

# Rodar com relatório de coverage
pnpm test --coverage

# Rodar testes de um pacote específico
pnpm --filter @cadus/frontend test
pnpm --filter @cadus/ui test
```

### Testes E2E (Playwright)

Os testes E2E vivem em `apps/e2e` e testam o sistema como um todo, atravessando frontend e backend.

```bash
# Rodar todos os testes E2E
pnpm --filter @cadus/e2e test

# Rodar com interface visual do Playwright
pnpm --filter @cadus/e2e test --ui

# Rodar em modo debug (browser visível)
pnpm --filter @cadus/e2e test --debug

# Rodar um arquivo específico
pnpm --filter @cadus/e2e test tests/login.spec.ts

# Rodar testes que correspondem a um padrão
pnpm --filter @cadus/e2e test --grep "deve fazer login"
```

### Rodar tudo

```bash
# Unitários + E2E em sequência
pnpm test:all
```

### Localização dos testes por responsabilidade

| Tipo de teste       | Localização                              | Ferramenta  |
|---------------------|------------------------------------------|-------------|
| Unitário/componente | `apps/<serviço>/src/**/*.test.ts(x)`     | Vitest      |
| Unitário/pacote     | `packages/<pacote>/src/**/*.test.ts(x)`  | Vitest      |
| E2E / fluxo completo| `apps/e2e/tests/**/*.spec.ts`            | Playwright  |

---

## Criando um Novo Serviço

Siga este passo a passo para adicionar um novo microsserviço ao workspace respeitando todas as regras arquiteturais.

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
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "@cadus/config": "workspace:*",
    "@types/express": "^4.17.0",
    "@types/node": "^24.0.0",
    "tsx": "^4.0.0",
    "vitest": "^3.2.4"
  }
}
```

### 3. Criar o `tsconfig.json`

```json
{
  "extends": "@cadus/config/tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
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
    { "path": "apps/meu-servico" }
  ]
}
```

### 7. Registrar no `vitest.config.ts` da raiz

```ts
export default defineConfig({
  test: {
    projects: [
      "apps/*/vitest.config.ts",
      "packages/*/vitest.config.ts"
    ],
  },
});
```

O glob `apps/*/vitest.config.ts` já cobre o novo serviço automaticamente — este passo só é necessário se você usar a abordagem de projetos explícitos.

### 8. Instalar as dependências

```bash
# na raiz do monorepo
pnpm install
```

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
✅ import { formatDate } from "@cadus/shared"  — pacote utilitário, sem lógica de negócio
✅ fetch("http://auth-service/validate")       — chamada HTTP
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

| Código                              | Onde colocar                          |
|-------------------------------------|---------------------------------------|
| Tipos compartilhados entre serviços | `packages/shared` _(a implementar)_   |
| Componentes React reutilizáveis     | `packages/ui`                         |
| Configurações de TS/ESLint          | `packages/config`                     |
| Lógica de negócio                   | dentro do serviço dono                |
| Chamadas ao banco                   | `repositories/`                       |
| Regras de negócio                   | `services/`                           |
| Entrada/saída HTTP                  | `controllers/`                        |

---

## Ferramentas de Apoio

### Diagramas
- **Mermaid** — diagramas versionados junto ao código em arquivos `.md`
- **draw.io** — diagramas de arquitetura mais elaborados

### Prototipagem
- **Figma** — design de interfaces e design system
- **Excalidraw** — esboços rápidos e wireframes

### Gestão
- **Jira** ou **GitHub Projects** — rastreamento de tarefas e sprints

### Deploy
- **Vercel** — frontend (`apps/frontend`)
- **Render** — serviços backend (`apps/*-service`, `apps/api-gateway`) _(a implementar)_

---

## Colaboradores

<table> 
    <tr>
        <td align="center">
          <a href="https://github.com/Clarinhaaa">
            <img src="https://avatars.githubusercontent.com/u/100969119?v=4" width="100px;" alt="Imagem do Colaborador 5"/><br>
            <sub><b>Ana Clara Calvacante</b></sub>
          </a>
        </td>
        <td align="center">
          <a href="https://github.com/ama9-cin-ufpe">
            <img src="https://avatars.githubusercontent.com/u/249635822?v=4" width="100px;" alt="Imagem do Colaborador 5"/><br>
            <sub><b>Alex Mayrinck</b></sub>
          </a>
        </td>
        <td align="center">
          <a href="https://github.com/bernardobelfort">
            <img src="https://avatars.githubusercontent.com/u/153245112?v=4" width="100px;" alt="Imagem do Colaborador 1"/><br>
            <sub><b>Bernardo Belfort Leao</b></sub>
          </a>
        </td>
        <td align="center">
          <a href="https://github.com/edisiouchoacn-spec">
            <img src="https://avatars.githubusercontent.com/u/235191061?v=4" width="100px;" alt="Imagem do Colaborador 2"/><br>
            <sub><b>Edísio Uchoa Cavalcanti Neto</b></sub>
          </a>
        </td>
        <td align="center">
          <a href="https://github.com/FranciscoFaustino17">
            <img src="https://avatars.githubusercontent.com/u/209528271?v=4" width="100px;" alt="Imagem do Colaborador 3"/><br>
            <sub><b>Francisco Faustino de Souza Neto</b></sub>
          </a>
        </td>
        <td align="center">
          <a href="https://github.com/GabrielCassio">
            <img src="https://avatars.githubusercontent.com/u/91679814?v=4" width="100px;" alt="Imagem do Colaborador 4"/><br>
            <sub><b>Gabriel Cássio Gomes Cileiro</b></sub>
          </a>
        </td>
        <td align="center">
          <a href="https://github.com/orgs/Cinovar/people/rafaelsamico">
            <img src="https://avatars.githubusercontent.com/u/207333347?v=4" width="100px;" alt="Imagem do Colaborador 5"/><br>
            <sub><b>Rafael Samico</b></sub>
          </a>
        </td>
        <td align="center">
          <a href="https://github.com/VictorLemosFr">
            <img src="https://avatars.githubusercontent.com/u/107511134?v=4" width="100px;" alt="Imagem do Colaborador 5"/><br>
            <sub><b>Victor Lemos de Freitas</b></sub>
          </a>
        </td>
      </tr>
</table>

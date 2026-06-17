# Cadus — Documentação do Projeto


## 📌 Índice

- [📌 Índice](#-índice)
- [✨ Features & Capacidades](#features--capacidades)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [🏗️ Estrutura do Monorepo](#️-estrutura-do-monorepo)
- [🎯 Princípios de Arquitetura](#-princípios-de-arquitetura)
- [⚙️ Pré-requisitos & Instalação](#️-pré-requisitos--instalação)
- [🚀 Executando o Projeto](#-executando-o-projeto)
- [🧪 Suíte de Testes](#-suíte-de-testes)
- [➕ Criando um Novo Serviço](#-criando-um-novo-serviço)
- [🧰 Ferramentas de Apoio](#-ferramentas-de-apoio)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## ✨ Features & Capacidades

O Cadus é uma plataforma distribuída projetada para alta performance e isolamento de contextos.

- 🔍 Gestão de Identidade: Módulo isolado para gerenciamento, autenticação e ciclo de vida de pacientes.
- ⚡ Runtime Ultra-rápido: Execução nativa sobre Bun, eliminando gargalos de inicialização e gerenciamento de pacotes.
- 🛡️ Clean Architecture Strict: Camada de domínio 100% agnóstica a frameworks, garantindo testabilidade e proteção contra acoplamento técnico.
- 🔄 Monorepo Inteligente: Workspaces gerenciados de forma centralizada com compartilhamento eficiente de configurações de tipagem e linters.
- 🌐 Suíte de Testes Híbrida: Testes unitários isolados por microsserviço combinados com uma esteira end-to-end automatizada.

## 🛠️ Stack Tecnológica
| Camada | Tecnologia | Papel no Ecossistema | 
| ------ | ---------- | -------------------- |
| Runtime & Package Manager | Bun 1.x | Motor de execução, bundler e gerenciador de workspaces rápido. | 
| Backend Framework | Express | Roteamento e interface HTTP nos microsserviços (app/). | 
| Frontend Framework | React + Vite | Interface de usuário SPA de alta performance com HMR. | 
| Testes Unitários | Vitest | Validação ágil de Use Cases e Entities. | 
| Testes E2E | Playwright| Validação de fluxos integrados e jornadas de usuário. | 
| Qualidade de Código | ESLint + Prettier | Padronização estática e formatação automatizada. |
| Deploy & InfraVercel / RenderHospedagem | otimizada para o Frontend e Serviços de borda. |

## 🏗️ Estrutura do Monorepo

```Plaintext
cadus/
├── apps/
│   ├── frontend/           # SPA React + Vite + TypeScript
│   ├── identity/           # Microsserviço de identidade dos pacientes (Clean Arch)
│   └── e2e/                # Suíte de testes end-to-end com Playwright
├── package.json            # Dependências globais, scripts maestros e workspaces
├── tsconfig.json           # Configuração TypeScript base (estendida pelos apps)
└── vitest.config.ts        # Configuração raiz e pooling do Vitest
```

## 🎯 Princípios de Arquitetura

Cada microsserviço dentro do ecossistema do Cadus deve seguir rigorosamente as regras abaixo para garantir manutenibilidade e isolamento.
1. Macro-Arquitetura (Microsserviços)
- **Responsabilidade Única:** Cada serviço resolve um único domínio de negócio. Se um contexto acumula regras não relacionadas, ele deve ser fatiado.
- **Isolamento de Dados:** Cada serviço é proprietário exclusivo de sua camada de persistência. Acesso direto ao banco de dados alheio é proibido. Comunicações acontecem via API HTTP/gRPC ou Eventos.
2. Micro-Arquitetura (Estrutura Interna do Serviço)
- A estrutura interna adota o padrão Clean Architecture, onde o núcleo de negócios (Domínio) dita as regras e os detalhes técnicos (Frameworks, Banco de Dados) adaptam-se a ele.

```Plaintext
src/
├── index.ts               # Entry point — responsável apenas por inicializar o servidor
├── app/                   # Interface HTTP (Routes, Controllers, Middlewares Express)
├── usecases/              # Lógica de aplicação (Orquestradores de fluxo de negócio)
├── domain/                # Núcleo da aplicação (Independente de tecnologia externa)
│   ├── entities/          # Regras e validações intrínsecas de negócio
│   └── repositories/      # Interfaces/Contratos dos repositórios (Ports)
├── infra/                 # Detalhes técnicos (Implementação de Repositórios, DB, Drivers)
└── shared/                # Erros customizados, DTOs globais e utilitários
```
3. Regra de Dependência & Inversão (DIP)
As dependências fluem exclusivamente de fora para dentro. O Domínio nunca conhece o Banco de Dados ou o Express.


```Plaintext
app (Express) ──> usecases ──> domain (Entities / Interfaces) <── infra (Implementações/DB)
```

Onde cada tipo de código deve viver:

| Código | Onde colocar | Responsabilidade |
| ------ | ------------ | ---------------- |
| Entrada/Saída HTTP | app/ | Receber requisições do Express, delegar para usecases e formatar respostas. | 
| Lógica de Orquestração |  usecases/ |  Validar fluxos de ações da aplicação (ex: RegisterPatientUseCase). | 
| Regras de Negócio Puras | domain/entities/ | Modelos ricos com validações que não dependem do contexto de software. | 
|  Contratos e Portas | domain/repositories/ | Interfaces abstratas que descrevem a comunicação com o exterior. | 
| Chamadas ao Banco/Drivers | infra/ | Implementação real de queries SQL, ORMs, integrações com APIs terceiras.|

## ⚙️ Pré-requisitos & Instalação
### Pré-requisitos
O projeto utiliza o Bun como runtime e gerenciador de pacotes integrado, dispensando a necessidade de uma instalação isolada do Node.js.

```Bash
# Instalação do Bun Runtime
curl -fsSL https://bun.sh/install | bash

# Verificação do ambiente
bun --version
```
### Instalação do Monorepo
```Bash
# Clonagem do repositório oficial
git clone https://github.com/seu-org/cadus.git
cd cadus

# Instalação otimizada de todas as dependências do workspace
bun install

```
## Variáveis de Ambiente

Cada serviço pode exigir variáveis de ambiente específicas. Crie um arquivo `.env` na raiz do serviço baseando-se no `.env.example` correspondente.

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do serviço | `3000` |
| `NODE_ENV` | Ambiente de execução | `development` |

## 🚀 Executando o Projeto
O Bun Workspaces permite orquestrar comandos centralizados a partir da raiz usando filtros. 
### Desenvolver todos os serviços simultaneamente
```Bash
bun dev:all
```
### Executar um aplicativo ou serviço específico
```Bash
# Executar o Frontend React
bun --filter @cadus/frontend dev

# Executar o serviço Identity
bun --filter @cadus/identity dev
```
### Compilar para Produção (Build)
```Bash
# Build do Frontend
bun --filter @cadus/frontend build

# Build do Microsserviço (Gera um bundle otimizado para o runtime Bun)
bun --filter @cadus/identity build
```
## 🧪 Suíte de Testes
A arquitetura desacoplada permite uma estratégia de testes altamente eficiente dividida em duas frentes.

| Tipo de Teste | Escopo | Localização | Ferramenta |
| ------------- | ------ | ----------- | ---------- |
| Unitário / Integração | Use Cases, Entities e Adapters | apps/<app>/src/**/*.test.ts(x) | Vitest |
| End-to-End (E2E) | Fluxos interconectados | Frontend ↔ APIapps/e2e/tests/**/*.spec.ts | Playwright | 

### Executando Testes Unitários (Vitest) 
```Bash
# Executar toda a suíte unitária do monorepo
bun test

# Executar em modo interativo (Watch Mode)
bun test --watch

# Gerar relatório de cobertura de código (Coverage)
bun test --coverage

# Filtrar testes de um serviço específico
bun --filter @cadus/seu-servico test
```

### Executando Testes End-to-End (Playwright)
```Bash
# Executar testes E2E em modo headless
bun --filter @cadus/e2e test

# Abrir a interface visual interativa do Playwright
bun --filter @cadus/e2e test --ui
```

## ➕ Criando um Novo Serviço
Siga este passo a passo padronizado para expandir o ecossistema mantendo a conformidade com a Clean Architecture.
1. Inicializar a Infraestrutura de Pastas
```Bash
mkdir -p apps/meu-servico/src/{app,usecases,domain/{entities,repositories},infra,shared}
cd apps/meu-servico
```
2. Configurar o package.json do Serviço
Crie o arquivo apps/meu-servico/package.json:

```JSON
{
  "name": "@cadus/meu-servico",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target bun",
    "start": "bun dist/index.js",
    "test": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.19.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/bun": "latest",
    "vitest": "^3.2.4",
    "typescript": "^5.0.0"
  }
}
```

3. Configurar o vitest.config.ts Local

```TypeScript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```
4. Criar o Servidor Base (src/index.ts)
```TypeScript
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3002;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "meu-servico", architecture: "clean" });
});

app.listen(PORT, () => {
  console.log(`🚀 @cadus/meu-servico ativo na porta ${PORT}`);
});
```

5. Registrar a referência no tsconfig.json raiz  
Adicione o caminho do novo serviço na seção references:
```JSON
{
  "references": [
    { "path": "apps/frontend" },
    { "path": "apps/identity" },
    { "path": "apps/meu-servico" }
  ]
}
```
Por fim, execute bun install na raiz para sincronizar os workspaces.

## 🧰 Ferramentas de Apoio
- Diagramas & Modelagem: Mermaid para diagramas de sequência evolutivos dentro do repositório Markdown e draw.io para plantas arquiteturais.
- Modelagem de Dados: DrawSQl para estruturar as enitdades do sistema.
- Design & UI Prototypes: Figma para design system e Lovable para prototipação ágil de componentes de alta fidelidade.
- Governança & Agilidade: Jira / GitHub Projects para acompanhamento de Sprints e mapeamento de débitos técnicos.

## 🤝 Contribuição
Faça o Fork do repositório.Crie sua branch de feature: `git checkout -b feature/MinhaFeature.`  
Valide o alinhamento arquitetural antes do commit: `bun test` e `bun lint`.  
Envie o Pull Request para a branch main.

## 📄 Licença
Este projeto está sob a licenca Apache 2.0. Veja o arquivo `LICENSE`para mais detalhes.

Powered by **Cadus** | Desenvolvido com foco em Engenharia de Software de Impacto
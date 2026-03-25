

## Redesign Completo do Cadastro — Estilo Ticko Premium

### Problemas atuais
- Header do cadastro é o mesmo da landing page (Voltar/cadus./contador) — parece continuação, não uma experiência dedicada
- Footer da landing aparece no cadastro — desnecessário
- Nome e CPF juntos na mesma tela — devem ser separados
- Cards sem ícone centralizado no topo — visual genérico
- Textos e campos alinhados à esquerda sem centralização — não tem a elegância do Ticko
- Sistema não trata o paciente pelo nome após digitar

### Nova experiência de cadastro

**1. Layout da página de cadastro (Registration.tsx)**
- Remover Footer da landing page
- Header minimalista: apenas "Voltar" à esquerda, logo "cadus." centralizado, "X/Y" à direita
- Fundo com gradiente sutil teal (como Ticko) em vez de `bg-background` plano
- Progress bar mais fina e elegante, sem labels (apenas barrinhas)

**2. Novo step: StepPatientName (só o nome)**
- Ícone `UserRound` centralizado no topo em círculo teal suave (como Ticko)
- Título: "Como você se chama?"
- Subtítulo: "Queremos saber como te chamar."
- Um único campo: nome completo, centralizado, input grande e clean
- Botão "Continuar" full-width estilo Ticko (gradiente teal, arredondado)

**3. Função de formatação do nome**
- `formatName("joao neto frederico")` → `"Joao Neto Frederico"` (capitalize first letter of each word)
- Aplicar ao salvar e ao exibir
- Extrair primeiro nome: `nome.split(' ')[0]`

**4. Novo step: StepPatientCPF (só CPF)**
- Ícone `ShieldCheck` centralizado no topo
- Título: "Olá, {primeiroNome}!" (usando o nome formatado)
- Subtítulo: "Agora precisamos do seu CPF para sua segurança."
- Um único campo: CPF com máscara, centralizado
- Mensagem de confiança: "Seus dados estão protegidos" com ícone shield pequeno
- Botão "Continuar" full-width

**5. Redesign visual de TODOS os steps do paciente**
Cada step seguirá o padrão Ticko:
- Ícone grande centralizado no topo (em círculo com fundo accent)
- Título centralizado, bold, `text-2xl`
- Subtítulo centralizado, `text-muted-foreground`
- Campos com estilo mais limpo (bordas sutis, sem label pesado, placeholders claros)
- Botão "Continuar →" full-width no final
- Botão "Voltar" mais discreto (apenas texto com seta, sem borda)

**6. Novo fluxo de steps (paciente): 9 etapas**

| # | Componente | Ícone | Título |
|---|---|---|---|
| 1 | StepProfile | — | Como você vai usar o Cadus? |
| 2 | StepPatientName | UserRound | Como você se chama? |
| 3 | StepPatientCPF | ShieldCheck | Olá, {nome}! |
| 4 | StepPatientAbout | Heart | Um pouco mais sobre você |
| 5 | StepPatientContact | Phone | Como falar com você? |
| 6 | StepPatientAddress | MapPin | Onde você mora? |
| 7 | StepPatientSus | FileHeart | Informações do SUS |
| 8 | StepPatientComplaint | MessageCircle | Por que você busca atendimento? |
| 9 | StepPatientAccess | Lock | Crie seu acesso |

**7. Card styling (todas as telas)**
- Card centralizado com `text-center` para ícone, título e subtítulo
- Campos alinhados à esquerda dentro do card (natural para inputs)
- Card com `rounded-3xl` e sombra premium
- Padding mais generoso (`p-8 md:p-10`)

### Arquivos a editar/criar
- **Criar** `src/components/registration/StepPatientName.tsx` — apenas nome
- **Criar** `src/components/registration/StepPatientCPF.tsx` — apenas CPF, com saudação pelo nome
- **Remover** `StepPatientIdentity.tsx` (substituído pelos dois novos)
- **Editar** `src/pages/Registration.tsx` — novo layout, fundo gradiente, remover Footer, atualizar steps 2→9
- **Editar** todos os steps existentes — adicionar ícone centralizado no topo, centralizar título/subtítulo, botão Voltar discreto
- **Adicionar** `formatName()` em `src/lib/masks.ts`
- **Editar** `src/index.css` — adicionar fundo gradiente sutil para a página de cadastro

### Detalhes técnicos

Função `formatName`:
```ts
export const formatName = (name: string): string =>
  name.replace(/\b\w/g, c => c.toUpperCase()).replace(/\B\w/g, c => c.toLowerCase());
```

Extração do primeiro nome nos steps:
```ts
const firstName = (patientData.nome || '').split(' ')[0];
```

Background do cadastro: gradiente radial sutil tipo Ticko (branco no centro, teal/cinza muito claro nas bordas).




## Redesign da Seção "Como funciona?"

### Mudanças

**1. Título → "Como funciona?" (com interrogação)**

**2. Layout horizontal tipo timeline/trajeto**

Em vez do layout vertical simples com linha fina, criar uma **timeline horizontal** no desktop (vertical no mobile) com uma linha curva/pontilhada conectando os 3 passos — como uma trajetória real:

```text
Desktop:
  ┌──────┐       ┌──────┐       ┌──────┐
  │  01  │ ───── │  02  │ ───── │  03  │
  │ icon │  dot  │ icon │  dot  │ icon │
  └──────┘  line └──────┘  line └──────┘
   título         título         título
   descrição      descrição      descrição
```

- 3 colunas no desktop (`grid md:grid-cols-3`), stack vertical no mobile
- Cada step: círculo grande com ícone (gradiente teal sutil) + número sobreposto translúcido no fundo
- **Linha conectora**: SVG horizontal com tracejado animado entre os steps (dash-offset animation) — a linha "desenha" conforme o scroll entra na viewport
- No mobile: linha vertical pontilhada entre os cards

**3. Cards elevados para cada step**

Em vez de texto solto, cada step vive dentro de um card com:
- Fundo branco, `rounded-2xl`, sombra suave
- Círculo do ícone com gradiente `from-primary to-[#14919B]` e glow sutil
- Número grande (`text-6xl`) em opacidade baixa (5%) atrás do card como watermark
- Hover: card sobe levemente (`hover:-translate-y-1`) com sombra mais forte

**4. Animações**

- Cada card entra com `fadeUp` staggered (já existe)
- A linha conectora SVG anima com `pathLength` do framer-motion (desenha de 0→1 ao entrar na viewport)
- Ícones dos steps pulsam sutilmente no hover

### Textos (mantidos)
- Passo 01: "Escolha seu perfil" — mesma descrição
- Passo 02: "Preencha seus dados" — mesma descrição  
- Passo 03: "Tudo pronto" — mesma descrição

### Arquivo a editar
- `src/pages/Index.tsx` — reescrever seção "Como funciona" (linhas 145-207)




## Redesign Premium do Cadus — De Generico para Referencia

### Diagnostico

O design atual sofre de:
- Layout flat e previsivel (hero texto-esquerda + imagem-direita = template padrao)
- Cores esmaecidas sem contraste dramatico — o verde-mata e a terracota ficaram "mudos" demais
- Cards simples demais — sem hierarquia visual, sem profundidade
- Tipografia sem variacao de escala — tudo parece do mesmo tamanho
- Ausencia de elementos graficos que criem identidade (patterns, shapes, gradientes sutis)
- Footer e CTA final generico — blocos chapados sem sofisticacao

### Nova Direcao: "Teal Institucional Premium"

A paleta migra para tons de azul-esverdeado (teal) com profundidade e contraste real, mantendo universalidade e acessibilidade:

```text
┌──────────────────────────────────────────────────────┐
│  NOVA PALETA "CADUS PREMIUM"                         │
│                                                       │
│  Primaria:      #0D5C63  (teal profundo)             │
│  → Confianca, institucional, saude sem cliche.        │
│    Mais saturado e presente que o verde-mata anterior │
│                                                       │
│  Primaria hover: #094B51  (teal escuro)              │
│                                                       │
│  Secundaria:    #14919B  (teal vibrante)             │
│  → Tom mais claro para acentos, links, badges.       │
│    Cria profundidade dentro da mesma familia          │
│                                                       │
│  Acento quente:  #E8985A (amber/laranja suave)       │
│  → Contraste complementar. Para CTAs secundarios,     │
│    badges, highlights. Da calor humano ao teal.       │
│                                                       │
│  Fundo:         #F7F8F9  (cinza-gelo levissimo)      │
│  → Mais neutro e premium que off-white amarelado      │
│                                                       │
│  Card surface:  #FFFFFF                               │
│  → Sombra: 0 1px 3px rgba(0,0,0,0.04),               │
│           0 6px 24px rgba(0,0,0,0.06)                │
│  → Sombra dupla = profundidade premium real           │
│                                                       │
│  Texto:         #111827  (quase-preto, neutro)       │
│  Texto sec.:    #6B7280  (cinza medio)               │
│  Bordas:        #E5E7EB  (cinza claro)               │
│                                                       │
│  Erro:          #DC2626  (vermelho claro/contraste)  │
│  Sucesso:       #0D5C63  (= primaria)                │
│                                                       │
│  Gradiente hero: from #0D5C63 to #14919B             │
│  → Usado no hero de forma dramatica e elegante        │
└──────────────────────────────────────────────────────┘
```

### Nova Tipografia

- **Titulos: Plus Jakarta Sans** — geometrica premium, muito usada em produtos top-tier (Linear, Vercel). Pesos 600/700/800
- **Corpo: Inter** — mantido, otimo para legibilidade
- Ambas Google Fonts, performaticas

### Transformacoes Visuais Concretas

**1. Landing Page — Hero reimaginado**
- Hero com fundo gradiente teal (#0D5C63 → #14919B) ocupando toda a largura
- Texto branco sobre gradiente com titulo em escala grande (text-4xl md:text-6xl)
- Pattern sutil de circulos/ondas em opacidade baixa no fundo do hero (CSS puro com radial-gradient)
- Ilustracao mantida mas com fundo transparente sobre o gradiente
- Botoes CTA: "Sou Paciente" branco solido, "Sou Profissional" outline branco
- Badge acima do titulo: "Clinicas-escola UFPE/NUTES" em chip com borda branca/30%
- Estatisticas sutis abaixo: "100% gratuito · Cadastro em 5 min · Dados seguros"

**2. Secao "Como funciona" — Cards com icones premium**
- Fundo branco, cards com sombra dupla premium
- Numeracao grande e estilizada (01, 02, 03) em teal claro como elemento decorativo
- Icones dentro de quadrados arredondados com fundo teal/10%
- Linha conectora sutil entre os cards (desktop)

**3. Secao "Para quem" — Layout assimetrico**
- Card paciente com borda-left grossa em teal + icone grande
- Card profissional com borda-left em amber + icone grande
- Fundo levemente diferenciado para cada card

**4. CTA Final — Mais dramatico**
- Fundo gradiente teal escuro com pattern sutil
- Titulo grande branco
- Botao branco solido com texto teal — hover com sombra

**5. Navbar — Mais refinada**
- Logo "cadus" com ponto em amber (#E8985A) — diferenciador visual
- Botoes mais refinados: "Entrar" ghost, "Cadastrar" teal solido com border-radius pill

**6. Formulario de Cadastro — Mais sofisticado**
- Barra de progresso segmentada (steps individuais com labels, nao barra continua)
- Cards de formulario com sombra premium
- Inputs com borda mais sutil, foco com ring teal
- Botoes de selecao (sexo, tipo) com design mais refinado — borda + fundo suave no hover
- Step de escolha paciente/profissional: cards maiores com ilustracao/icone mais expressivo

**7. Dashboards — Layout profissional**
- Sidebar com fundo levemente tinted
- Cards de dados com header colorido sutil
- Tabela de pacientes com hover row refinado
- Badges de status com cores semanticas

**8. Elementos de identidade unica**
- Dot amber no logo como marca registrada
- Pattern decorativo sutil (circulos concentricos em opacidade 3-5%) usado no hero e CTA
- Transicoes mais suaves (0.2s ease)
- Focus states com ring teal 2px offset

### Arquivos a editar

1. **`index.html`** — Google Fonts → Plus Jakarta Sans + Inter
2. **`src/index.css`** — CSS variables completas, sombras premium, utility classes refinadas
3. **`tailwind.config.ts`** — Fonts, cores, sombras, keyframes
4. **`src/pages/Index.tsx`** — Hero com gradiente, cards premium, CTA dramatico, badge institucional, pattern decorativo
5. **`src/components/Navbar.tsx`** — Logo com ponto amber, botoes pill
6. **`src/components/Footer.tsx`** — Tons neutros refinados
7. **`src/pages/Registration.tsx`** — Progress bar segmentada, layout mais respirado
8. **`src/components/registration/StepProfile.tsx`** — Cards de selecao premium
9. **`src/components/registration/StepPatientPersonal.tsx`** — Inputs refinados
10. **`src/components/registration/StepPatientAddress.tsx`** — Layout refinado
11. **`src/components/registration/StepPatientComplaint.tsx`** — Textarea premium
12. **`src/components/registration/StepPatientAccess.tsx`** — Password UI refinada
13. **`src/components/registration/StepProfPersonal.tsx`** — Inputs refinados
14. **`src/components/registration/StepProfClinic.tsx`** — Select refinado
15. **`src/components/registration/StepProfAccess.tsx`** — Password UI refinada
16. **`src/components/registration/SuccessScreen.tsx`** — Animacao de sucesso mais elegante
17. **`src/pages/PatientDashboard.tsx`** — Layout premium com cards refinados
18. **`src/pages/ProfessionalDashboard.tsx`** — Sidebar e tabela profissional

### Resultado

O Cadus vai parecer um produto de design premiado — nao um template, nao um prototipo de IA. O teal profundo com amber como acento quente cria uma combinacao distinta e memoravel. A tipografia Plus Jakarta Sans eleva imediatamente o patamar. Os patterns decorativos e a hierarquia visual dramatica (hero com gradiente full-width) dao a impressao de um produto pensado por designers, nao gerado por maquina.


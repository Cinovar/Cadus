

## Redesign do Footer

### Mudanças em `src/components/Footer.tsx`

**Layout em 3 colunas no desktop (stack no mobile):**

```text
┌──────────────────────────────────────────────────────────────┐
│  cadus.                     │  Links Úteis        │  Institucional      │
│  Seu cadastro. Sua saúde.   │  Política de Privac. │  Termos de Uso     │
│  Simples assim.             │  Ajuda e Suporte     │  Fale Conosco      │
│                             │                      │                    │
│  Desenvolvido pelo CIn UFPE │  ─────────────────────────────────────── │
│                             │  + Adicionar uma nova Clínica (destaque) │
└──────────────────────────────────────────────────────────────────────────┘
```

**1. Coluna esquerda — Marca**
- Logo "cadus." + slogan abaixo
- Abaixo do slogan: `Desenvolvido pelo CIn — UFPE` em texto `text-xs text-muted-foreground` (usar travessão em vez de hífen, sem símbolo extra para manter limpo e elegante)

**2. Coluna central — Links Úteis**
- Título "Links Úteis" em `font-display font-700 text-sm`
- Política de Privacidade, Termos de Uso, Ajuda e Suporte

**3. Link destaque — "Adicionar nova Clínica"**
- Link com cor `text-secondary` (amber) e hover `text-secondary/80`
- Ícone pequeno `Plus` ou `Building2` do lucide ao lado
- Posicionado na coluna da direita ou como item separado destacado
- Cor diferente dos demais links para chamar atenção

**4. Estilo geral**
- `grid md:grid-cols-3 gap-8` para simetria perfeita
- Padding mais generoso (`py-12`)
- Separador sutil no topo (`border-t border-border`)
- Tudo alinhado à esquerda no desktop, centralizado no mobile

### Arquivo a editar
- `src/components/Footer.tsx`


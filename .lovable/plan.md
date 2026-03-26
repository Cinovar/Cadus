

## Substituir "Contato" por "Para Clínicas" no Footer

### Mudança
Remover a coluna "Contato" (linhas 50-63) com email e localização, e substituir por uma coluna "Para Clínicas" com:
- **Adicionar nova Clínica** — link com ícone `Plus` em verde (já importado)
- **Fale com as Clínicas** — mover este link da coluna "Clínicas" para cá, ou manter duplicado

### Estrutura da nova coluna
```
Para Clínicas
├── Adicionar nova Clínica (ícone Plus, cor primary, destaque visual)
└── Área da Clínica
```

O link "Adicionar nova Clínica" terá destaque visual com ícone `Plus` em `text-primary` para chamar atenção como CTA.

Grid passa de 4 colunas para 3 no desktop (`md:grid-cols-3`) já que fica mais equilibrado, ou mantém 4 se preferir. Manterei 4 colunas para simetria.

### Arquivo editado
- `src/components/Footer.tsx` — remover imports `Mail`, `MapPin`, substituir coluna Contato por "Para Clínicas"




## Reorganizar Footer

### Mudanças em `src/components/Footer.tsx`

**1. Remover "Fale Conosco" e "Ajuda e Suporte"**

**2. Reorganizar colunas — nova divisão:**

- **Coluna 1 — Marca** (igual, sem mudanças)
- **Coluna 2 — Informações** (antigo "Links Úteis" + "Institucional" unificados)
  - Política de Privacidade
  - Termos de Uso
  - Clínicas Parceiras (link para futura página com info de contato das clínicas)
- **Coluna 3 — Para Clínicas**
  - Link destacado "Adicionar nova Clínica" com cor `text-primary` (teal verde principal) em vez de `text-secondary` (amber)
  - Ícone `Plus` (mais adequado que `Building2` para ação de adicionar)

**3. Títulos das colunas:**
- "Informações" em vez de "Links Úteis"
- "Para Clínicas" em vez de "Institucional"

### Arquivo a editar
- `src/components/Footer.tsx`


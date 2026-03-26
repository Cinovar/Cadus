

## Problema

Na versao mobile a landing page tem 3 problemas principais:

1. **Hierarquia tipografica quebrada** — os subtitulos (`.section-subtitle`) usam `text-sm` (14px) enquanto os titulos (`.section-title`) usam `text-xl` (20px), mas visualmente a diferenca e pequena e os subtitulos parecem maiores que deveriam
2. **Falta de simetria** — no mobile o conteudo fica centralizado em algumas partes e desalinhado em outras
3. **Footer desproporcionalmente grande** — gaps enormes entre colunas, tudo centralizado no meio em vez de alinhado a esquerda, ocupando espaco demais

## Plano

### 1. Corrigir hierarquia tipografica no mobile (`src/index.css`)

- `.section-title`: aumentar mobile de `text-xl` para `text-2xl` (24px) para garantir que o titulo seja visivelmente maior
- `.section-subtitle`: reduzir mobile de `text-sm` para `text-xs` (12px) para criar contraste claro com o titulo

### 2. Footer compacto e alinhado a esquerda no mobile (`src/components/Footer.tsx`)

- Mudar de `items-center text-center` para `items-start text-left` no mobile
- Reduzir gap entre colunas de `gap-8` para `gap-5`
- Reduzir padding vertical de `pt-8 pb-6` para `pt-5 pb-4`
- Barra inferior: reduzir de `py-4` para `py-3`, alinhar a esquerda no mobile
- Todos os titulos de coluna e links alinhados a esquerda no mobile
- Manter desktop inalterado

### 3. Melhorar simetria da pagina no mobile (`src/pages/Index.tsx`)

- Seção "Como funciona": reduzir padding mobile de `py-14` para `py-10`
- Seção CTA: reduzir padding mobile de `py-16` para `py-12`
- Garantir alinhamento consistente em todas as secoes

### Detalhes tecnicos

**Arquivos editados:**
- `src/index.css` — `.section-title` e `.section-subtitle`
- `src/components/Footer.tsx` — layout mobile compacto e alinhado a esquerda
- `src/pages/Index.tsx` — paddings mobile ajustados

**Nenhuma mudanca no desktop** — todas as alteracoes sao condicionadas ao breakpoint mobile (< md).


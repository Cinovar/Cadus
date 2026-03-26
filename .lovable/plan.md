

## Corrigir linha conectora do passo a passo

A linha horizontal tracejada que conecta os 3 passos está se estendendo além do ícone do passo 03. O problema está no `right` do style inline (linha 122).

### Mudança
- **`src/pages/Index.tsx`** (linha 122): Alterar `right: 'calc(16.66% + 4px)'` para `right: 'calc(33.33% + 4px)'` — isso faz a linha terminar no início do ícone do 3º passo (centro da 3ª coluna) em vez de ir até o final dele.

Ajuste fino: como o grid tem 3 colunas iguais (33.33% cada), o centro da 3ª coluna fica em ~83.33%. A linha começa no centro da 1ª coluna (~16.66%) e deve terminar no início do ícone da 3ª coluna. Usar `right: 'calc(33.33% - 48px)'` para parar exatamente na borda esquerda do ícone do passo 03.


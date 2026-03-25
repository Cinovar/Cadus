

## Trocar "Criar Cadastro" por link de contatos das clínicas

### Mudança em `src/components/Footer.tsx`

Na Coluna 3 (Navegação), linha 45-47:
- Remover o link "Criar Cadastro" (`/cadastro`)
- Substituir por um link "Contatos das Clínicas" apontando para futura página (`/clinicas` ou `#` por enquanto)
- Esse link ficará junto com "Clínicas Parceiras" na mesma coluna, que faz sentido contextual

Opcionalmente, renomear a coluna de "Navegação" para algo como "Clínicas" já que ambos os links são sobre clínicas, mantendo a simetria com as outras colunas.

### Arquivo a editar
- `src/components/Footer.tsx` — linhas 38-48


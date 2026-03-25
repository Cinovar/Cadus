

## Ilustracao Premium Estilo Startup para o Hero do Cadus

### Referencia

As imagens enviadas mostram o padrao: **personagens flat design com estilo proprio** — proporcoes estilizadas, paleta reduzida, poses dinamicas, personalidade visual forte. Tipo iFood, Nubank, Rappi — ilustracoes que voce reconhece a marca so pelo estilo.

### Abordagem

Criar a ilustracao via **AI image generation** (Nano banana pro) no estilo flat illustration com a paleta teal + amber do Cadus. A cena vai representar o conceito central: **pessoas diversas (paciente idoso, mae com crianca, profissional, estudante) conectadas digitalmente** — todas em volta de um smartphone/tablet estilizado.

O estilo sera: flat design com proporcoes levemente exageradas (cabecas maiores, corpos simplificados), sem contorno preto, cores solidas, fundo transparente/limpo. Inspirado nas referencias mas com identidade propria usando a paleta teal (#0D5C63), amber (#E8985A), e tons complementares.

### Execucao

1. **Gerar a ilustracao** usando AI image generation com prompt detalhado descrevendo:
   - Estilo flat/vetorial moderno tipo startup brasileira
   - Personagens diversos: idoso com celular, mae com crianca, profissional com jaleco, estudante com mochila
   - Elemento central: smartphone grande com formulario simplificado e checkmark
   - Paleta: teal profundo, amber, branco, cinzas suaves
   - Fundo transparente/neutro
   - Proporcoes estilizadas, sem contorno, cores chapadas

2. **Salvar como asset** em `src/assets/hero-illustration.png`

3. **Atualizar `src/pages/Index.tsx`**:
   - Remover o componente `HeroGraphic` SVG atual (linhas 16-64)
   - Importar a nova ilustracao como modulo ES6
   - Renderizar com `<img>` dentro do mesmo container com animacao framer-motion
   - Manter o layout hero existente (texto esquerda, ilustracao direita)

### Arquivo a editar

- `src/pages/Index.tsx` — substituir HeroGraphic por imagem gerada


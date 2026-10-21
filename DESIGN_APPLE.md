# Revisão de UX — perspectiva `apple-design`

Escopo: leitura de `index.html`, `styles.css`, `main.js` e referências anexadas pelo usuário em 20/10/2026. Parecer para o integrador; nenhum código alterado.

## Decisões prioritárias

1. **Navegação previsível em todas as rotas.** Manter o cabeçalho e o rodapé da home nas sete páginas de serviço e no blog. O logotipo deve voltar para `index.html`, não para `#topo` de uma página interna. Dar acesso direto a **Serviços**, **Treinamentos**, **Blog** e **Contato** em desktop e no menu móvel. Uma lista de serviços no menu pode abrir dentro da página ou levar a uma página índice; não obrigar o visitante a descobrir serviços por abas da home.
2. **Hero de vídeo com texto estável.** `object-fit: cover`, poster do próprio vídeo e gradiente de contraste preservam a hierarquia atual. O movimento do filme já carrega a expressão visual; a entrada do título e dos botões não precisa competir com ele. Garantir que ação principal e descrição permaneçam no primeiro viewport em 320–390 px e com zoom de texto.
3. **Páginas de serviço escaneáveis.** No primeiro viewport: trilha curta `Início / Serviços / Nome`, H1 com nome exato, resumo específico e CTA “Solicitar avaliação”. Depois: o que a Avante oferece, como atua segundo a fonte oficial, foto real apropriada, dúvidas frequentes verificáveis, serviços relacionados e contato. A página de AVCB/CLCB precisa preservar distinções e etapas técnicas da fonte, sem prometer aprovação ou prazo garantido.
4. **Blog nativo com orientação clara.** Índice em cartões sem texto truncado, título, resumo, imagem da publicação quando verificável e data apenas quando conhecida. Artigo com largura de leitura moderada, subtítulos, links locais para serviços correlatos e retorno ao índice. O CTA comercial deve vir após o conteúdo útil, sem interromper cada parágrafo.
5. **Parceiros como o usuário pediu.** Fundo vermelho Avante, título branco, personagem à esquerda e duas fileiras de cartões brancos com logotipos verdadeiros. Movimento uniforme por `transform`; sem salto na emenda. Pausar em hover/foco e oferecer pausa explícita ou rolagem manual no toque. Em movimento reduzido, mostrar todos os cartões em uma lista estática ou rolável. Duplicatas técnicas devem ter `aria-hidden="true"`.

## Ajustes precisos no site atual

- `index.html:29–33` expõe só âncoras da home; adicionar uma entrada nativa para o blog e preservar serviços nas páginas internas. `index.html:44–48` tem o mesmo problema no menu móvel.
- `index.html:84,109,113,117,121,137,166,203` ainda envia o usuário ao domínio antigo. Trocar por slugs locais e nomes de ação específicos (“Ver terceirização”, “Explorar treinamentos”). Links sociais e WhatsApp continuam externos por sua função.
- `styles.css:15–24` oferece feedback visual de hover e foco. Incluir estado `:active` imediato nos botões/cartões e garantir que o overlay móvel apareça e desapareça no mesmo eixo. O menu deve permitir rolagem quando a altura útil for curta; o conjunto de links pode ultrapassar telas pequenas em paisagem.
- `main.js:9–14` devolve sempre o foco ao botão quando o menu fecha. Ao seguir uma âncora, o foco pode ser movido para o título da seção ou deixado no link navegável; a devolução ao botão é adequada ao fechamento por Escape. Conservar a armadilha de foco incluindo o telefone do rodapé do overlay.
- `styles.css:39` usa texto do painel de serviços de 14 px. Para leitura institucional em telas móveis, considerar 16 px e linha mais folgada. O corpo de artigos deve ficar entre 16 e 18 px, com comprimento de linha próximo de 60–70 caracteres.
- `index.html:141–142` é hoje uma faixa cinza com quatro nomes. Substituí-la pela seção vermelha da referência, com todos os parceiros confirmados e logotipos locais.

## Sensação de interação

- Ação instantânea em toque: `:active` discreto em CTA e cartão. Evitar atrasos artificiais ou travar cliques durante transições.
- A animação de entrada `data-reveal` já é suficiente fora dos dois movimentos contínuos obrigatórios. Não acrescentar parallax ao vídeo nem efeito de profundidade ao carrossel.
- Abas de serviço: preservar troca imediata, teclado com setas e foco visível. A foto pode usar uma entrada curta sem deslocar o layout. Cada aba deve mostrar link para página interna correspondente.
- Formulário: indicar claramente que abrirá o WhatsApp após o envio, como a home já faz; manter a informação junto ao botão. Campos com foco e erros legíveis.
- Em superfície escura ou vermelha, ajustar o contorno de foco para contraste local; o `outline` global vermelho pode perder visibilidade sobre o fundo vermelho de parceiros.

## Critérios de aceite visual/funcional

- Cada rota abre diretamente e mantém navegação, identidade e retorno à home; nenhum link interno de serviço/blog sai para o domínio antigo.
- A navegação móvel cabe em 320 × 568 e em paisagem; teclado chega a todos os itens, Escape fecha o menu e restaura foco.
- Hero mantém título, CTA e rostos/ações legíveis em 320, 375, 768 e 1440 px; texto continua legível com zoom de 200%.
- Carrossel mostra cada parceiro oficial, não interrompe leitura e permite inspeção. Com `prefers-reduced-motion`, todos permanecem acessíveis sem movimento forçado.
- Foto tratada ou ampliada entra somente após comparação com o original: rostos, uniformes, emblemas e textos devem permanecer fiéis.

## Relação da skill com o pedido

A skill recomenda contenção em movimentos contínuos, mas o usuário exige vídeo permanente e carrossel automático. A execução deve atender esses elementos, com controle de leitura e alternativas para pessoas sensíveis a movimento. Os princípios aproveitados aqui são resposta imediata, consistência espacial, tipografia legível, agência e navegação previsível.

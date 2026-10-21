# Revisão UX/UI — Avante

## Estado da revisão

Revisei a estrutura, folhas de estilo, conteúdo gerado e breakpoints do projeto. A confirmação visual em navegador ficou indisponível: a política do navegador bloqueou a leitura da aba `file://`, então não usei outro caminho para contornar esse bloqueio. A validação visual final ainda depende de abrir/atualizar a página no navegador do usuário.

## Correções aplicadas

- O MP4 do hero fica visível sem depender de um evento `playing`; a imagem de fallback e o `poster` foram removidos a pedido do usuário. O arquivo é H.264, tem vídeo sem faixa de áudio e segue em loop/mudo/inline.
- A grade de sete serviços distribui as três últimas células por toda a linha em desktop; em tablet, o último link ocupa a largura restante; em celular, a lista vira coluna única.
- O carrossel aparece logo após a apresentação da Avante. Removi os PNGs de baixa resolução recortados porque a revisão mostrou halos e trechos apagados; os 50 parceiros permanecem em wordmarks tipográficos sem fundo e alta nitidez, com duplicatas decorativas fora da árvore acessível.
- O blog tem uma matéria em destaque, cartões com respiro maior, quebra para uma coluna até 900 px e aberturas de artigo sem o resumo repetido duas vezes.
- As entradas acionadas durante a rolagem têm atraso escalonado discreto e respeitam `prefers-reduced-motion`.

## Escopo estático de responsividade

Os breakpoints em 1100, 900, 800, 700, 600 e 360 px cobrem navegação, colunas, hero, blog, parceiros e rodapé. `npm run check` verifica as rotas, referências locais, grade de sete serviços, ordem/camada do vídeo, tema e suporte a movimento reduzido. Capturas e inspeção de alinhamento real em 320, 375, 768, 1024 e 1440 px ainda não puderam ser feitas nesta sessão.

## Parecer

Os problemas concretos apontados nas capturas foram tratados no código. Não atribuo nota final “10/10” sem o exame renderizado nos cinco viewports, especialmente por causa da confirmação do enquadramento do vídeo e das quebras tipográficas no browser real.

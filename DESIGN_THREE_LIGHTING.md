# Parecer: threejs-lighting na landing Avante

**Decisão:** não adicionar luzes Three.js ao site. A skill trata iluminação de objetos em uma cena 3D (`AmbientLight`, `DirectionalLight`, sombras e mapas de ambiente). O hero solicitado usa um vídeo real já gravado; luzes WebGL não iluminam pessoas, uniformes ou equipamento dentro de seus fotogramas. Para que uma luz 3D apareça seria preciso criar objetos sintéticos sobre a operação real, com risco de distração e de confundir a fidelidade das imagens.

## Evidência do projeto

- O hero ocupa a primeira dobra, com título e CTA à esquerda e gradiente escuro para legibilidade. O vídeo local informado pelo usuário tem cerca de 8 MB e ficará em loop permanente.
- O carrossel de parceiros precisa de cartões e logotipos reais. Nenhum requisito do site depende de geometria 3D, sombras dinâmicas ou ambiente HDR.
- `PERFORMANCE_REVIEW.md` identifica vídeo, poster, CSS e páginas nativas como caminho crítico de carregamento. Um renderizador WebGL adicionaria contexto gráfico, shader, memória de textura e trabalho por quadro sem resolver uma necessidade da página.

## Direção visual aplicável

1. Manter o gradiente CSS do hero para contraste estável sobre cenas claras e escuras do vídeo. Regular sua opacidade após inspecionar fotogramas reais em desktop e mobile.
2. Se houver tratamento do vídeo ou de fotografias oficiais, ajustar exposição, contraste e balanço de cor de forma fotográfica, preservando identidade dos profissionais e características da operação. Isso é edição da mídia, não iluminação 3D.
3. Usar sombras CSS discretas apenas onde ajudem a separar cartões e CTAs. No carrossel vermelho, os cartões brancos já fornecem contraste suficiente; sombras animadas são dispensáveis.

## Critério para reconsiderar

Reabrir Three.js somente se surgir uma peça 3D concreta, por exemplo um simulador interativo de rotas ou equipamento, com objetivo de usuário definido, protótipo navegável por teclado, versão estática, respeito a `prefers-reduced-motion` e medição de custo gráfico. Nesse caso, começar com luz ambiente/hemisférica e no máximo uma direcional sem sombras; a própria skill alerta que luzes, sombras e mapas grandes elevam o custo de renderização.

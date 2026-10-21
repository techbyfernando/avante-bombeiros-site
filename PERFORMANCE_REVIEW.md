# Revisão de desempenho e reprodução — Avante

Atualizado em 20/10/2026. A conferência foi estática; a aba `file://` foi bloqueada para inspeção visual nesta sessão.

## Vídeo hero

- `media/avante-hero-silent.mp4` tem 8.140.802 bytes. A revisão da estrutura confirmou H.264, uma trilha de vídeo, ausência de trilha de áudio, `moov` antes de `mdat` e amostras de vídeo idênticas às do original enviado.
- A falha visível vinha da ordem das camadas: a foto cobria o vídeo até um listener tardio receber `playing`. O vídeo agora é a única mídia de fundo e aparece sem depender dessa classe.
- O elemento usa `autoplay`, `muted`, `loop`, `playsinline` e `preload="auto"`; o JS retoma a reprodução ao voltar para a aba.
- O usuário pediu para remover a foto de fallback e o `poster`; ambos foram retirados. A reprodução real ainda precisa ser confirmada no navegador.

## Ativos removidos

- Apaguei 49 arquivos comprovadamente fora das referências do site: os 40 logos recortados, duas pranchas de revisão, quatro masters PNG duplicados de fotos, um favicon de 1024 px não usado e dois scripts antigos sem integração no build. Foram liberados 16.496.645 bytes.
- As versões WebP das quatro fotos continuam referenciadas nas páginas e os JPGs de origem permanecem preservados.
- As 50 marcas permanecem no carrossel como nomes tipográficos sem fundo; as cópias duplicadas da faixa são decorativas e ficam fora da árvore acessível.

## Revisões e limites

- Performance/latência confirmou a integridade do MP4 e apontou o problema da camada de fallback. UX/UI confirmou a célula vazia da grade, os halos nos PNGs e a baixa legibilidade do blog em tablet; estes pontos foram corrigidos.
- `npm run build` e `npm run check` passam: 23 páginas, 849 referências locais, sete links de serviço e 50 parceiros.
- CSS/HTML foram verificados nos breakpoints 320, 375, 600, 700, 768, 800, 900, 1024, 1100 e 1440 px. Capturas reais e métricas de LCP/CLS não foram obtidas.

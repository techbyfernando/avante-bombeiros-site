# Parecer de animação — GSAP

## Referência consultada

Revisei a documentação oficial [GSAP](https://gsap.com/docs) e a página do [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). As partes adequadas a esta interface são entradas suaves acionadas quando as seções chegam à tela, sequências com atraso curto entre itens e adaptação a diferentes larguras e à preferência por movimento reduzido. A documentação descreve o uso de gatilhos de viewport, o recálculo em redimensionamentos e `matchMedia()` para configurações responsivas.

## O que foi aplicado

- A página usa `IntersectionObserver` para revelar cada conteúdo quando ele entra na tela, com disparo único e deslocamento curto.
- Elementos irmãos recebem pequenos atrasos escalonados, dando ritmo aos blocos sem animar continuamente o scroll.
- O movimento segue `prefers-reduced-motion`; com a preferência ativa, os conteúdos ficam visíveis sem deslocamento ou atraso.
- O carrossel de parceiros continua em movimento automático, sem controle de pausa manual, conforme solicitado anteriormente.

## Decisão de implementação

O projeto é HTML, CSS e JavaScript local, sem dependências instaladas e com política de conteúdo restritiva. O efeito de entrada já é atendido pelo navegador com baixo custo, então não acrescentei uma cópia remota de GSAP que falharia no modo offline/arquivo local e exigiria ampliar essa política. Não usei pinning, smooth scrolling ou scrub: esses efeitos prenderiam partes da página ou alterariam a rolagem natural sem melhorar o caminho de contato.

Se o site migrar para um build com dependências locais e surgir uma sequência mais complexa, `ScrollTrigger` é a opção GSAP recomendada para os reveals; `matchMedia()` deve adaptar a configuração ao viewport e ao movimento reduzido.

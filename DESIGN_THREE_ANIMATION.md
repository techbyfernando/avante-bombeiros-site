# Parecer — `threejs-animation`

**Decisão:** não adicionar animação 3D ao site nesta entrega.

Li a skill `C:\Users\FernandodePaulaRodri\.codex\skills\threejs-animation\SKILL.md` e examinei o projeto estático. Ela cobre `AnimationClip`, `AnimationMixer`, animação procedural e um loop `requestAnimationFrame` para objetos 3D. O pedido atual exige vídeo real da Avante no hero e um carrossel 2D de logos oficiais. Nenhum componente requer geometria, rig, GLTF, câmera ou iluminação animada.

## Motivos ligados ao produto

- O vídeo fornecido já comunica pessoas e operação reais; um objeto 3D competiria pela atenção na primeira dobra sem acrescentar informação verificável.
- O carrossel pode animar `transform` em CSS, com pausa e conteúdo estático para `prefers-reduced-motion`, sem renderizador WebGL ou loop JavaScript por quadro.
- A página atual não depende de framework. Introduzir Three.js acrescentaria download, inicialização de GPU e mais uma superfície de falha em dispositivos móveis, junto ao MP4 de cerca de 8,14 MB.
- Na narrativa de segurança institucional, a prioridade é legibilidade do CTA, confiança nas fotos reais e acesso às páginas de serviço. Um 3D decorativo não tem benefício de conversão demonstrado.

## Critérios para reconsiderar

Uma futura peça 3D só faria sentido se representasse uma tarefa concreta, por exemplo um simulador interativo de rota de evacuação, com conteúdo tecnicamente validado pela Avante. Nessa hipótese, criar protótipo isolado e medir primeiro carregamento, CPU/GPU, interação por teclado e uma alternativa 2D. A própria skill recomenda suspender mixers fora da tela, compartilhar clips e limitar animações ativas.

**Aceite para esta etapa:** nenhum pacote Three.js, canvas ou loop `requestAnimationFrame` adicional; hero em vídeo e carrossel acessível continuam as únicas mídias em movimento permanente.

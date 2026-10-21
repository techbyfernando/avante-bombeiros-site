# Parecer de interação 3D — Avante

Papel: `threejs-interaction`. Skill lida em `C:\Users\FernandodePaulaRodri\.codex\skills\threejs-interaction\SKILL.md`. Revisão em 20/10/2026; nenhuma alteração de implementação.

## Decisão

Não adicionar cena Three.js nesta etapa. A skill trata de seleção por raycasting, controles de câmera e manipulação de objetos 3D. O site da Avante apresenta serviços reais, vídeo operacional, páginas informativas e uma faixa de parceiros. Nenhuma tarefa do visitante exige explorar um objeto em três dimensões. Um canvas 3D criaria outra camada de input e foco sem benefício demonstrável para solicitar avaliação, consultar serviços ou ler o blog.

## Interações que importam aqui

1. **Hero:** vídeo real em loop com texto e CTA em HTML. O CTA deve ser um link nativo, sempre alcançável por teclado e sem depender de WebGL.
2. **Serviços:** as abas existentes já usam botões HTML, papéis ARIA e setas do teclado. As páginas novas devem manter links diretos aos seus URLs, de modo que cada serviço funcione sem um gesto complexo.
3. **Parceiros:** animação bidimensional com `transform`, botão nativo de pausar/retomar, pausa ao receber foco ou hover e lista estática sob `prefers-reduced-motion`. Os logos devem ter texto alternativo verificável.
4. **Mobile:** menu e carrossel não devem capturar gestos de rolagem da página. Não usar `preventDefault` em toques para uma interação que não precisa de canvas.

## Critério para reconsiderar

Só justificar Three.js se a Avante pedir uma ferramenta funcional específica, por exemplo, um modelo interativo de edificação que mostre rotas de fuga ou equipamentos em um treinamento. Nesse caso, prototipar com objetivo verificável, controles equivalentes em HTML/teclado, alternativa sem WebGL, suporte a toque, tamanho de download e desempenho medidos em celular. A cena não deve substituir conteúdo nem links de conversão.

## Aceite da presente implementação

- Todo serviço e artigo abre por URL nativa e por link acessível por teclado.
- O carrossel inicia automaticamente e oferece pausa/retomada; sua informação permanece disponível quando a animação é desativada.
- O vídeo e o carrossel não bloqueiam rolagem, seleção de texto, foco, menu ou CTA.
- Não há dependência Three.js, raycaster ou controles de câmera carregados no caminho crítico.

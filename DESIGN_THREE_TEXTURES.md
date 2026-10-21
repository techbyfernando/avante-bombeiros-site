# Parecer de texturas Three.js — Avante

## Decisão

**Não incluir Three.js, VideoTexture ou texturas 3D nesta entrega.** O hero solicitado já é um vídeo real em `<video>` e os parceiros serão imagens de logotipo em cards HTML. Transformá-los em texturas WebGL não melhora a leitura nem a conversão; acrescenta inicialização de renderizador, envio contínuo de quadros à GPU e uma segunda camada de composição. O projeto atual não possui cena 3D, `canvas` ou dependência Three.js.

## Base técnica da skill

- A skill `threejs-textures` explica `VideoTexture`, mapas de cor em sRGB, atlas, mipmaps, KTX2 e descarte de texturas. Essas técnicas ajudam **quando há objetos 3D a revestir**; aqui o vídeo e os logotipos são o próprio conteúdo visual.
- `VideoTexture` faria cada quadro decodificado passar também pelo pipeline de textura e renderização. Para um plano de fundo em tela cheia, o elemento `<video>` entrega o mesmo visual com menos código e sem risco de perder controles e poster nativos.
- Um atlas dos logos reduziria mudanças de textura em uma cena WebGL, mas eliminaria a semântica individual de cada marca. Cards `<img alt="…">` preservam nomes acessíveis, cache por arquivo e a nitidez de cada logo.

## Direção visual aplicável sem WebGL

1. Usar o MP4 local sem áudio como fundo, com `object-fit: cover`, poster estático e gradiente CSS para manter texto legível.
2. Tratar cada foto antiga com nitidez e correção moderada, sem alterar pessoas, uniformes, equipamentos ou marcas. Exibir versões locais responsivas e comprimidas.
3. Manter logos em cards brancos sobre a seção vermelha da referência. Quando houver fonte vetorial oficial, preferi-la; caso contrário, aprimorar com fidelidade, preservar proporção e evitar filtros que mudem cor institucional.
4. Animar o carrossel com `transform` e oferecer pausa/foco e modo estático para `prefers-reduced-motion`.

## Critério para reconsiderar 3D

Somente se um elemento tridimensional específico explicar uma informação operacional melhor que vídeo, foto ou diagrama, com protótipo medido em mobile, alternativa sem WebGL, sem conteúdo essencial dentro do canvas, orçamento de GPU/memória e descarte explícito de texturas. Nada no pedido atual demanda esse elemento.

## Evidência examinada

- Skill local `C:\Users\FernandodePaulaRodri\.codex\skills\threejs-textures\SKILL.md`.
- `index.html`: `<video class="hero-video">` e seção de parceiros ainda em implantação na revisão.
- `PERFORMANCE_REVIEW.md`: vídeo de 8,14 MB e prioridade para mídia nativa, CSS e rotas locais.

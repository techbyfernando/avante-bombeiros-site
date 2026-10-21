# Revisão de acabamento — perspectiva Impeccable

Escopo: homepage existente e expansão solicitada em 20/10/2026. A skill foi localizada em `C:\Users\FernandodePaulaRodri\.codex\skills\impeccable\SKILL.md` e seu comando `context --target index.html` foi executado uma vez. O projeto ainda não tem `PRODUCT.md` ou `DESIGN.md`; a implementação atual e o pedido do usuário são a autoridade visual. Parecer apenas, sem edição de UI.

## Direção

A home tem uma composição editorial consistente: H1 forte, vermelho institucional, fotografia operacional, alternância de superfícies e CTA claro. O novo vídeo e o carrossel são os pontos de movimento que devem concentrar a expressividade. Preservar a hierarquia atual e mostrar a operação real da Avante com legibilidade constante. O modo da home é **Persuade**; artigos do blog são **Read**.

## Ajustes prioritários

1. **P0 · Migração sem fuga para o site antigo.** Substituir todos os links de serviço, blog e “site oficial” no conteúdo e rodapé por rotas locais. Uma experiência premium perde confiança quando a jornada muda de identidade em outra aba. Menu desktop/móvel e rodapé devem oferecer entrada para blog e páginas de serviço.
2. **P0 · Vídeo hero com conteúdo legível em todos os quadros.** Manter título e CTA acima da mídia, com gradiente ajustado por teste nos quadros mais claros. Usar poster real, dimensões estáveis e enquadramento responsivo; vídeo sem áudio, em loop e sem controles aparentes. Conferir 320–390 px e zoom de texto sem cortar CTA ou rostos.
3. **P0 · Parceiros como sistema de credibilidade.** Reproduzir fundo vermelho e cartões brancos em duas faixas conforme imagem enviada, com personagem lateral se existir ativo real verificável. Cada logo deve ser oficial, nítido, ter respiro interno e nome acessível. Lista completa comprovada; duplicatas do loop ocultas a leitores de tela; pausa por controle, foco e hover; alternativa sem movimento.
4. **P1 · Consistência de páginas internas.** H1 do serviço, frase de benefício específica, escopo verificável e CTA no primeiro viewport. Um único componente visual de breadcrumb, cards de “serviços relacionados”, FAQ e rodapé. Os serviços não devem ser sete variações do mesmo bloco genérico; AVCB/CLCB precisa de etapas e terminologia próprias, orientação socioeducativa pede tom humano e respeitoso.
5. **P1 · Legibilidade e microinteração.** O texto de painel em `styles.css` está em 14 px, enquanto o conteúdo pede leitura consultiva: usar 16 px em texto corrido e largura de linha controlada. O contorno global vermelho perde contraste no fundo vermelho; usar foco branco ou escuro conforme superfície. Acrescentar estado pressionado discreto para botões e rolagem no menu móvel em telas baixas.

## Detalhes que elevam o acabamento

- Hero: evitar animação de zoom da foto quando o vídeo assume o fundo; não animar título ao mesmo tempo que o filme. A sobreposição deve preservar rosto, uniforme e equipamento, não transformar a operação em textura abstrata.
- Navegação: grupos “Soluções”, “Treinamentos”, “Blog” e “Contato” devem ser reconhecíveis sem depender das abas da home. O logo interno volta para `index.html`.
- Cards: altura, alinhamento ótico e bordas consistentes; não esticar logotipos. Nomes de parceiros podem aparecer como texto acessível, mas sem inventar setores, resultados ou endossos.
- Blog: datas só quando verificadas, largura de leitura próxima de 65 caracteres, subtítulos e conclusão com CTA útil. Artigos precisam de páginas nativas, não só resumos que levem ao domínio antigo.
- Imagens antigas: comparar versão tratada ao original antes de publicar. Não alterar pessoas, faixas refletivas, inscrições em veículos ou emblemas. A melhoria do logotipo horizontal deve conservar letras e geometria; preferir arquivo oficial de maior resolução quando disponível.

## Aceite visual em uma passada

Revisar capturas desktop e mobile juntas, corrigir os defeitos observados em lote e confirmar uma vez. Verificar primeiro viewport em 320, 375, 768 e 1440 px, seção vermelha dos parceiros, estados de teclado, navegação entre rotas e leitura do blog. Executar o detector da skill **uma vez após a implementação**, conforme saída de `context`; não durante conceito.

## Relação com o pedido

O pedido explícito de vídeo contínuo e carrossel automático prevalece sobre qualquer preferência genérica da skill por menos movimento. A acessibilidade entra por contraste, pausa do carrossel, foco e opção de movimento reduzido, sem retirar a experiência visual pedida.

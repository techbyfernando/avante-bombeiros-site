# Quadro de execução — Avante Bombeiros e Serviços

Atualizado em 20/10/2026. Este é o handoff da equipe para a expansão do site local. Estados: **Backlog → Ready → Running → Review → Merged**; **Blocked** exige responsável e próxima ação. O integrador é o agente raiz (`/root`). A capacidade simultânea é de **4 slots, incluindo o integrador**. Revisores e pesquisadores entregam evidências e recomendações; somente o integrador altera os arquivos compartilhados do site, salvo delegação explícita de arquivos exclusivos.

## Fontes e limites

- Projeto: `C:\Users\FernandodePaulaRodri\Downloads\Avante` (site estático em `index.html`, `styles.css`, `main.js`, `images/`). A landing atual ainda contém links para páginas do domínio antigo; as páginas solicitadas devem passar a existir localmente e ser ligadas por URLs locais.
- Referências de conteúdo: site, Instagram e LinkedIn oficiais da Avante; anexos do usuário para vídeo, favicon e seção de parceiros. Registrar URL e evidência de cada informação comercial. A imagem enviada apresenta alguns parceiros, mas não prova que seja a lista completa.
- Documento das crews: `C:\Users\FernandodePaulaRodri\Downloads\Fig\WORKSPACE_CODEX_7_CREWS.md`. Suas crews **Marketing** (`cro`, `seo-audit`, `marketing-psychology`) e **Social e Conteúdo** (`copywriting`, `content-strategy`, `video`) orientam mensagem, CTA, SEO e seleção visual. As skills 3D são overlays contextuais, conforme a regra de motion/3D do próprio documento.
- Sem números de clientes, certificações, cases, avaliações ou logos sem confirmação oficial. Não converter inferências em afirmações institucionais.

## Agent Kanban

| ID / estado | Responsável e papel | Escopo e handoff | Critério de aceite / gate de integração |
| --- | --- | --- | --- |
| A01 · Ready | `/root` — integrador | Coordenar tarefas, consolidar pesquisa, alterar site e documentação, verificar links e publicar resultado local. | Diferenças revisadas; todos os slugs abrem sem redirecionar ao domínio antigo; navegação, responsividade, acessibilidade e console verificados. |
| A02 · Ready | Analista `ecc:latency-critical-systems` | Auditar peso do vídeo, imagens, CSS/JS, animações e estratégia de carregamento; entregar recomendações e evidências, sem editar arquivos compartilhados. | Vídeo inicia silenciado, roda em loop, `playsinline`; poster/fallback e movimento reduzido definidos; LCP e uso de CPU/GPU avaliados; sem dependência 3D desnecessária. |
| A03 · Ready | Curadoria `design-taste-frontend` + crew Social/Conteúdo | Auditar hierarquia visual, fotos/vídeo reais, identidade Avante e escolha de imagens; propor composição hero e parceiros; citar fontes dos materiais. | Direção visual consistente com marca e referência StudioVA; nenhuma foto, uniforme ou logo apresentado como operação real sem procedência. |
| A04 · Ready | Pesquisa/conteúdo — crew Marketing + `ui-ux-pro-max` | Inventariar serviços, páginas e blog oficiais, mapear conteúdo de cada slug, CTAs e jornadas; inventariar **todos** os parceiros verificáveis e conferir grafia/logo. | Matriz fonte → afirmação → URL interna; páginas completas e escaneáveis; conteúdo sem alegações inventadas; parceiro sem evidência fica fora até confirmação. |
| A05 · Ready | Revisor `apple-design` + `impeccable` | Revisão sensorial, tipografia, estados de foco/hover, ritmo, legibilidade, microinterações e acabamento em mobile. Handoff de sugestões ao integrador. | Evidência visual desktop/mobile; contraste, foco visível, navegação por teclado e `prefers-reduced-motion` aprovados. |
| A06 · Ready | Especialista `gsap` | Avaliar se o carrossel e as transições exigem timeline. Se a solução CSS/JS for suficiente, registrar decisão de não adicionar GSAP; se necessário, definir escopo estrito. | Autoplay contínuo sem travamentos, pausa em hover/foco e movimento reduzido; nenhuma biblioteca adicionada sem benefício observável. |
| A07 · Ready | Especialistas `threejs-animation`, `threejs-lighting`, `threejs-textures`, `threejs-interaction` | Cada papel faz revisão curta de pertinência e potencial custo/benefício de 3D para uma marca de emergência. Não implementar cena 3D por padrão. | Decisão registrada para cada skill; qualquer proposta 3D exige finalidade de conversão, protótipo, fallback e orçamento de desempenho/acessibilidade. |
| A08 · Ready | `/root` — mídia e favicon | Incorporar MP4 recebido como mídia local, sem trilha de áudio; produzir favicon transparente de alta resolução a partir do logo anexo e exportações adequadas. | Arquivo final do vídeo inspecionado sem faixa de áudio; reprodução silenciosa contínua; transparência e nitidez do ícone verificadas sobre fundo claro/escuro. |
| A09 · Ready | `/root` — páginas nativas e blog | Criar os sete slugs pedidos e área de blog no mesmo projeto; integrar header/footer, metadados, links internos e caminhos relativos. | Abrir diretamente cada URL local; nenhuma navegação de serviço/blog sai para o site antigo; navegação cruzada e CTA funcionam. |
| A10 · Ready | `/root` — parceiros | Criar seção “Nossos Parceiros” com carrossel automático que reflita a referência, usando lista completa verificada e logos oficiais. | Todos os parceiros publicados nas fontes oficiais entram uma vez; logos têm `alt` adequado; carrossel pausa para interação e respeita movimento reduzido. |

## Ondas com até 4 slots

| Onda | Slots simultâneos | Saída antes da próxima onda |
| --- | --- | --- |
| 1 — evidência | Integrador + analista de latência + curadoria visual + Marketing/UX | Inventário de fontes, páginas, parceiros, restrições de mídia e proposta de hierarquia. Nenhum conteúdo presumido. |
| 2 — implementação | Integrador + `apple-design` + `impeccable` + `gsap` | Hero e favicon, páginas locais, carrossel; revisões de movimento e acabamento aplicáveis. Revisores não fazem escritas concorrentes. |
| 3 — especialistas 3D | Integrador + três especialistas Three.js por vez; o quarto entra quando um slot liberar | Parecer individual de animation, lighting, textures, interaction. Implementação 3D só após gate específico; provável decisão é manter site em 2D para priorizar vídeo real e desempenho. |
| 4 — validação | Integrador + analista de latência + Marketing/UX + curadoria visual | QA de URLs, navegador desktop/mobile, cópia/fonte, carrossel, mídia, acessibilidade e console. |

## Gates de aceite do produto

1. **Fonte** — registrar procedência de cada afirmação, foto, vídeo e parceiro. Conteúdo antigo não deve ser copiado cegamente nem redirecionar para o domínio antigo.
2. **Mídia** — arquivo MP4 local sem faixa de áudio, loop/mute/inline/autoplay, primeira dobra legível enquanto carrega, fallback em falha, favicon PNG transparente em tamanhos adequados.
3. **Rotas** — `brigada-de-incendio-nr23.html`, `plano-de-abandono.html`, `auto-de-vistoria-avcb-clcb.html`, `bombeiro-civil-terceirizacao.html`, `eventos.html`, `treinamentos.html`, `orientacao-socioeducativa.html` e blog locais, todos navegáveis.
4. **Interação** — carrossel automático com todos os logos verificados, sem corte abrupto, controls acessíveis ou pausa em foco/hover, redução de movimento.
5. **Qualidade** — desktop e mobile testados, sem links quebrados ou erros de console, sem layout overflow, contraste e foco visível; vídeo e animações não comprometem a navegação.

## Pendências e decisões

- **Lista completa de parceiros — dono: pesquisa/conteúdo.** A captura anexada mostra Eureka Coworking, Meliá Hotels International, Mercado Livre, Summit Connect, Arena B3, Zenvia, Volvo, Teatro Santander, Rede D'Or e um logo parcialmente visível. Confirmar todos na fonte oficial antes de publicar; não presumir completude da captura.
- **Blog — dono: pesquisa/conteúdo.** Mapear as publicações oficiais disponíveis e seus URLs. Criar índice e conteúdo nativo sustentado por fontes verificáveis; indicar quando o arquivo oficial não oferecer texto integral.
- **3D — dono: especialistas Three.js.** Sem requisito funcional de objetos tridimensionais no pedido. A decisão inicial é não introduzir Three.js; cada especialista faz revisão curta e só propõe implementação se houver ganho claro para a página.
- **Branch/worktree:** o workspace fornecido não mostra `.git` na raiz na inspeção inicial; confirmar antes de prometer merge/PR. Neste momento, “Merged” significa integrado e validado no site local pelo agente raiz.

## Evidência e handoff

Cada agente deve devolver ao integrador: (1) achados prioritários, (2) fontes ou capturas, (3) decisão recomendada, (4) riscos concretos e (5) aceite verificável. O integrador atualiza estados, resultados de QA e bloqueios aqui ao concluir cada onda. Candidato a fluxo reutilizável: matriz “fonte oficial → conteúdo → rota → QA” para migrações de sites institucionais.

## Integração executada

- Agentes `latency-critical-systems`, `design-taste-frontend`, `gsap`, `apple-design`, `impeccable`, `ui-ux-pro-max`, `threejs-animation`, `threejs-lighting`, `threejs-textures` e `threejs-interaction` entregaram análises em arquivos próprios. O orquestrador integrou o documento das crews de marketing e conteúdo. As quatro avaliações Three.js concluíram que o vídeo real e HTML/CSS oferecem melhor fidelidade e custo para este caso; nenhuma dependência 3D foi adicionada.
- Vídeo local sem trilha de áudio, favicon transparente, sete páginas de serviço, blog e sete artigos nativos estão implementados. O carrossel contém 40 logos da página oficial e dez cards identificados na captura enviada.
- O usuário pediu posteriormente para remover pausas manuais. O botão, o código de pausa e o congelamento por cursor/foco foram retirados. A alternativa estática por preferência do sistema de movimento reduzido permanece por acessibilidade.
- `npm run build` e `npm run check` passaram; a verificação estrutural encontrou 23 páginas com `main`, H1 e rodapé, além de 50 cards e 50 nomes de parceiros. O sandbox impediu conexão HTTP ao servidor local; a inspeção funcional visual no navegador deve ocorrer no ambiente do usuário.

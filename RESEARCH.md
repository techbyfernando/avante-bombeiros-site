# Pesquisa e origem dos materiais

## Referência visual

- [Studiova](https://studiova-agency-business-bootstrap-template-v2.21st.app/): observado no navegador. Estrutura visível: hero fotográfico escuro com título dominante, cabeçalho fixo, seções numeradas, composição ampla com grandes títulos, grade de projetos, serviços em abas, blocos alternando fundos claro/escuro, animações de entrada, FAQ e contato.
- A landing da Avante adapta esse ritmo visual, as abas de serviços, os índices de seção, o menu móvel e as transições. Números, preços e depoimentos da referência foram substituídos por conteúdo verificável da Avante.

## Fontes oficiais da Avante

- [Site principal](https://www.avantebombeiros.com/): identidade visual, logotipo, serviços, parceiros, telefone, WhatsApp e e-mail.
- [Quem somos](https://www.avantebombeiros.com/quem-somos-experiencia-seguranca-bombeiros.html): posicionamento institucional e ambientes atendidos.
- [Terceirização de bombeiros civis](https://www.avantebombeiros.com/bombeiro-civil-terceirizacao.html): atribuições e atuação de bombeiros civis.
- [Eventos](https://www.avantebombeiros.com/avante-servicos-para-eventos.html): cobertura com bombeiros civis.
- [Treinamentos](https://www.avantebombeiros.com/treinamentos-seguranca-primeiros-socorros-incendio.html): brigadas, primeiros socorros, evacuação, NR-35 e NR-33.
- [Brigada de incêndio](https://www.avantebombeiros.com/brigada-incendio-nr23-treinamento-certificado.html): NR-23, treinamento prático e unidade móvel.
- [AVCB](https://www.avantebombeiros.com/auto-de-vistoria-avcb-1.html): diagnóstico, inspeções, adequações e equipamentos.
- [LinkedIn oficial](https://br.linkedin.com/company/avante-bombeiros-especializados): descrição da empresa, prevenção ativa, resposta eficiente, consultoria e auditorias.
- [Instagram oficial](https://www.instagram.com/avante_bombeiros/): bio e destaques de brigadas, abandono, eventos e workshop. Publicações e vídeos exigiram login no navegador e não foram usados como fonte de afirmações.

## Arquivos de imagem

| Arquivo local | Origem |
| --- | --- |
| `images/avante-logo.png` | `https://www.avantebombeiros.com/images/logo.png` |
| `images/avante-logo-footer.png` | `https://www.avantebombeiros.com/images/logo-rodape.png` |
| `images/treinamento.jpg` | `https://www.avantebombeiros.com/content/images/d81e69b639a6e1a7eff2411e361377d5.jpg` |
| `images/equipe-fixa.jpg` | `https://www.avantebombeiros.com/content/images/72ba503a4a96947f32dd2f19019a7f51.jpg` |
| `images/eventos-hero.jpg` | `https://www.avantebombeiros.com/content/images/e41f0f78f26b49cfb726034b06f42c6c.jpg` |
| `images/brigada-hero.jpg` | `https://www.avantebombeiros.com/content/images/98a8e0781b4c79f9a4c3c79713ccf1b2.jpg` |

As quatro fotografias operacionais usadas pelo novo site recebem versões aprimoradas em WebP; as versões originais permanecem no projeto para comparação. O favicon veio do emblema enviado pelo usuário e usa `images/favicon-avante-512.png` com fundo transparente. Os recortes dos logos de parceiros foram removidos depois que a inspeção detectou halos; o carrossel atual usa nomes em tipografia vetorial sem fundo. A foto de fallback e o poster do vídeo hero foram removidos por solicitação do usuário.

O vídeo enviado pelo usuário foi salvo como `media/avante-hero-silent.mp4`. O script `scripts/strip-audio.mjs` substituiu a trilha `soun` do contêiner MP4 por uma caixa `free`, mantendo os offsets do fluxo de vídeo; a verificação local confirmou a ausência de trilha de áudio. A reprodução usa `autoplay`, `muted`, `loop` e `playsinline`.

O inventário completo de 40 logos encontrados na página oficial e 10 marcas adicionais visíveis na captura enviada está em [CONTENT_INVENTORY.md](./CONTENT_INVENTORY.md). Os 40 arquivos oficiais são usados em cards brancos com dimensões de exibição inferiores à resolução de origem e leve tratamento de contraste/cor por CSS. As dez marcas adicionais usam cards de nome para não inventar logotipos.

As sete rotas de serviço solicitadas, o blog e sete publicações foram recriados nativamente com sínteses editoriais das fontes oficiais. Os textos evitam copiar afirmações normativas amplas que dependem do local ou da data de vigência. As páginas de serviço e blog não redirecionam ao domínio antigo.

## Uso do REA

O clone local do [REA](https://github.com/morluto/rea) foi localizado em `C:\Users\FernandodePaulaRodri\Documents\Codex\2026-10-13\g\work\rea`. A skill `reverse-engineer-anything` orientou a separação entre observação da página, evidência das fontes e escolhas de reconstrução. O clone não possui `dist/` compilado e as ferramentas MCP do REA não estão registradas nesta sessão; portanto, a inspeção da página ocorreu pela árvore acessível e pelo DOM do navegador, sem alegar que resultados de análise foram gerados pelo REA.

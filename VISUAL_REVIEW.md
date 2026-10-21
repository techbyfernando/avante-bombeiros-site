# Revisão visual e responsiva — Avante

Atualizado em 20/10/2026 após a nova revisão de UX/UI, performance e conteúdo.

## Ajustes desta revisão

- Vídeo H.264 silencioso em loop na abertura; foto de fallback e poster removidos. O vídeo não depende mais de evento `playing` para ficar visível.
- Parceiros reposicionados após a apresentação institucional. Os recortes com halos foram retirados; os 40 parceiros oficiais e os dez nomes da imagem permanecem em duas faixas automáticas como nomes tipográficos transparentes.
- A grade de serviços distribui todos os sete itens, sem célula cinza vazia, em desktop, tablet e celular.
- Blog com uma matéria visualmente destacada, melhor espaçamento e coluna única em telas de até 900 px. O resumo não se repete entre o título e a abertura do artigo.
- Entradas de conteúdo com atraso escalonado discreto; a preferência `prefers-reduced-motion` remove atraso e movimento.
- Removidos 49 arquivos intermediários sem uso pelo site, liberando 16.496.645 bytes. Fotos WebP otimizadas, originais JPG e favicon transparente de 512 px foram preservados.

## Responsividade revisada por código

| Largura | Comportamento verificado no CSS |
| ---: | --- |
| 320–375 px | Menu compacto, hero e CTAs em coluna, serviços em lista, blog e formulário em uma coluna, rodapé com quebra de linha. |
| 600–800 px | Navegação móvel, seções em coluna, fotos redimensionadas e cartões do blog empilhados. |
| 900–1100 px | Blog passa a uma coluna, grade de parceiros reduz colunas e a grade de serviços evita sobras. |
| 1440 px | Shell centralizado, navegação completa, conteúdo em colunas e carrossel amplo. |

`npm run build` e `npm run check` passam. Não foi possível obter capturas visuais reais nesta sessão: a política do navegador bloqueou a inspeção da aba `file://`. A validação de corte, alinhamento e reprodução final deve ser feita ao atualizar a página aberta pelo usuário.

## Critérios de comunicação

O conteúdo segue a informação pública verificada da Avante. O time de marketing recomendou dar acesso cedo às soluções, contextualizar as chamadas e manter prova social atribuída. O site mantém as páginas locais para os sete serviços, contatos e registros do blog. Não foram adicionados números, clientes, certificações ou casos não confirmados.

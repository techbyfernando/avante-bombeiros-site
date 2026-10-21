# Revisão dos logos dos parceiros

Revisão de 21/10/2026 após substituir os recortes ampliados no carrossel de `index.html`.

## O que está publicado no carrossel

- 50 marcas aparecem como arquivos de imagem (`<img>`); o movimento duplica a faixa para criar o loop, então há 100 elementos HTML e 50 fontes únicas.
- Os 40 parceiros vindos da página oficial da Avante usam as imagens originais em `research/partner-source/`, exceto onde um master oficial foi verificado.
- Masters oficiais usados: Center Norte (SVG), CSN (PNG), Shopping Granja Vianna (PNG), CBSI (SVG), West Plaza (PNG), Internacional Shopping (PNG), 3 Corações (PNG), Voke (SVG), Sesc (SVG branco em cartão escuro), Lar de Maria (PNG), Transamerica Expo Center (PNG) e SGS (PNG).
- Na captura enviada, Arena B3 (PNG), Zenvia (SVG) e Omie (PNG) foram substituídos por artes oficiais transparentes. Eureka Coworking veio do PDF vetorial oficial de imprensa e foi exportada em alta resolução. Meliá, Mercado Livre, Summit Connect, Volvo, Teatro Santander e Rede D’Or permanecem como recortes da captura; a arte é pequena e não foi artificialmente ampliada.

## Tratamento visual e limites

- Nenhum fundo foi removido por chave de cor. As miniaturas originais com fundo branco permanecem intactas em cartões brancos, evitando halos, bordas de recorte e perda de detalhes brancos dos logos.
- Os recortes derivados da captura foram refeitos dentro da área da marca. O Volvo usa apenas o emblema azul para excluir o quadriculado embutido na captura. A marca amarela do Mercado Livre e a placa azul da Rede D’Or são partes da imagem de referência.
- 28 imagens originais da Avante têm dimensões pequenas (aproximadamente 125–242 px) e não são transparentes. São exibidas sem ampliação artificial em cartões brancos. Os seis logos mantidos da captura também têm limite de largura no CSS para evitar ampliação excessiva.
- Os assets transparentes melhoram a nitidez e removem fundos em parte do conjunto, mas não é correto afirmar que todos os 50 logos são transparentes ou masters em alta resolução. Os arquivos oficiais restantes precisam ser obtidos das próprias marcas ou da Avante para atingir esse padrão em todo o carrossel.

## Verificações

- `node scripts/build-partners.mjs`: gerou a seção com 50 marcas.
- `node scripts/check-site.mjs`: aprovado; conferiu páginas, referências locais, logos de imagem, arquivos existentes, vídeo e breakpoints.
- Revisão por prancha: originais da Avante e seis recortes da captura. Não foi feita inspeção renderizada do site em browser nesta passagem.

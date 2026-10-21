# Tratamento de mídia

As edições abaixo foram feitas com a ferramenta integrada `image_gen` a partir dos anexos do usuário e das imagens do site oficial. Os originais continuam preservados no projeto. O acabamento buscou reduzir artefatos, recuperar contraste e aumentar nitidez sem criar operações fictícias.

| Saída usada no site | Entrada | Instrução essencial |
| --- | --- | --- |
| `images/favicon-avante-512.png` | Emblema circular de 150 × 150 enviado pelo usuário | Extrair o fundo externo para alfa verdadeiro; restaurar bordas; preservar círculo, A em escada, cores e textos “BOMBEIROS” e “AVANTE”. |
| `images/equipe-fixa-enhanced.webp` | `images/equipe-fixa.jpg` | Reduzir ruído e artefatos; equilibrar exposição e balanço de branco; preservar pessoas, rostos, poses, uniformes e ambiente. |
| `images/brigada-hero-enhanced.webp` | `images/brigada-hero.jpg` | Restaurar qualidade, ruído e contraste sem modificar bombeiros, equipamentos, jato e enquadramento panorâmico. |
| `images/eventos-hero-enhanced.webp` | `images/eventos-hero.jpg` | Recuperar detalhes nas sombras e nitidez sem modificar participantes, EPIs, mangueira ou ambiente. |
| `images/treinamento-enhanced.webp` | `images/treinamento.jpg` | Restaurar foto dos integrantes ao lado da unidade móvel, conservando identidades, uniformes, veículo e marca. |

Um ensaio de restauração do logo horizontal também foi gerado, mas não foi usado porque suas letras e proporções não ficaram fiéis ao original. Os arquivos PNG grandes intermediários foram removidos depois de confirmar que as páginas usam as versões WebP otimizadas. O site mantém o arquivo oficial horizontal.

O MP4 não foi recriado. O script `scripts/strip-audio.mjs` preserva o fluxo de vídeo enviado pelo usuário e remove a trilha de áudio do contêiner sem recodificar quadros.

# Landing page — Avante Bombeiros e Serviços

Site estático, responsivo e sem dependências de execução. A página inicial usa vídeo local silencioso em loop, abas de serviços, formulário que abre o WhatsApp oficial e carrossel contínuo de parceiros. Sete páginas de serviço, o blog e sete publicações estão implementados como HTML local.

## Executar

```powershell
npm start
```

Abra `http://127.0.0.1:4173` em um navegador com acesso à rede local. O servidor usa apenas módulos nativos do Node.js 24.

Os arquivos HTML também podem ser abertos diretamente para inspeção estática, mas a verificação de entrega HTTP, CSP e vídeo com Range exige o servidor.

## Gerar a versão de produção

```powershell
npm run build
```

O comando cria `dist/` apenas com os arquivos entregues ao navegador. Para regenerar páginas e parceiros a partir dos materiais de trabalho, use `npm run generate`.

## Verificar

```powershell
npm run check
```

O verificador confere rotas, referências locais, ausência de links ao domínio antigo, presença de 51 logos de parceiros em imagem e ausência de trilha de áudio no MP4. A varredura responsiva cobre 28 tamanhos da página inicial e 56 combinações das páginas internas com `npm run qa:responsive`. O formulário valida os campos no navegador e abre o WhatsApp oficial com a mensagem preenchida. Nenhum dado é armazenado por este projeto.

## Conteúdo

As afirmações e imagens vieram dos canais oficiais da Avante e dos anexos fornecidos pelo usuário. O mapeamento de fontes e as decisões de adaptação da referência Studiova estão em [RESEARCH.md](./RESEARCH.md) e [CONTENT_INVENTORY.md](./CONTENT_INVENTORY.md). Todos os parceiros do carrossel são apresentados por arquivos de imagem transparentes e normalizados.

Antes de publicar, substitua a imagem `og:image` por uma URL absoluta da implantação e configure domínio, hospedagem e monitoramento conforme a operação escolhida.

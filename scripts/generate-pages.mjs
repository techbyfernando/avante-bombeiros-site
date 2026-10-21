import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const services = [
  {
    slug: 'brigada-de-incendio-nr23.html', aliases: ['brigada-incendio-nr23-treinamento-certificado.html'], title: 'Brigada de Incêndio e NR-23', eyebrow: 'TREINAMENTO E PREVENÇÃO', image: 'brigada-hero-enhanced.webp', imageAlt: 'Treinamento prático de combate a incêndio realizado pela Avante', intent: 'Brigada de incêndio / NR-23',
    lead: 'Formação e preparação de brigadas para prevenir ocorrências, orientar pessoas e agir nos primeiros momentos de uma emergência.',
    sections: [
      ['Preparação conectada à realidade', 'A Avante apresenta treinamentos in company adaptados ao ambiente de cada operação. As aulas combinam orientação e exercícios práticos, inclusive com a unidade móvel de treinamento apresentada pela empresa.'],
      ['O que a brigada pratica', 'Reconhecimento de riscos, uso inicial de equipamentos de combate a incêndio, comunicação de emergência, abandono de área e primeiros socorros fazem parte das atribuições divulgadas pela Avante.'],
      ['Para quem', 'Empresas, centros comerciais, shopping centers, indústrias e condomínios estão entre os ambientes citados pela Avante para seus treinamentos. O escopo deve ser dimensionado para o risco e a ocupação de cada local.'],
    ], bullets: ['Inspeção preventiva e identificação de riscos', 'Resposta a princípios de incêndio', 'Apoio à evacuação e primeiros socorros', 'Exercícios práticos e simulações'],
    source: 'https://www.avantebombeiros.com/brigada-de-incendio-nr23.html',
  },
  {
    slug: 'plano-de-abandono.html', aliases: ['plano-abandono-seguranca-emergencia-eficacia.html'], title: 'Plano de Abandono e Evacuação', eyebrow: 'ROTAS CLARAS, EQUIPES PREPARADAS', image: 'treinamento-enhanced.webp', imageAlt: 'Equipe da Avante junto à unidade móvel de treinamento', intent: 'Plano de abandono e evacuação',
    lead: 'Procedimentos, orientação e treinamento para que ocupantes saibam como sair de uma área de forma organizada em uma emergência.',
    sections: [
      ['Um plano para o seu espaço', 'A Avante descreve o plano de abandono como um conjunto de procedimentos para orientar funcionários e visitantes, com rotas de fuga, pontos de encontro, comunicação e contagem de pessoas.'],
      ['Do documento ao exercício', 'O treinamento de evacuação apresentado pela empresa inclui exercícios práticos e orientações para que cada pessoa compreenda seu papel em cenários de risco.'],
      ['Integração com a prevenção', 'O plano deve dialogar com sinalização, saídas de emergência, brigada e rotinas de atualização. A definição concreta depende das características da edificação e da operação.'],
    ], bullets: ['Leitura das rotas e saídas', 'Pontos de encontro e comunicação', 'Papéis da brigada e dos ocupantes', 'Simulados de abandono'],
    source: 'https://www.avantebombeiros.com/plano-de-abandono.html',
  },
  {
    slug: 'auto-de-vistoria-avcb-clcb.html', aliases: ['auto-de-vistoria-avcb-1.html'], title: 'AVCB e CLCB', eyebrow: 'CONFORMIDADE E SEGURANÇA', image: 'brigada-hero-enhanced.webp', imageAlt: 'Treinamento de segurança contra incêndio', intent: 'AVCB/CLCB e prevenção',
    lead: 'Apoio técnico na avaliação, adequação documental e preparação da edificação para os processos de AVCB ou CLCB.',
    sections: [
      ['Diagnóstico técnico', 'A Avante informa que inicia com visita e levantamento de ocupação, áreas, rotas de fuga e sistemas como extintores, hidrantes, iluminação, sinalização e alarme.'],
      ['Plano de adequação', 'O processo descrito pela empresa reúne identificação das exigências aplicáveis, relatório de não conformidades, orçamento e acompanhamento das correções físicas e documentais.'],
      ['Documentos e vistoria', 'A empresa apresenta suporte a laudos, projetos, ART/RRT quando aplicáveis, protocolo e acompanhamento da vistoria. A relação de documentos varia conforme ocupação, área e exigências vigentes.'],
    ], bullets: ['Visita técnica e diagnóstico', 'Plano de adequação', 'Sistemas e documentos', 'Acompanhamento do processo'],
    source: 'https://www.avantebombeiros.com/auto-de-vistoria-avcb-clcb.html',
  },
  {
    slug: 'bombeiro-civil-terceirizacao.html', title: 'Bombeiro Civil: Terceirização', eyebrow: 'PRESENÇA OPERACIONAL', image: 'equipe-fixa-enhanced.webp', imageAlt: 'Equipe de bombeiros civis da Avante em uniforme operacional', intent: 'Bombeiro civil terceirizado',
    lead: 'Bombeiros civis integrados à rotina de prevenção, inspeção e resposta inicial a emergências de sua operação.',
    sections: [
      ['Prevenção todos os dias', 'A atuação divulgada pela Avante inclui análise de riscos, inspeção de equipamentos, observação de sinalização, saídas e iluminação de emergência.'],
      ['Prontidão para agir', 'Os profissionais também apoiam planos de evacuação, combate inicial a incêndio, primeiros socorros e resgate, conforme o cenário e o escopo contratado.'],
      ['Uma equipe para cada ambiente', 'A Avante cita atuação em shopping centers, indústrias, eventos e hipermercados. A composição de equipe e os postos devem seguir a necessidade da operação e as exigências aplicáveis.'],
    ], bullets: ['Análise de riscos e inspeções', 'Checagem de equipamentos e rotas', 'Apoio ao plano de abandono', 'Primeiros socorros e resposta inicial'],
    source: 'https://www.avantebombeiros.com/bombeiro-civil-terceirizacao.html',
  },
  {
    slug: 'eventos.html', aliases: ['avante-servicos-para-eventos.html'], title: 'Bombeiros e Equipes para Eventos', eyebrow: 'EVENTOS COM PREPARO', image: 'eventos-hero-enhanced.webp', imageAlt: 'Equipe em exercício prático de combate a incêndio', intent: 'Cobertura para eventos',
    lead: 'Cobertura com bombeiros civis para prevenção, primeiros socorros e resposta a intercorrências em eventos e espaços de entretenimento.',
    sections: [
      ['Proteção do público e da operação', 'A Avante descreve bombeiros civis para eventos com atuação em primeiros socorros, prevenção e combate inicial a incêndios, além de inspeções e testes de equipamentos.'],
      ['Apoio ao evento completo', 'Na página oficial, a empresa também apresenta recepção, promotores, segurança, limpeza e carregadores como serviços de apoio a eventos. Consulte a equipe para compor o escopo adequado.'],
      ['Planejamento sob medida', 'Cada evento pede leitura de público, espaço, acessos e riscos. A proposta deve definir equipe, comunicação e recursos antes da abertura ao público.'],
    ], bullets: ['Bombeiros civis para eventos', 'Primeiros socorros', 'Prevenção e resposta inicial', 'Equipe de apoio conforme necessidade'],
    source: 'https://www.avantebombeiros.com/eventos.html',
  },
  {
    slug: 'treinamentos.html', aliases: ['treinamentos-seguranca-primeiros-socorros-incendio.html'], title: 'Treinamentos e Capacitações', eyebrow: 'CONHECIMENTO QUE VIRA AÇÃO', image: 'treinamento-enhanced.webp', imageAlt: 'Equipe da Avante em frente à unidade móvel de treinamento', intent: 'Treinamentos e capacitações',
    lead: 'Capacitações práticas e teóricas para preparar pessoas a reconhecer riscos e agir com segurança em emergências.',
    sections: [
      ['Portfólio divulgado pela Avante', 'A empresa apresenta cursos de brigada de incêndio, primeiros socorros, evacuação, DEA, APH, trabalho e resgate em altura (NR-35) e espaços confinados (NR-33).'],
      ['Riscos específicos', 'Também constam treinamentos para cozinhas industriais, produtos químicos perigosos, equipamentos de proteção individual e combate a incêndio envolvendo baterias de íons de lítio.'],
      ['Treinamento in company', 'A Avante informa que adapta o conteúdo à realidade da contratante e utiliza exercícios práticos e sua unidade móvel em parte das capacitações.'],
    ], bullets: ['Brigada de incêndio e NR-23', 'Primeiros socorros, DEA e APH', 'Abandono e evacuação', 'NR-35, NR-33 e riscos específicos'],
    source: 'https://www.avantebombeiros.com/treinamentos.html',
  },
  {
    slug: 'orientacao-socioeducativa.html', aliases: ['orientacao-socioeducativa-profissional-emergencia.html'], title: 'Orientação Socioeducativa', eyebrow: 'CUIDADO E ACOLHIMENTO', image: 'equipe-fixa-enhanced.webp', imageAlt: 'Profissionais da Avante em ambiente de operação', intent: 'Orientação socioeducativa',
    lead: 'Atuação social com orientação e encaminhamento para a rede socioassistencial, apresentada pela Avante para empreendimentos privados.',
    sections: [
      ['Um núcleo social no empreendimento', 'A Avante informa que seu núcleo reúne orientadores socioeducativos, assistentes sociais e supervisores em operações como shopping centers e hipermercados.'],
      ['Conexão com a rede', 'A proposta divulgada pela empresa inclui articulação com Conselho Tutelar, SAS, CREAS e outros serviços socioassistenciais para apoiar pessoas em situação de vulnerabilidade.'],
      ['Abordagem com respeito', 'O conteúdo oficial enfatiza dignidade, acolhimento e encaminhamento responsável. Cada implementação deve ser desenhada em conjunto com o empreendimento e a rede local.'],
    ], bullets: ['Orientadores e equipe social', 'Acolhimento e encaminhamento', 'Articulação com serviços públicos', 'Fluxos adequados ao empreendimento'],
    source: 'https://www.avantebombeiros.com/orientacao-socioeducativa.html',
  },
];

// Conteúdo factual consolidado das páginas oficiais. Mantemos a redação curta e
// escaneável, mas preservamos todos os temas, etapas e serviços publicados.
const coverageBySlug = {
  'brigada-de-incendio-nr23.html': [
    ['Treinamento e estrutura', [
      'Treinamento in company adaptado à empresa, centro comercial, shopping, indústria ou condomínio.',
      'Unidade móvel configurada para simulações práticas de primeiros socorros e combate a incêndio.',
      'Exercícios de uso de extintores, mangueiras e equipamentos de resposta inicial.',
    ]],
    ['Atribuições da brigada', [
      'Inspecionar instalações, identificar riscos e conferir equipamentos de combate a incêndio.',
      'Atuar em princípios de incêndio e coordenar a evacuação conforme o plano de emergência.',
      'Prestar primeiros socorros, incluindo RCP, controle de hemorragias e imobilização até a chegada do atendimento especializado.',
      'Orientar colaboradores e realizar simulações periódicas de emergência.',
    ]],
    ['Referências apresentadas pela Avante', [
      'A página oficial relaciona a brigada à renovação do AVCB e às Instruções Técnicas do Corpo de Bombeiros de São Paulo.',
      'O dimensionamento e as exigências variam conforme ocupação, risco, porte e regras aplicáveis à edificação.',
    ]],
  ],
  'plano-de-abandono.html': [
    ['Elementos do plano', [
      'Rotas de evacuação, pontos de encontro, comunicação de emergência e contagem de pessoas.',
      'Definição clara dos papéis de colaboradores, visitantes e equipe de resposta.',
      'Treinamento prático com exercícios realistas para reduzir pânico e orientar uma saída organizada.',
    ]],
    ['Por que preparar a operação', [
      'Proteção de funcionários e visitantes e preparação para agir com calma em cenários críticos.',
      'Apoio à conformidade, redução de perdas operacionais e fortalecimento da responsabilidade da organização.',
      'Revisões e treinamentos regulares para manter procedimentos compreendidos e utilizáveis.',
    ]],
    ['Ambientes atendidos', [
      'Escritórios, instituições de ensino, hospitais, hotéis e centros de saúde.',
      'Shoppings, centros comerciais, espaços de eventos, indústrias, fábricas e edifícios residenciais de grande porte.',
    ]],
  ],
  'auto-de-vistoria-avcb-clcb.html': [
    ['Etapas do trabalho', [
      'Visita técnica, diagnóstico da ocupação, áreas, rotas de fuga e sistemas de proteção.',
      'Identificação das Instruções Técnicas aplicáveis e enquadramento do processo como AVCB ou CLCB.',
      'Relatório de não conformidades, plano de adequação, orçamento e acompanhamento das correções.',
      'Preparação do processo, taxas, protocolo no Via Fácil Bombeiros, vistoria e tratamento de pendências.',
    ]],
    ['Sistemas avaliados', [
      'Extintores, hidrantes, mangotinhos, sprinklers, detecção e alarme.',
      'Iluminação e sinalização de emergência, portas corta-fogo, casa de bombas e compartimentação.',
      'SPDA, instalações de gás, acessibilidade, instalações elétricas e armazenamento de produtos perigosos.',
    ]],
    ['Documentos e ensaios', [
      'Documentos do imóvel e da empresa, planta e memorial de segurança quando exigidos.',
      'Projetos, ART/RRT, relatório fotográfico, laudos e certificados dos sistemas aplicáveis.',
      'Ensaios de vazão e pressão, testes de bombas, autonomia da iluminação, estanqueidade de gás e inspeções de conformidade.',
    ]],
  ],
  'bombeiro-civil-terceirizacao.html': [
    ['Atuação operacional', [
      'Análise de riscos, inspeção de equipamentos, rotas, escadas, sinalização e iluminação de emergência.',
      'Gestão de planos de evacuação, prevenção e combate inicial a incêndios.',
      'Primeiros socorros, apoio a resgates e resposta a ocorrências elétricas, hidráulicas ou com produtos químicos.',
      'Análise e testes de sistemas de detecção e alarme e apoio a viaturas de combate e resgate.',
    ]],
    ['Vantagens da terceirização', [
      'Equipe especializada, gestão da mão de obra e maior flexibilidade para a operação contratante.',
      'Redução de carga administrativa, ganho de tempo e foco da equipe interna nas atividades centrais.',
      'Capacidade de dimensionar profissionais para shoppings, indústrias, eventos e hipermercados.',
    ]],
    ['Soluções complementares publicadas', [
      'Projetos, laudos e pareceres de segurança contra incêndio e apoio ao AVCB.',
      'Plano de abandono, iluminação e sinalização de emergência.',
      'Proteção por extintores, hidrantes, mangotinhos, espuma, escada pressurizada e controle de fumaça.',
      'Inspeção de cozinhas e praças de alimentação.',
    ]],
  ],
  'eventos.html': [
    ['Equipe para o evento', [
      'Bombeiros civis para primeiros socorros, prevenção, inspeções e resposta inicial a intercorrências.',
      'Recepcionistas bilíngues e promotores para atendimento, ativação e relacionamento com o público.',
      'Segurança, limpeza e conservação, carregadores e apoio à montagem e desmontagem.',
    ]],
    ['Operação planejada', [
      'Leitura de público, local, acessos, circulação, riscos e recursos antes da abertura.',
      'Composição de equipe e comunicação ajustadas ao porte e às necessidades do evento.',
      'Apoio em casas noturnas, buffets, bares, restaurantes e espaços de entretenimento.',
    ]],
    ['Contato profissional', [
      'Solicitações comerciais são direcionadas ao atendimento da Avante.',
      'Currículos para equipes de eventos são recebidos no endereço rh@avantebombeiros.com divulgado pela empresa.',
    ]],
  ],
  'treinamentos.html': [
    ['Emergência e atendimento', [
      'Evacuação de emergência e plano de abandono.',
      'Brigadista de combate a incêndio, primeiros socorros, DEA e atendimento pré-hospitalar (APH).',
      'Uso de equipamentos, comunicação, trabalho em equipe e tomada de decisão em incidentes.',
    ]],
    ['Resgate e riscos específicos', [
      'Resgate e trabalho em altura conforme NR-35.',
      'Resgate e trabalho em espaços confinados conforme NR-33.',
      'Cozinhas industriais, produtos químicos perigosos e equipamento de proteção individual.',
      'Combate a incêndios envolvendo baterias de íons de lítio.',
    ]],
    ['Formato das capacitações', [
      'Conteúdo teórico e prático adaptado à realidade da empresa.',
      'Exercícios com unidade móvel em parte das capacitações e foco em aplicação segura dos procedimentos.',
    ]],
  ],
  'orientacao-socioeducativa.html': [
    ['Núcleo social', [
      'Orientadores socioeducativos, assistentes sociais e supervisores em empreendimentos privados.',
      'Acolhimento de pessoas em situação de vulnerabilidade com respeito, escuta e preservação da dignidade.',
      'Fluxos pensados para shoppings e hipermercados onde a Avante informa manter atuação.',
    ]],
    ['Rede de proteção', [
      'Articulação com Conselho Tutelar, SAS, CREAS e demais serviços socioassistenciais e políticas públicas.',
      'Encaminhamento para atendimento de necessidades imediatas e inserção na rede de proteção.',
    ]],
    ['Cidade Protetora', [
      'A Avante relaciona a atuação ao Programa Cidade Protetora da Secretaria Municipal de Assistência e Desenvolvimento Social de São Paulo.',
      'A página oficial cita o Decreto Municipal 61.426/2022 e a Instrução Normativa 02/SMADS/2022 como bases do programa.',
    ]],
  ],
};

const articles = [
  ['avante-bombeiros-trimais-hipercenter-3.html', 'Sucesso de Treinamentos em 2024', '14 fev 2025', 'A Avante publicou um balanço de suas capacitações de 2024, com foco em brigada de incêndio, prevenção e primeiros socorros.', 'A publicação oficial relata 214 treinamentos realizados em 2024 e apresenta as frentes de capacitação trabalhadas pela equipe. O conteúdo reforça o papel da prática e da atualização de procedimentos na preparação das empresas para emergências.'],
  ['avante-bombeiros-trimais-hipercenter-11.html', 'Avante na linha de produção da Electrolux São Carlos', '14 fev 2025', 'A empresa relata sua atuação com bombeiros fixos na unidade industrial de São Carlos.', 'No relato oficial, a Avante descreve a presença de bombeiros civis na rotina de prevenção, inspeção de áreas críticas, primeiros socorros e resposta a emergências na fábrica. A operação industrial exige atenção contínua aos riscos e aos sistemas de proteção.'],
  ['avante-bombeiros-trimais-hipercenter-1.html', 'Bombeiros fixos na Companhia Siderúrgica Nacional', '14 fev 2025', 'A Avante apresenta sua atuação de prevenção e resposta no ambiente siderúrgico.', 'A publicação oficial trata da presença de bombeiros fixos da Avante na CSN. Entre as atividades descritas estão monitoramento de áreas críticas, inspeção de equipamentos, treinamento, primeiros socorros e resposta inicial a emergências.'],
  ['avante-bombeiros-trimais-hipercenter.html', 'Avante Bombeiros & Trimais Hipercenter', '6 mar 2024', 'Notícia institucional sobre a ampliação das operações da Avante no Trimais Hipercenter.', 'A Avante divulgou sua atuação no Trimais Hipercenter, na Zona Norte de São Paulo. A publicação destaca a importância da prevenção e da presença operacional em espaços de grande circulação de pessoas.'],
  ['treinamento-de-brigada-de-incendio-no-shopping-raposo-avante-bombeiros-eleva-a-seguranca-a-novos-patamares.html', 'Treinamento de Brigada de Incêndio no Shopping Raposo', '16 jan 2024', 'Registro de treinamento de brigada de incêndio publicado pela Avante.', 'A Avante apresentou o treinamento realizado no Shopping Raposo e a preparação de equipes para atuar de forma coordenada diante de emergências. A prática aproxima os participantes dos procedimentos de prevenção, combate inicial e abandono.'],
  ['avante-bombeiros-assembleia-na-conexao-abradit.html', 'Avante Bombeiros na Conexão ABRADIT', '15 dez 2023', 'Registro institucional da participação da Avante na assembleia Conexão ABRADIT.', 'A notícia oficial registra a presença da Avante em uma assembleia da Conexão ABRADIT, ligada ao setor de distribuição de veículos. O encontro fez parte das atividades e conexões institucionais divulgadas pela empresa.'],
  ['avante-bombeiros-participou-na-cobertura-da-recente-convencao-da-rede-de-parceiros-dos-distribuidores-abradit-redit.html', 'Cobertura da convenção ABRADIT/REDIT', '15 dez 2023', 'A Avante registrou sua participação na cobertura de evento da rede de distribuidores.', 'A publicação oficial apresenta a atuação da Avante na cobertura da convenção da Rede de Parceiros dos Distribuidores ABRADIT/REDIT, contexto em que planejamento e prontidão acompanham a operação do evento.'],
];

const nav = `<a href="./index.html">Início</a><a href="./index.html#solucoes">Soluções</a><a href="./treinamentos.html">Treinamentos</a><a href="./blog.html">Blog</a><a href="./index.html#contato">Contato</a>`;
const shell = (title, description, main, image = 'treinamento-enhanced.webp') => `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f3f3ef"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; connect-src 'none'"><title>${esc(title)} | Avante Bombeiros e Serviços</title><meta name="description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)} | Avante Bombeiros e Serviços"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="./images/${image}"><link rel="icon" type="image/png" sizes="any" href="./images/favicon-avante-512.png"><script src="./theme.js"></script><link rel="stylesheet" href="./styles.css"><link rel="stylesheet" href="./inner.css"><link rel="stylesheet" href="./theme.css"><script src="./main.js" defer></script></head><body><a class="skip-link" href="#conteudo">Pular para o conteúdo</a><div class="scroll-progress" aria-hidden="true"></div><header class="site-header" id="topo"><div class="header-inner shell"><a class="brand" href="./index.html" aria-label="Avante Bombeiros e Serviços — início"><img src="./images/avante-logo.png" alt="Avante Bombeiros e Serviços" width="855" height="237"></a><nav class="desktop-nav" aria-label="Navegação principal">${nav}</nav><div class="header-actions"><a class="header-contact" href="./index.html#contato">Solicitar proposta <span aria-hidden="true">↗</span></a><button class="theme-toggle" type="button" aria-label="Ativar tema escuro" aria-pressed="false" title="Ativar tema escuro"><svg viewBox="0 0 24 24" aria-hidden="true"><circle class="theme-sun" cx="12" cy="12" r="4"></circle><path class="theme-sun" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path><path class="theme-moon" d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"></path></svg></button><button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="mobile-menu" aria-expanded="false"><span></span><span></span></button></div></div></header><div class="menu-overlay" id="mobile-menu" aria-hidden="true"><nav class="menu-overlay-nav" aria-label="Menu móvel"><a href="./index.html">Início</a><a href="./index.html#solucoes">Soluções</a><a href="./treinamentos.html">Treinamentos</a><a href="./blog.html">Blog</a><a href="./index.html#contato">Contato</a></nav><div class="menu-overlay-bottom"><span>PREVENÇÃO • PRONTIDÃO • RESPOSTA</span><a href="tel:+551126850301">11 2685-0301</a></div></div><main id="conteudo">${main}</main><footer class="site-footer"><div class="shell footer-top"><img src="./images/avante-logo-footer.png" alt="Avante Bombeiros e Serviços" width="864" height="237" loading="lazy"><p>Segurança em ação.</p></div><div class="shell footer-grid"><div><span class="footer-label">NAVEGAÇÃO</span><a href="./index.html">Início</a><a href="./blog.html">Blog</a><a href="./index.html#contato">Contato</a></div><div><span class="footer-label">SERVIÇOS</span>${services.map(s => `<a href="./${s.slug}">${esc(s.title)}</a>`).join('')}</div><div><span class="footer-label">CONTATO</span><a href="tel:+551126850301">11 2685-0301</a><a href="mailto:contato@avantebombeiros.com">contato@avantebombeiros.com</a><a href="https://wa.me/5511991968530" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div></div><div class="shell footer-bottom"><span>© <span id="year">2026</span> Avante Bombeiros e Serviços</span><a href="#topo">Voltar ao topo ↑</a></div></footer><a class="floating-contact" href="https://wa.me/5511991968530?text=Ol%C3%A1%2C%20gostaria%20de%20conhecer%20as%20solu%C3%A7%C3%B5es%20da%20Avante." target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Avante pelo WhatsApp">Fale com a Avante <span aria-hidden="true">↗</span></a></body></html>`;

for (const service of services) {
  const related = services.filter(item => item !== service).slice(0, 3);
  const coverage = coverageBySlug[service.slug] || [];
  const coverageSection = `<section class="inner-coverage section-pad"><div class="shell"><div class="inner-detail-head"><span class="micro-label">CONTEÚDO COMPLETO</span><h2>Informações da solução, organizadas para consulta.</h2></div><div class="inner-coverage-grid">${coverage.map(([title, items]) => `<article><h3>${esc(title)}</h3><ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul></article>`).join('')}</div></div></section>`;
  const main = `<section class="inner-hero"><img class="inner-hero-image" src="./images/${service.image}" alt="" aria-hidden="true"><div class="inner-hero-overlay" aria-hidden="true"></div><div class="shell inner-hero-content"><p class="inner-breadcrumb"><a href="./index.html">Início</a> / Soluções</p><p class="inner-kicker">${esc(service.eyebrow)}</p><h1>${esc(service.title)}</h1><p>${esc(service.lead)}</p><a class="button button-red" href="./index.html?servico=${encodeURIComponent(service.intent)}#contato">Solicitar proposta <span class="button-icon" aria-hidden="true">↗</span></a></div></section><section class="inner-intro section-pad"><div class="shell inner-intro-grid"><div><span class="micro-label">AVANTE BOMBEIROS E SERVIÇOS</span><h2>Prevenção com propósito.<br><em>Prontidão em cada etapa.</em></h2></div><p>${esc(service.lead)}</p></div></section><section class="inner-detail section-pad"><div class="shell"><div class="inner-detail-head"><span class="micro-label">COMO ATUAMOS</span><h2>Uma solução para a realidade da sua operação.</h2></div><div class="inner-detail-grid">${service.sections.map((s, i) => `<article><span>0${i + 1}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></article>`).join('')}</div></div></section>${coverageSection}<section class="inner-check section-pad"><div class="shell inner-check-grid"><div><span class="micro-label">ESCOPO</span><h2>O que podemos preparar juntos.</h2><p>Converse com a equipe da Avante para definir necessidades, riscos e formato da atuação.</p></div><ul>${service.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul></div></section><section class="inner-related section-pad"><div class="shell"><span class="micro-label">EXPLORE MAIS</span><h2>Outras soluções Avante</h2><div class="inner-related-grid">${related.map(s => `<a href="./${s.slug}"><span>${esc(s.eyebrow)}</span><strong>${esc(s.title)}</strong><b aria-hidden="true">↗</b></a>`).join('')}</div></div></section><section class="inner-cta"><div class="shell"><span class="micro-label">PRÓXIMO PASSO</span><h2>Vamos planejar a segurança do seu espaço?</h2><a class="button button-white" href="./index.html?servico=${encodeURIComponent(service.intent)}#contato">Falar com a Avante <span class="button-icon" aria-hidden="true">↗</span></a></div></section>`;
  const html = shell(service.title, service.lead, main, service.image);
  for (const slug of [service.slug, ...(service.aliases || [])]) await writeFile(join(root, slug), html);
}

const blogCards = articles.map(([slug, title, date, summary], index) => `<article class="blog-card${index === 0 ? ' blog-card--featured' : ''}">${index === 0 ? '<img class="blog-card-image" src="./images/treinamento-enhanced.webp" alt="Treinamento prático de prevenção e segurança" width="1200" height="800" loading="lazy" decoding="async">' : ''}<div class="blog-card-copy"><span class="micro-label">${esc(date)} · ${index === 0 ? 'CAPACITAÇÃO' : 'NOTÍCIAS AVANTE'}</span><h2><a href="./${slug}">${esc(title)}</a></h2><p>${esc(summary)}</p><a class="text-link" href="./${slug}">Ler publicação <span aria-hidden="true">↗</span></a></div></article>`).join('');
await writeFile(join(root, 'blog.html'), shell('Blog', 'Notícias e registros publicados pela Avante Bombeiros e Serviços.', `<section class="inner-title-hero"><div class="shell"><p class="inner-breadcrumb"><a href="./index.html">Início</a> / Blog</p><span class="inner-kicker">NOTÍCIAS E OPERAÇÕES</span><h1>Blog Avante.</h1><p>Registros de treinamentos, operações e encontros publicados pela equipe.</p></div></section><section class="blog-list section-pad"><div class="shell blog-grid">${blogCards}</div></section>`));
for (const [slug, title, date, summary, body] of articles) {
  const main = `<section class="inner-title-hero"><div class="shell"><p class="inner-breadcrumb"><a href="./index.html">Início</a> / <a href="./blog.html">Blog</a></p><span class="inner-kicker">${esc(date)} · NOTÍCIAS AVANTE</span><h1>${esc(title)}</h1></div></section><article class="blog-article section-pad"><div class="shell"><p class="blog-lead">${esc(summary)}</p><p>${esc(body)}</p><p>Explore as soluções da Avante para <a href="./bombeiro-civil-terceirizacao.html">bombeiros civis</a> e <a href="./treinamentos.html">treinamentos</a>.</p><a class="text-link" href="./blog.html">← Voltar ao blog</a></div></article>`;
  await writeFile(join(root, slug), shell(title, summary, main));
}

const aboutMain = `<section class="inner-title-hero"><div class="shell"><p class="inner-breadcrumb"><a href="./index.html">Início</a> / Quem somos</p><span class="inner-kicker">SOBRE A AVANTE</span><h1>Prevenção. Preparo. Resposta.</h1><p>A Avante Bombeiros e Serviços atua com bombeiros civis, treinamentos, prevenção e resposta a emergências.</p></div></section><section class="inner-intro section-pad"><div class="shell inner-intro-grid"><h2>Segurança para pessoas e operações.</h2><p>O portfólio oficial reúne terceirização de bombeiros civis, brigadas, treinamentos, eventos, planos de abandono, apoio ao AVCB/CLCB e orientação socioeducativa. A atuação é desenhada de acordo com cada ambiente e seus riscos.</p></div></section><section class="inner-related section-pad"><div class="shell"><span class="micro-label">SOLUÇÕES</span><h2>Conheça nossas frentes de atuação</h2><div class="inner-related-grid">${services.map(s => `<a href="./${s.slug}"><span>${esc(s.eyebrow)}</span><strong>${esc(s.title)}</strong><b aria-hidden="true">↗</b></a>`).join('')}</div></div></section>`;
await writeFile(join(root, 'quem-somos-experiencia-seguranca-bombeiros.html'), shell('Quem somos', 'Conheça a atuação da Avante Bombeiros e Serviços.', aboutMain));
console.log(`Páginas geradas: ${services.length} serviços, ${articles.length} artigos, blog e quem somos.`);


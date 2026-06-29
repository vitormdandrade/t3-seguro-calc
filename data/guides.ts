export interface GuideSection {
  heading: string;
  body: string; // markdown-ish paragraphs separated by \n\n
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: 'trust' | 'auto' | 'vida' | 'residencial' | 'viagem' | 'geral';
  categoryLabel: string;
  updatedOn: string;
  readingTimeMin: number;
  intro: string;
  sections: GuideSection[];
  keyTakeaways: string[];
  relatedGuides: string[];
}

export const guides: Guide[] = [
  // ─── TRUST SIGNAL GUIDES (Phase 2 priority) ─────────────────────────────
  {
    slug: 'guia-susep',
    title: 'Guia Completo da SUSEP: Como Proteger seus Direitos ao Contratar Seguro',
    description:
      'Entenda o que é a SUSEP, por que ela importa na hora de contratar seguro, como verificar se uma seguradora é regulada e quais são seus direitos como consumidor.',
    category: 'trust',
    categoryLabel: 'Confiança & Regulação',
    updatedOn: '2026-04-11',
    readingTimeMin: 8,
    intro:
      'A SUSEP (Superintendência de Seguros Privados) é o órgão federal que regulamenta e fiscaliza o mercado de seguros privados no Brasil. Antes de contratar qualquer seguro, verificar se a seguradora é registrada na SUSEP é o passo mais importante para garantir que você está protegido — e que, se precisar, terá seus direitos respeitados.',
    sections: [
      {
        heading: 'O que é a SUSEP e por que ela existe',
        body: `A SUSEP foi criada pelo Decreto-Lei nº 73 de 1966 e está vinculada ao Ministério da Fazenda. Sua missão é proteger os consumidores de seguros e garantir a solidez financeira das seguradoras.

Sem regulação, uma seguradora poderia cobrar prêmios por anos e simplesmente fechar as portas quando chegasse a hora de pagar sinistros. A SUSEP exige que as seguradoras mantenham reservas técnicas suficientes para honrar todos os contratos ativos — o chamado "capital mínimo requerido".

Toda seguradora que opera no Brasil legalmente deve ser autorizada pela SUSEP. Vender seguros sem autorização da SUSEP é crime previsto no artigo 16 do Decreto-Lei 73/66.`,
      },
      {
        heading: 'Como verificar se uma seguradora tem registro na SUSEP',
        body: `Verificar é simples e gratuito. Acesse o portal da SUSEP em susep.gov.br e siga os passos:

1. Clique em "Consultas" → "Empresas Supervisionadas"
2. Digite o nome ou CNPJ da seguradora
3. Confirme que o status aparece como "Autorizada a Funcionar"

Se o status for "Em Liquidação Extrajudicial" ou "Cancelada", não contrate. Seguradoras em liquidação podem não ter recursos suficientes para pagar novos sinistros.

Outra forma rápida: pesquise "[nome da seguradora] SUSEP" no Google. Seguradoras legítimas geralmente exibem seu número de registro SUSEP no rodapé do site.`,
      },
      {
        heading: 'O que a SUSEP fiscaliza: coberturas, preços e práticas',
        body: `A SUSEP regula três dimensões principais:

**Solvência financeira:** Toda seguradora deve manter reservas técnicas correspondentes a todos os contratos ativos. Isso garante que o dinheiro para pagar seu sinistro existe.

**Condições gerais dos contratos:** Seguradoras devem depositar na SUSEP os modelos de apólice antes de comercializá-los. Isso evita cláusulas abusivas que você só descobriria na hora do sinistro.

**Práticas comerciais:** A SUSEP pode punir seguradoras que recusam sinistros sem justificativa, atrasam pagamentos ou aplicam carências ilegais.

O que a SUSEP não faz: fixar preços. Os preços dos seguros são livres no Brasil (diferente de planos de saúde, regulados pela ANS). Por isso, comparar cotações é tão importante.`,
      },
      {
        heading: 'Ranking de reclamações: como a SUSEP mede a qualidade das seguradoras',
        body: `A SUSEP divulga semestralmente um ranking de reclamações por seguradora, chamado de "Relatório de Reclamações". Ele mostra o número de reclamações por 100.000 contratos ativos.

**Como interpretar:** Uma seguradora com 5 reclamações por 100k contratos é muito melhor do que uma com 50. Fique atento às seguradoras novas sem histórico — podem ter números baixos simplesmente porque têm poucos clientes.

**Onde consultar:** susep.gov.br → Publicações → Relatórios → "Relatório de Atendimento ao Consumidor". O relatório é atualizado semestralmente.

Além da SUSEP, o Reclame Aqui também é uma fonte valiosa — veja nosso guia sobre isso.`,
      },
      {
        heading: 'Seus direitos como segurado',
        body: `O Código Civil (artigos 757-802) e o Código de Defesa do Consumidor garantem direitos específicos aos segurados:

**Direito à informação:** A seguradora deve entregar a apólice no prazo máximo de 15 dias após a contratação. Cláusulas limitativas de cobertura devem ser redigidas em destaque (Lei 8.078/90, art. 54 §4º).

**Prazo para análise de sinistro:** A SUSEP determina que a seguradora deve se manifestar em até 30 dias após receber toda a documentação. Após aprovado, o pagamento deve ocorrer em até 30 dias.

**Direito à contestação:** Se seu sinistro for negado, você pode contestar formalmente por escrito à seguradora, pelo canal do atendimento ao consumidor da SUSEP (0800-021-8484), pelo Procon ou judicialmente (especialmente viável para valores até R$20.000 nos juizados especiais, sem advogado).

**Portabilidade:** No seguro de vida, você pode migrar para outra seguradora sem perder o benefício de carência já cumprido, desde que mantenha a cobertura contínua.`,
      },
      {
        heading: 'Seguradoras SUSEP-registradas no Brasil (principais)',
        body: `As seguintes seguradoras são SUSEP-autorizadas e atuam no mercado de varejo:

**Grandes grupos:** Porto Seguro, Bradesco Seguros, SulAmérica, Mapfre, Allianz, Tokio Marine, HDI Seguros, Zurich Seguros, Icatu Seguros, Generali.

**Digitais e disruptoras:** Youse (do grupo Caixa Seguradora), Kakau Seguros, Azul Seguros (do grupo Porto), Thinkseg.

**Especializadas:** Seguros Promo (viagem), Azos (vida), Bidu (corretagem digital).

Nossa calculadora utiliza dados apenas de seguradoras SUSEP-registradas. Se receber cotação de empresa não listada na SUSEP, desconfie.`,
      },
    ],
    keyTakeaways: [
      'Toda seguradora legítima deve ter registro ativo na SUSEP — verifique em susep.gov.br antes de contratar',
      'A SUSEP não fixa preços; comparar cotações entre seguradoras é sempre válido',
      'Em caso de sinistro negado, você tem 30 dias de prazo de resposta e pode contestar via SUSEP (0800-021-8484)',
      'O relatório semestral de reclamações da SUSEP é a fonte oficial para comparar reputação de seguradoras',
    ],
    relatedGuides: ['reclame-aqui-seguradoras', 'como-funciona-calculadora', 'como-acionar-seguro'],
  },

  {
    slug: 'reclame-aqui-seguradoras',
    title: 'Reclame Aqui das Seguradoras: Ranking e O Que os Números Significam',
    description:
      'Compare as notas das principais seguradoras no Reclame Aqui. Entenda o que é RA1000, como interpretar os índices e como usar os dados para escolher melhor.',
    category: 'trust',
    categoryLabel: 'Confiança & Regulação',
    updatedOn: '2026-04-11',
    readingTimeMin: 6,
    intro:
      'O Reclame Aqui é a maior plataforma de relacionamento entre consumidores e empresas no Brasil, com mais de 30 milhões de avaliações cadastradas. Para seguros, ele é um dos melhores termômetros de qualidade no atendimento de sinistros — que é exatamente quando você mais precisa que sua seguradora funcione.',
    sections: [
      {
        heading: 'Como funciona o sistema de pontuação do Reclame Aqui',
        body: `O Reclame Aqui calcula uma nota de 0 a 10 para cada empresa com base em quatro critérios:

**1. Índice de resolução (35%):** Percentual de reclamações marcadas como "Resolvido" pelo consumidor. Quanto maior, melhor.

**2. Nota média dada pelos consumidores (35%):** Após resolver (ou não), o consumidor avalia de 1 a 10. É a opinião direta de quem passou pela situação.

**3. Tempo médio de resposta (20%):** Empresas que respondem mais rápido pontuam melhor.

**4. Índice de voltar a fazer negócio (10%):** Percentual de consumidores que afirmam que voltariam a contratar.

A nota final vai de 0 a 10. Empresas com nota ≥ 7 e bom histórico recebem o selo **RA1000** — o maior reconhecimento de qualidade da plataforma.`,
      },
      {
        heading: 'O que é o selo RA1000 e por que importa no seguro',
        body: `O RA1000 é concedido anualmente às empresas que combinam alto volume de reclamações respondidas (mínimo 1.000 no período), alta taxa de resolução (acima de 70%) e nota média acima de 7.

No setor de seguros, o RA1000 é especialmente relevante porque os principais motivos de reclamação são: negativa de sinistro, demora no pagamento e problemas de atendimento — exatamente as situações críticas de um seguro.

Uma seguradora pode ter preço mais alto e ainda assim ser melhor escolha se tiver RA1000, porque a probabilidade de você ter seu sinistro pago sem burocracia excessiva é significativamente maior.`,
      },
      {
        heading: 'Principais reclamações contra seguradoras no Brasil',
        body: `Analisando os dados históricos do Reclame Aqui para o setor de seguros, os 5 tópicos mais reclamados são:

**1. Negativa de sinistro sem justificativa clara (28%):** O mais comum. A seguradora nega o sinistro com base em cláusula de exclusão que o consumidor não sabia que existia.

**2. Demora no atendimento de sinistro (22%):** Especialmente para seguro residencial e auto. O prazo legal é 30 dias, mas reclamações apontam atrasos de meses.

**3. Cancelamento indevido de apólice (15%):** Seguro cancelado automaticamente após atraso de um boleto, sem notificação adequada.

**4. Dificuldade para cancelar e reembolso de prêmio (13%):** Cancelar o seguro antes do vencimento e receber de volta o prêmio proporcional pode ser trabalhoso.

**5. Atendimento da assistência 24h (12%):** Guincho que não aparece, reboque com prazo excessivo, prestadores de assistência sem qualidade.

Saber os padrões de reclamação por seguradora ajuda a fazer perguntas certas antes de contratar: "Qual é o SLA de análise de sinistro? Como cancelo se precisar?"`,
      },
      {
        heading: 'Como usar o Reclame Aqui para pesquisar uma seguradora',
        body: `Antes de contratar, siga este processo de 5 minutos:

1. **Acesse reclameaqui.com.br** e busque pelo nome da seguradora.

2. **Filtre por "Seguro"** na categoria de produto (evite ver reclamações sobre cartão de crédito se estiver avaliando o seguro auto).

3. **Leia as reclamações de Não Resolvido.** São mais reveladoras do que as resolvidas — mostram o comportamento da seguradora quando as coisas dão errado.

4. **Verifique a data das reclamações.** Seguradoras que tiveram problemas em 2022 mas resolveram em 2024 são diferentes de seguradoras com problemas recentes.

5. **Compare com o concorrente.** Uma nota 7.2 pode ser ruim se o concorrente tem 8.9. Sempre compare no setor, não em absoluto.`,
      },
      {
        heading: 'O Reclame Aqui substitui a verificação na SUSEP?',
        body: `Não — eles medem coisas diferentes e são complementares.

A **SUSEP** verifica legalidade e solvência financeira. Uma seguradora pode estar perfeitamente legal na SUSEP e ter péssima nota no Reclame Aqui (honra os contratos mas com muita burocracia).

O **Reclame Aqui** mede experiência do consumidor no atendimento. Uma nota alta no Reclame Aqui sem verificação na SUSEP ainda pode ser uma empresa irregular.

Use os dois: SUSEP confirma que a empresa pode pagar. Reclame Aqui indica se ela tende a pagar bem.`,
      },
    ],
    keyTakeaways: [
      'O selo RA1000 indica seguradora com alta taxa de resolução (>70%) e nota média acima de 7 — priorize ao comparar',
      'Leia especificamente as reclamações "Não Resolvido" — elas revelam o comportamento no pior cenário',
      'Filtre as reclamações pela categoria "Seguro" para não misturar com outros produtos da empresa',
      'Combine a verificação no Reclame Aqui com a consulta de registro na SUSEP para uma decisão completa',
    ],
    relatedGuides: ['guia-susep', 'como-funciona-calculadora', 'como-acionar-seguro'],
  },

  {
    slug: 'como-funciona-calculadora',
    title: 'Como Funciona Nossa Calculadora de Seguros: Metodologia e Fatores de Preço',
    description:
      'Entenda como calculamos as estimativas de seguro, quais fatores usamos, de onde vêm os índices regionais e o que o resultado da calculadora significa na prática.',
    category: 'trust',
    categoryLabel: 'Confiança & Regulação',
    updatedOn: '2026-04-11',
    readingTimeMin: 5,
    intro:
      'Nossa calculadora fornece estimativas de preço baseadas em dados agregados do mercado brasileiro de seguros. Esta página explica exatamente como chegamos aos números — porque acreditamos que transparência é a base da confiança.',
    sections: [
      {
        heading: 'O que nossa calculadora faz (e o que não faz)',
        body: `**O que fazemos:** Calculamos uma faixa de preço estimada com base no seu perfil e nos padrões históricos do mercado. O resultado é uma referência confiável para saber se uma cotação real está dentro do esperado ou se está muito acima (sinal de alerta).

**O que não fazemos:** Nossa calculadora não emite apólices nem cotações vinculantes. Para contratar, você precisa solicitar uma cotação oficial à seguradora — que coletará dados mais detalhados e poderá confirmar (ou ajustar) o preço.

Pense na nossa calculadora como um benchmark: ela mostra o território antes de você entrar em negociação.`,
      },
      {
        heading: 'Fatores que usamos para calcular seguro auto',
        body: `Para seguro auto, utilizamos seis variáveis principais:

**1. Marca e modelo do veículo:** Modelos mais roubados ou mais caros para consertar têm prêmios mais altos. Usamos dados de furto e valores de peças da tabela FIPE e do DPVAT.

**2. Ano do veículo:** Veículos mais novos têm maior valor de mercado e, portanto, custo de indenização maior. Após 15 anos, muitas seguradoras aplicam descontos por menor demanda de cobertura.

**3. Estado de registro (UF):** Cada estado tem um índice de risco baseado em: taxa de roubo de veículos (dados SINESP), densidade de tráfego e histórico de sinistros regionais. São Paulo, Rio de Janeiro e Pernambuco têm os maiores índices.

**4. Idade do motorista principal:** Motoristas com menos de 25 anos pagam entre 20% e 40% a mais. Acima de 60 anos, alguns perfis têm desconto por menor frequência de uso.

**5. Garagem coberta no pernoite:** Veículos guardados em garagem têm risco de roubo significativamente menor. Seguradoras aplicam desconto médio de 10–15%.

**6. Tipo de cobertura (compreensiva vs. terceiros):** Cobertura compreensiva inclui roubo e danos próprios. Terceiros cobre apenas danos causados a outras pessoas e veículos.`,
      },
      {
        heading: 'De onde vêm os índices regionais por estado',
        body: `Os índices regionais que utilizamos por estado (visíveis nas páginas /estado/[uf]) foram derivados de três fontes públicas:

**1. SINESP PatriaCidadã (secretaria.sinesp.gov.br):** Banco de dados nacional de ocorrências policiais. Usamos os registros de "Roubo de Veículo" e "Furto de Veículo" por estado, normalizados por frota registrada no DENATRAN.

**2. Relatórios de sinistros da SUSEP:** A SUSEP divulga anualmente o "Relatório Estatístico de Sinistros" com frequência de sinistros por estado e tipo de seguro.

**3. IBGE — PNAD e dados demográficos:** Densidade populacional e renda média afetam o valor de mercado de imóveis e veículos segurados.

Os índices são atualizados anualmente. O índice 1.0 representa a média nacional — estados acima de 1.0 são mais caros, abaixo são mais baratos.`,
      },
      {
        heading: 'Por que nossa estimativa pode diferir da cotação real',
        body: `Algumas diferenças são esperadas e normais:

**Fatores que não coletamos:** CEP de pernoite específico (não apenas UF), histórico de sinistros do motorista, uso comercial ou particular do veículo, upgrades ou modificações no veículo.

**Variação entre seguradoras:** Cada seguradora usa seu próprio modelo de precificação. Uma pode pesar mais a idade do motorista; outra, o modelo do veículo. Nossa estimativa usa médias de mercado.

**Sazonalidade:** Preços podem subir em dezembro/janeiro (período de maior movimento de veículos) e cair em março/abril. Nossa calculadora usa preços médios anuais.

**Regra de ouro:** Se a cotação real vier mais de 25% acima da nossa estimativa sem justificativa clara, peça outra cotação. Se vier 25% abaixo, verifique se as coberturas são as mesmas.`,
      },
      {
        heading: 'Nossa política de afiliados e como ela não afeta o cálculo',
        body: `Somos transparentes sobre como geramos receita: quando você clica em um link de seguradora e contrata, podemos receber uma comissão de afiliado (percentual do prêmio anual, geralmente entre 3% e 8%).

**Isso não afeta o ranking ou o cálculo:** As seguradoras não pagam para aparecer em posição mais favorável. A ordem de apresentação é baseada em nota no Reclame Aqui e dados de satisfação do consumidor — não em comissões.

Se uma seguradora tem comissão maior mas nota pior, ela não sobe no ranking. Nosso interesse de longo prazo é que você faça uma boa contratação e volte ao site — não que você contrate a opção mais rentável para nós.

Em caso de dúvidas sobre nossa metodologia, entre em contato.`,
      },
    ],
    keyTakeaways: [
      'Nossa calculadora fornece estimativas de mercado — não cotações vinculantes. Use como benchmark para avaliar cotações reais.',
      'Os índices regionais por estado são derivados de dados públicos: SINESP (furtos), SUSEP (sinistros) e IBGE (demografia)',
      'Se uma cotação real vier mais de 25% acima da estimativa sem justificativa, solicite uma segunda cotação',
      'Comissões de afiliados não afetam o ranking das seguradoras — a ordem é baseada em Reclame Aqui e dados SUSEP',
    ],
    relatedGuides: ['guia-susep', 'reclame-aqui-seguradoras', 'seguro-auto-terceiros-vs-completo'],
  },

  // ─── EXISTING GUIDES (stubbed — full content renders placeholder) ────────
  {
    slug: 'seguro-auto-obrigatorio-brasil',
    title: 'Seguro Auto Obrigatório no Brasil: DPVAT, RCFM e o Que Você Precisa Saber',
    description:
      'Entenda quais seguros são obrigatórios para veículos no Brasil, o que cobre o DPVAT, como funciona o RCFM e as penalidades por circular sem cobertura.',
    category: 'auto',
    categoryLabel: 'Seguro Auto',
    updatedOn: '2026-04-11',
    readingTimeMin: 5,
    intro:
      'No Brasil, circular com veículo automotor sem o seguro obrigatório é infração. O DPVAT (Danos Pessoais Causados por Veículos Automotores de Via Terrestre) e o RCFM formam a base mínima de proteção exigida por lei — mas muitos motoristas ainda não sabem exatamente o que cada um cobre.',
    sections: [
      {
        heading: 'O que é o DPVAT e para que serve',
        body: `O DPVAT é um seguro obrigatório criado pela Lei 6.194/74 com objetivo social: indenizar vítimas de acidentes de trânsito, independentemente de quem causou o acidente. Ele cobre pedestres, passageiros e motoristas em caso de morte ou invalidez decorrente de acidente.

**Cobertura máxima:** Morte: R$13.500 | Invalidez permanente: até R$13.500 | Despesas médicas: até R$2.700.

**Importante:** O DPVAT não cobre danos materiais ao veículo. Para isso, é necessário o seguro voluntário.

Em 2020, o DPVAT foi temporariamente suspenso por decreto presidencial. Em 2023, o Congresso aprovou sua reativação, mas as condições e valores podem ter sido ajustados. Verifique o status atual no site da SUSEP.`,
      },
      {
        heading: 'RCFM: responsabilidade civil facultativa de motorista',
        body: `O RCFM (Responsabilidade Civil Facultativa de Motorista) é tecnicamente facultativo, mas contratado na prática por qualquer seguro auto completo ou básico. Ele cobre danos que você causa a terceiros (pessoas e veículos) em um acidente onde você é o responsável.

Sem RCFM, se você bater em outro veículo e causar R$30.000 em danos, você paga do próprio bolso. Com RCFM, a seguradora paga até o limite contratado.

Os limites mais comuns no mercado são R$50.000, R$100.000 e R$200.000 em danos a terceiros. Para veículos em vias de grande movimento, recomenda-se no mínimo R$100.000.`,
      },
      {
        heading: 'Seguro completo vs. terceiros: o que cada um inclui',
        body: `**Seguro Terceiros (mais básico):**
- RCFM (danos que você causa a outros) ✓
- Assistência 24h ✓
- Cobre danos ao seu veículo por colisão? ✗
- Cobre roubo/furto? ✗

**Seguro Completo (compreensivo):**
- Tudo do seguro terceiros ✓
- Colisão e capotamento ✓
- Roubo e furto total ou parcial ✓
- Danos por fenômenos naturais (enchentes, granizo) ✓
- Vidros e retrovisores ✓

O seguro completo custa em média 2x o seguro terceiros. Para veículos acima de R$40.000, o custo-benefício do completo geralmente é positivo.`,
      },
      {
        heading: 'Penalidades por circular sem seguro',
        body: `Circular sem o DPVAT (quando obrigatório) é infração de trânsito prevista no Código de Trânsito Brasileiro:

- **Multa:** 5 UFIRs (valor atualizado anualmente pelo IBGE)
- **Pontuação na CNH:** 5 pontos
- **Retenção do veículo:** Possível até pagamento

Além da infração, se você causar um acidente sem seguro, arca com todos os danos materiais e físicos do próprio bolso — o que pode incluir indenizações milionárias em casos de morte ou invalidez permanente de terceiros.`,
      },
    ],
    keyTakeaways: [
      'O DPVAT cobre vítimas de acidentes de trânsito (morte/invalidez) independente de culpa — mas não cobre seu veículo',
      'O RCFM cobre danos que você causa a terceiros — essencial em qualquer seguro auto, mesmo o mais básico',
      'Seguro completo inclui roubo/furto e danos ao seu próprio veículo; seguro terceiros não',
      'Circular sem DPVAT (quando exigido) gera multa + 5 pontos na CNH',
    ],
    relatedGuides: ['seguro-auto-terceiros-vs-completo', 'franquia-seguro-auto', 'como-funciona-calculadora'],
  },

  {
    slug: 'como-acionar-seguro',
    title: 'Como Acionar o Seguro: Guia Passo a Passo para Abrir um Sinistro',
    description:
      'Do acidente ao pagamento: veja como acionar seu seguro corretamente, quais documentos reunir, prazos importantes e como evitar que seu sinistro seja negado.',
    category: 'geral',
    categoryLabel: 'Geral',
    updatedOn: '2026-04-11',
    readingTimeMin: 6,
    intro:
      'Saber como acionar o seguro corretamente pode fazer a diferença entre receber a indenização em 2 semanas ou entrar em um processo de meses. A maioria dos sinistros negados poderia ter sido aprovada se o segurado soubesse o protocolo certo desde o início.',
    sections: [
      {
        heading: 'O que fazer imediatamente após o sinistro',
        body: `As primeiras ações determinam o andamento do processo. Siga esta sequência:

**1. Registre o Boletim de Ocorrência (BO):** Para roubo, furto, acidentes com outros veículos ou vítimas, o BO é quase sempre obrigatório. Pode ser feito online na delegacia virtual do seu estado. Guarde o número do protocolo.

**2. Fotografe tudo:** Danos ao veículo, ao local do acidente, ao outro veículo envolvido, à sinalização viária. Fotografias com geolocalização e horário são provas fortes.

**3. Colete dados do outro condutor:** Nome, CPF, CNH, placa, seguradora. Se houver testemunhas, anote o nome e telefone.

**4. Não mova o veículo sem documentar:** Em acidentes com vítimas, mover o veículo antes da autorização policial pode ser crime.

**5. Acione a central 24h da seguradora:** A maioria das apólices exige comunicação do sinistro em até 72 horas. Quanto mais rápido, melhor.`,
      },
      {
        heading: 'Documentos necessários para abertura do sinistro',
        body: `A lista varia conforme o tipo de sinistro, mas geralmente inclui:

**Para todos os tipos:**
- Número da apólice
- CPF e RG do segurado
- Boletim de Ocorrência (número do protocolo)
- Fotos do dano

**Adicionalmente para sinistro de veículo:**
- CRLV do veículo
- CNH do condutor na data do sinistro
- Laudo do guincho ou oficina (se aplicável)

**Para seguro residencial:**
- Nota fiscal dos bens danificados ou roubados (quando disponível)
- Laudo do bombeiro (para incêndios)
- Fotos dos danos

**Para seguro de vida:**
- Certidão de óbito (em caso de morte)
- Laudo médico detalhando a causa (para invalidez)
- Documentos dos beneficiários

Evite enviar documentos incompletos — a seguradora pode suspender o prazo de análise enquanto aguarda complementação.`,
      },
      {
        heading: 'Prazos legais que a seguradora deve cumprir',
        body: `A SUSEP e o Código Civil estabelecem prazos que a seguradora é obrigada a respeitar:

**Análise do sinistro:** Máximo de 30 dias após receber toda a documentação. Se a seguradora solicitar mais documentos, o prazo recomeça do zero — por isso envie tudo de uma vez.

**Pagamento:** Após aprovação do sinistro, a seguradora tem 30 dias para efetuar o pagamento.

**Resposta a contestações:** Se você contestar uma negativa, a seguradora deve responder em até 10 dias úteis.

Se esses prazos não forem respeitados, você pode acionar o SAC da seguradora, a ouvidoria, a SUSEP (0800-021-8484) e, em último caso, o Procon ou a Justiça.`,
      },
      {
        heading: 'Por que sinistros são negados e como evitar',
        body: `Os motivos mais comuns para negativa são evitáveis:

**1. Cobertura não contratada:** Motorista contratou "terceiros" e espera cobertura de roubo. Verifique sua apólice antes que aconteça o sinistro.

**2. Condutor não incluído:** Muitos planos cobrem apenas condutores registrados. Se um familiar dirigia, verifique se está incluído.

**3. Uso comercial sem cobertura:** Usar o veículo para Uber/99 sem informar à seguradora pode invalidar a apólice. Existe cobertura específica para motoristas de aplicativo.

**4. Dados incorretos no cadastro:** CEP de pernoite errado, garagem declarada mas não existente, ano do carro incorreto.

**5. Comunicação fora do prazo:** Aguardar semanas para comunicar o sinistro pode ser interpretado como irregularidade.

A melhor prevenção é ler a apólice inteira quando contratar, com foco nas "exclusões de cobertura".`,
      },
    ],
    keyTakeaways: [
      'Registre o BO imediatamente — é obrigatório para roubo, furto e acidentes com terceiros',
      'Envie toda a documentação de uma vez: a seguradora pode pausar o prazo de 30 dias enquanto aguarda complementação',
      'Motoristas de aplicativo precisam de cobertura específica — seguro comum pode ser invalidado',
      'Se o sinistro for negado indevidamente, acione a SUSEP (0800-021-8484) antes de ir à Justiça',
    ],
    relatedGuides: ['guia-susep', 'reclame-aqui-seguradoras', 'documentos-necessarios-seguro'],
  },

  {
    slug: 'seguro-vida-autonomo',
    title: 'Seguro de Vida para Autônomos e MEIs: Guia Completo 2026',
    description:
      'Autônomo ou MEI não tem FGTS, licença remunerada nem seguro coletivo. Saiba como estruturar proteção financeira com seguro de vida e acidentes pessoais.',
    category: 'vida',
    categoryLabel: 'Seguro Vida',
    updatedOn: '2026-04-11',
    readingTimeMin: 7,
    intro:
      'Quem é autônomo ou MEI carrega um risco que funcionários CLT não têm: se ficar incapacitado — temporária ou permanentemente — não há INSS suficiente, não há licença médica remunerada, e os gastos continuam. O seguro de vida e acidentes pessoais é o principal instrumento de proteção patrimonial para esse perfil.',
    sections: [
      {
        heading: 'Os riscos específicos de autônomos que o seguro endereça',
        body: `Autônomos e MEIs enfrentam três vulnerabilidades que o regime CLT mitiga automaticamente:

**Renda zero por incapacidade temporária:** Um pedreiro que quebra o braço, um designer que desenvolve tendinite, um motorista que sofre acidente — todos param de ganhar imediatamente. O INSS pago pelo MEI (5% do salário mínimo) dá direito a auxílio-doença, mas com carência de 12 meses e teto de 1 salário mínimo.

**Dependentes sem proteção:** Se o autônomo é o provedor principal e morre, os dependentes ficam sem renda. Sem FGTS para sacar, sem seguro de vida coletivo.

**Dívidas do negócio:** MEIs costumam misturar finanças pessoais e empresariais. Uma dívida de equipamento ou matéria-prima pode comprometer o patrimônio familiar em caso de morte.`,
      },
      {
        heading: 'Tipos de seguro recomendados para autônomos',
        body: `**Seguro de Vida com Cobertura por Invalidez:** A cobertura mais importante. Em caso de invalidez permanente total (ex: perda de dois membros, cegueira total), paga 100% do capital segurado. Invalidez parcial paga proporcionalmente.

**Acidentes Pessoais (AP):** Mais barato que o seguro de vida tradicional. Cobre exclusivamente morte acidental e invalidez por acidente — não cobre doenças. Ideal para profissões com alto risco físico (pedreiro, eletricista, motorista).

**Diária por Incapacidade Temporária (DIT):** Paga um valor diário durante o período de afastamento por acidente. Ajuda a cobrir despesas fixas enquanto o autônomo não pode trabalhar.

**Seguro de Vida com cobertura de Doenças Graves:** Para autônomos com histórico familiar de câncer, AVC ou infarto, este adicional paga uma indenização em vida ao diagnóstico, permitindo tratamento sem comprometer o caixa.`,
      },
      {
        heading: 'Quanto de capital segurado um autônomo precisa',
        body: `Uma regra simples: calcule o capital segurado como 5 a 10 vezes a renda mensal bruta, ou o suficiente para cobrir as dívidas existentes mais 3 anos de despesas familiares — o que for maior.

**Exemplo prático:** Autônomo com renda de R$6.000/mês, 2 dependentes e dívida de R$30.000 em equipamentos.
- 5x renda = R$30.000 (mínimo)
- 3 anos de despesas familiares = R$6.000 × 36 = R$216.000
- Dívidas = R$30.000
- **Capital sugerido: R$216.000 + R$30.000 = R$246.000**

Um seguro de vida com R$250.000 de cobertura para morte natural custa entre R$50 e R$120/mês dependendo da idade e estado de saúde — menos de 2% da renda mensal.`,
      },
      {
        heading: 'Declaração de saúde: como responder corretamente',
        body: `A declaração de saúde é o ponto onde mais segurados cometem erros que invalidam a apólice na hora do sinistro.

**Declare tudo que você sabe:** Doenças preexistentes, cirurgias, medicamentos contínuos, histórico familiar de doenças genéticas. A seguradora pode aceitar com exclusão de coberturas relacionadas — mas isso é muito melhor do que ter o sinistro negado por omissão.

**"Não sabia" não é argumento:** Se você não fez exames há anos e a seguradora descobrir um problema preexistente não declarado, o sinistro pode ser negado mesmo que você genuinamente não soubesse.

**Exame médico:** Para capitais acima de R$500.000 (em muitas seguradoras), é obrigatório exame médico. Abaixo disso, a declaração de saúde é suficiente — mas deve ser honesta.`,
      },
    ],
    keyTakeaways: [
      'O auxílio-doença do INSS para MEI tem carência de 12 meses e teto de 1 salário mínimo — insuficiente para a maioria',
      'Capital sugerido: 5–10x a renda mensal, ou dívidas + 3 anos de despesas familiares (o maior dos dois)',
      'Declare corretamente as condições de saúde — omissão pode invalidar o sinistro na hora que você mais precisa',
      'Diária por Incapacidade Temporária (DIT) é o complemento ideal: paga enquanto você está afastado por acidente',
    ],
    relatedGuides: ['guia-susep', 'como-acionar-seguro', 'como-funciona-calculadora'],
  },

  {
    slug: 'franquia-seguro-auto',
    title: 'Franquia em Seguro Auto: O Que É, Tipos e Como Afeta o Preço',
    description:
      'Entenda o que é franquia, a diferença entre franquia reduzida e normal, quando vale pagar mais pela franquia menor e como negociar com a seguradora.',
    category: 'auto',
    categoryLabel: 'Seguro Auto',
    updatedOn: '2026-04-11',
    readingTimeMin: 5,
    intro:
      'A franquia é um dos termos mais mal compreendidos do seguro auto. Muita gente acha que "franquia menor é sempre melhor" — mas não é assim. Entender a lógica da franquia pode economizar centenas de reais por ano no prêmio sem comprometer a proteção.',
    sections: [
      {
        heading: 'O que é franquia e por que existe',
        body: `Franquia é o valor que o segurado paga em caso de sinistro antes de a seguradora cobrir o restante. Se a franquia é R$2.000 e o conserto custa R$8.000, você paga R$2.000 e a seguradora paga R$6.000.

A lógica econômica é simples: quando o segurado arca com parte do custo, ele fica mais cuidadoso (moral hazard). A seguradora distribui esse incentivo em forma de prêmio menor para quem aceita franquia mais alta.

Franquias existem para danos parciais (colisões). Roubo total, perda total e danos de terceiros geralmente não têm franquia (ou ela é mínima) — verifique sua apólice.`,
      },
      {
        heading: 'Tipos de franquia: normal, reduzida e franquia zero',
        body: `**Franquia normal (padrão):** É a franquia mínima definida pela Circular SUSEP aplicável ao modelo do veículo. Varia entre R$1.200 e R$3.500 dependendo do carro. O prêmio é mais baixo porque você assume mais risco.

**Franquia reduzida:** Você paga mais no prêmio mensal em troca de uma franquia menor na hora do sinistro. Comum em apólices "premium". A redução típica é de 50% da franquia normal.

**Sem franquia (franquia zero):** Você não paga nada no sinistro, mas o prêmio aumenta significativamente. Faz sentido para quem tem sinistros frequentes ou veículo de alto valor.

**Franquia majorada:** Você escolhe uma franquia maior que o padrão em troca de desconto no prêmio. Boa opção para motoristas experientes com histórico limpo e carro de valor médio.`,
      },
      {
        heading: 'Como calcular se a franquia reduzida vale a pena',
        body: `Faça o cálculo do ponto de equilíbrio:

**Exemplo:**
- Prêmio anual com franquia normal (R$2.000): R$2.400/ano
- Prêmio anual com franquia reduzida (R$1.000): R$2.700/ano
- Diferença de prêmio: R$300/ano
- Diferença de franquia: R$1.000

Se você tiver 1 sinistro a cada 3,3 anos, a franquia reduzida começa a compensar (R$300/ano × 3,3 anos = R$990 ≈ R$1.000 de economia na franquia).

Para a maioria dos motoristas que acionam o seguro menos de 1 vez por ano, a franquia normal com prêmio menor é mais eficiente. Para motoristas que acionam frequentemente ou que vivem em áreas de alto tráfego, a franquia reduzida pode compensar.`,
      },
    ],
    keyTakeaways: [
      'Franquia é o valor que você paga antes da seguradora cobrir o restante — quanto maior a franquia, menor o prêmio',
      'Franquia reduzida compensa se você acionar o seguro mais de 1x a cada 3–4 anos — calcule seu ponto de equilíbrio',
      'Roubo total geralmente não tem franquia — verifique sua apólice, não assuma',
      'Franquia majorada + prêmio menor é boa opção para motoristas experientes com histórico de sinistros limpo',
    ],
    relatedGuides: ['seguro-auto-terceiros-vs-completo', 'como-acionar-seguro', 'guia-susep'],
  },

  {
    slug: 'seguro-auto-terceiros-vs-completo',
    title: 'Seguro Terceiros vs. Completo: Qual Vale Mais a Pena em 2026?',
    description:
      'Compare coberturas, preços e perfis ideais para seguro auto terceiros e completo. Saiba quando cada um compensa e o que o mercado recomenda para cada tipo de veículo.',
    category: 'auto',
    categoryLabel: 'Seguro Auto',
    updatedOn: '2026-04-11',
    readingTimeMin: 6,
    intro:
      'A escolha entre seguro terceiros e seguro completo é uma das decisões mais frequentes na hora de contratar. A resposta certa depende do valor do seu veículo, do seu perfil como motorista e do quanto você pode absorver financeiramente em caso de perda total.',
    sections: [
      {
        heading: 'O que cada modalidade cobre',
        body: `**Seguro Terceiros (Responsabilidade Civil):**
Cobre exclusivamente danos que você causa a outras pessoas, veículos e propriedades. Se você bater em outro carro, a seguradora paga pelos danos ao outro — mas nada do seu veículo.

Inclui: danos materiais a terceiros, danos corporais a terceiros (quando há vítimas), assistência 24h básica.
Não inclui: danos ao seu veículo, roubo, furto, fenômenos naturais.

**Seguro Completo (Compreensivo):**
Cobre danos próprios e de terceiros. É o mais amplo disponível no mercado de varejo.

Inclui: colisão e capotamento, roubo e furto total ou parcial, danos a terceiros, fenômenos naturais (enchentes, granizo, vendaval), vidros e retrovisores, assistência 24h completa.`,
      },
      {
        heading: 'Quando o seguro terceiros é suficiente',
        body: `O seguro terceiros faz sentido quando:

**O veículo tem mais de 10 anos:** Veículos antigos têm valor de mercado baixo. O custo do seguro completo pode representar 15–25% do valor do carro ao ano — economicamente ineficiente.

**O veículo está financiado parcialmente quitado:** Se restam poucas parcelas e o valor do carro é baixo, o custo-benefício do completo diminui.

**O motorista tem reserva financeira:** Se você pode absorver uma perda parcial sem comprometer suas finanças, assumir o risco de danos próprios pode ser uma decisão válida.

**Atenção:** Mesmo com seguro terceiros, você precisa de cobertura adequada de responsabilidade civil. O mínimo recomendado é R$100.000 em danos materiais a terceiros. Acidentes graves podem gerar indenizações muito maiores.`,
      },
      {
        heading: 'Quando o seguro completo é necessário',
        body: `O seguro completo é recomendado quando:

**O veículo tem alto valor de mercado (acima de R$40.000):** O risco de perda total justifica o prêmio mais alto.

**Veículo financiado:** A maioria dos contratos de financiamento exige seguro completo. A instituição financeira tem interesse no veículo até o pagamento total.

**Motorista com menos de 25 anos:** Perfil de maior risco — a diferença de preço entre terceiros e completo é proporcionalmente menor porque o prêmio terceiros já é alto.

**Áreas de alto risco de roubo:** Se o veículo pernoita em área com alto índice de furtos (consulte o índice do seu estado em /estado/[uf]/seguro-auto), o completo se paga com um único sinistro evitado.`,
      },
      {
        heading: 'Tabela comparativa de preços médios em 2026',
        body: `Estimativas para veículo popular (Ônix, HB20, Polo) com perfil de motorista padrão (30 anos, garagem, sem sinistros):

| Modalidade | Preço médio SP | Preço médio MG | Preço médio RS |
|---|---|---|---|
| Terceiros (R$100k) | R$110/mês | R$85/mês | R$95/mês |
| Completo (básico) | R$250/mês | R$190/mês | R$215/mês |
| Completo (premium) | R$320/mês | R$250/mês | R$280/mês |

Use nossa calculadora com seu perfil específico para uma estimativa personalizada.`,
      },
    ],
    keyTakeaways: [
      'Veículos acima de R$40.000 ou financiados: seguro completo é recomendado',
      'Veículos com mais de 10 anos: seguro terceiros geralmente é economicamente mais eficiente',
      'Mesmo no seguro terceiros, contrate pelo menos R$100.000 em cobertura de responsabilidade civil',
      'Motoristas jovens (< 25 anos) pagam prêmio alto em ambas as modalidades — compare as duas antes de decidir',
    ],
    relatedGuides: ['franquia-seguro-auto', 'como-acionar-seguro', 'guia-susep'],
  },

  {
    slug: 'documentos-necessarios-seguro',
    title: 'Documentos Necessários para Contratar Seguro: Lista Completa por Tipo',
    description:
      'Saiba quais documentos você precisa para contratar seguro auto, vida, residencial e viagem. Evite atrasos na emissão da apólice com esta lista prática.',
    category: 'geral',
    categoryLabel: 'Geral',
    updatedOn: '2026-04-11',
    readingTimeMin: 4,
    intro:
      'Ter os documentos certos na hora de contratar o seguro evita atrasos na emissão da apólice e garante que os dados sejam preenchidos corretamente — erros no cadastro são a segunda causa mais comum de negativa de sinistro.',
    sections: [
      {
        heading: 'Documentos para seguro auto',
        body: `**Documentos pessoais:**
- CPF e RG do titular
- CNH válida (categoria adequada ao veículo)
- Comprovante de residência (últimos 3 meses)

**Documentos do veículo:**
- CRLV (Certificado de Registro e Licenciamento do Veículo) — aceito digital
- Número do chassi e placa
- Quilometragem atual (em algumas seguradoras)

**Informações adicionais que você precisará saber:**
- CEP de pernoite do veículo (onde o carro dorme)
- Se possui garagem coberta no endereço de pernoite
- Condutores habituais (nome, idade, CNH de cada um)
- Uso do veículo: particular, trabalho, comercial`,
      },
      {
        heading: 'Documentos para seguro de vida',
        body: `**Documentos do segurado:**
- CPF e RG
- Comprovante de renda (para alguns produtos de alto valor)
- Declaração de saúde preenchida honestamente

**Dados dos beneficiários:**
- Nome completo, CPF e data de nascimento de cada beneficiário
- Percentual de cada beneficiário (deve somar 100%)

**Para capitais acima de R$500.000:**
- Exame médico (geralmente agendado pela seguradora)
- Alguns produtos exigem declaração de imposto de renda

**Dica:** Revise os beneficiários a cada mudança de estado civil — divórcio, casamento ou nascimento de filhos exigem atualização.`,
      },
      {
        heading: 'Documentos para seguro residencial',
        body: `**Documentos pessoais:**
- CPF e RG do titular
- Comprovante de residência do imóvel a ser segurado

**Informações do imóvel:**
- Endereço completo com CEP
- Tipo do imóvel: casa, apartamento, condomínio
- Ano de construção (aproximado)
- Valor de reconstrução (diferente do valor de mercado — é o custo de reconstruir do zero)
- Se possui alarme ou câmeras de segurança (pode gerar desconto)

**Lista de bens a segurar (quando incluída a cobertura de conteúdo):**
- Eletrodomésticos e eletrônicos (modelo e valor aproximado)
- Joias e obras de arte (exigem avaliação separada em muitos contratos)`,
      },
      {
        heading: 'Documentos para seguro viagem',
        body: `**Documentos pessoais:**
- CPF e passaporte (para viagens internacionais)
- Data de nascimento de todos os viajantes

**Informações da viagem:**
- Destino(s) — países ou cidades
- Data de embarque e retorno
- Tipo de viagem: lazer, negócios, aventura/esportes

**Para viagens com atividades de risco (escalada, mergulho, esportes de neve):**
Informe à seguradora antes de contratar — atividades não declaradas podem ser excluídas da cobertura médica.

**Para o Visto Schengen (Europa):**
A apólice deve comprovar cobertura mínima de €30.000 para despesas médicas e repatriação. Exija este certificado da seguradora.`,
      },
    ],
    keyTakeaways: [
      'CEP de pernoite (auto) e valor de reconstrução (residencial) são os dados mais frequentemente errados — verifique antes de assinar',
      'Beneficiários do seguro de vida precisam de CPF — providencie antes da contratação',
      'Para o Visto Schengen, exija comprovante de cobertura mínima de €30.000',
      'Atividades de aventura em seguro viagem devem ser declaradas antes — não depois do acidente',
    ],
    relatedGuides: ['como-acionar-seguro', 'guia-susep', 'seguro-vida-autonomo'],
  },

  {
    slug: 'bonus-seguro-auto',
    title: 'Bônus de Seguro Auto: Como Funciona, Classes e Como Não Perder',
    description:
      'Entenda o sistema de classes de bônus do seguro auto no Brasil. Saiba como acumular desconto, evitar a perda do bônus e o que acontece na troca de seguradora.',
    category: 'auto',
    categoryLabel: 'Seguro Auto',
    updatedOn: '2026-06-29',
    readingTimeMin: 6,
    intro:
      'O bônus de seguro auto é o maior fator de desconto no prêmio — pode reduzir seu seguro em até 60%. Mas perder o bônus por um sinistro bobo pode significar anos de prêmios mais altos. Entenda exatamente como funciona e como usar a seu favor.',
    sections: [
      {
        heading: 'O que é o bônus de seguro auto e como funciona',
        body: `O bônus é um sistema de desconto progressivo regulado pela SUSEP (Circular 256/2004). A cada ano sem sinistro, você sobe uma classe de bônus e ganha um desconto maior no prêmio do seguro.\n\nAs classes vão de 0 (zero — sem desconto, para novos segurados) até 10 (desconto máximo). O desconto aproximado por classe é:\n- Classe 1: ~10% de desconto\n- Classe 3: ~25% de desconto\n- Classe 5: ~40% de desconto\n- Classe 7: ~50% de desconto\n- Classe 10: ~60% de desconto\n\nA progressão exata varia por seguradora e tipo de veículo, mas a lógica é universal: quanto mais tempo sem acionar o seguro, mais barato ele fica.`,
      },
      {
        heading: 'Como subir de classe: a regra dos 12 meses',
        body: `Para subir uma classe de bônus, você precisa completar 12 meses de apólice sem sinistro. A cada renovação sem acionamento, você sobe 1 classe.\n\n**Exemplo prático:**\n- Ano 1: Classe 0, paga R$2.400/ano\n- Ano 2 (sem sinistro): Classe 1, paga ~R$2.160/ano (-10%)\n- Ano 3 (sem sinistro): Classe 2, paga ~R$1.920/ano (-20%)\n- ...\n- Ano 10: Classe 9, paga ~R$1.200/ano (-50%)\n\nA economia acumulada em 10 anos sem sinistro pode ultrapassar R$10.000 em prêmios, dependendo do veículo e do estado.\n\n**Dica:** Mude de seguradora à vontade — seu bônus acompanha você. A nova seguradora é obrigada a respeitar sua classe atual (Resolução CNSP 252/2012).`,
      },
      {
        heading: 'O que faz você perder bônus e quanto perde',
        body: `Quando você aciona o seguro (sinistro), você cai de classe:\n\n**Sinistro parcial (danos ao próprio veículo):** Cai 2 classes. Se estava na classe 7, vai para a classe 5.\n\n**Sinistro total (roubo ou perda total):** Cai 4 classes. Se estava na classe 7, vai para a classe 3.\n\n**Mais de um sinistro no mesmo ano:** Cada sinistro derruba sua classe. Dois sinistros parciais = -4 classes.\n\n**Atenção:** Mesmo que o sinistro seja causado por terceiro (você não tem culpa), se você acionar seu seguro para consertar seu veículo, o bônus pode cair. Em alguns contratos, se o terceiro for identificado e comprovadamente culpado, sua classe não cai — mas isso depende da seguradora.\n\n**Estratégia inteligente:** Para danos pequenos (abaixo de R$1.500), às vezes é mais barato pagar do próprio bolso do que perder 2 classes de bônus e pagar prêmio mais alto nos anos seguintes.`,
      },
      {
        heading: 'Bônus na troca de veículo e seguradora',
        body: `**Troca de veículo dentro da mesma seguradora:** O bônus pertence ao segurado, não ao veículo. Ao trocar de carro, sua classe atual é mantida na nova apólice.\n\n**Troca de seguradora:** A Resolução CNSP 252/2012 garante que você pode levar seu bônus para qualquer seguradora. Basta solicitar à seguradora atual uma carta de bônus (documento que comprova sua classe). A nova seguradora é obrigada a aceitá-la.\n\n**Fique atento:** Peça a carta de bônus ANTES de cancelar a apólice. Após o cancelamento, algumas seguradoras dificultam a emissão.\n\n**Primeiro seguro:** Se você nunca teve seguro auto em seu nome, começa na classe 0. Não importa se já dirigia há anos em veículo de terceiros — o bônus é nominal e vinculado ao CPF do segurado.`,
      },
      {
        heading: 'Cálculo: pagar do bolso ou acionar o seguro?',
        body: `A decisão de acionar ou não o seguro por um dano pequeno depende do custo do reparo versus o aumento do prêmio nos próximos anos:\n\n**Exemplo 1: Conserto de R$2.500, classe atual 7**\n- Sem acionar: paga R$2.500 do bolso, mantém classe 7\n- Acionando: não paga conserto, cai para classe 5 (prêmio aumenta ~R$360/ano). Em 3 anos, o prêmio extra custa R$1.080.\n- Conclusão: Acionar compensa (R$2.500 > R$1.080)\n\n**Exemplo 2: Conserto de R$1.200, classe atual 3**\n- Sem acionar: paga R$1.200 do bolso, mantém classe 3\n- Acionando: não paga conserto, cai para classe 1 (prêmio aumenta ~R$480/ano). Em 3 anos, o prêmio extra custa R$1.440.\n- Conclusão: Pagar do bolso pode compensar, especialmente se seu prêmio base já for baixo.\n\n**Regra de bolso:** Se o custo do reparo for menor que 1,5× o valor do desconto que você perde nos próximos 2 anos, pague do bolso. Se for maior, acione.`,
      },
    ],
    keyTakeaways: [
      'O bônus é o maior fator de desconto no seguro auto — pode reduzir o prêmio em até 60% na classe 10',
      'Cada sinistro derruba 2 classes (parcial) ou 4 classes (total). Avalie se o reparo compensa a perda de bônus',
      'Seu bônus é vinculado ao seu CPF e acompanha você em qualquer seguradora — exija a carta de bônus antes de cancelar',
      'Danos abaixo de R$1.500 com classe alta geralmente compensam mais pagar do bolso do que acionar o seguro',
    ],
    relatedGuides: ['franquia-seguro-auto', 'seguro-auto-terceiros-vs-completo', 'como-acionar-seguro'],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getRelatedGuides(slugs: string[]): Guide[] {
  return slugs.map((s) => guides.find((g) => g.slug === s)).filter(Boolean) as Guide[];
}

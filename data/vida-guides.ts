export interface VidaGuideSection {
  heading: string;
  body: string;
}

export interface VidaGuide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  tag: string;
  updatedOn: string;
  readingTimeMin: number;
  intro: string;
  sections: VidaGuideSection[];
  keyTakeaways: string[];
  relatedSlugs: string[];
}

export const vidaGuides: VidaGuide[] = [
  {
    slug: 'guia-completo',
    title: 'Melhor Seguro de Vida no Brasil 2026: Guia Completo',
    metaTitle: 'Melhor Seguro de Vida Brasil 2026 | Guia Completo de Cotação',
    description:
      'Tudo que você precisa saber para contratar o melhor seguro de vida no Brasil em 2026. Compare coberturas, seguradoras e saiba qual plano faz sentido para seu perfil.',
    tag: 'Guia Mestre',
    updatedOn: '2026-04-11',
    readingTimeMin: 12,
    intro:
      'O seguro de vida é o produto financeiro mais subestimado no Brasil. Menos de 15% dos adultos brasileiros possuem cobertura individual — um dos menores índices entre países de renda média. Este guia cobre tudo que você precisa saber para escolher, cotar e contratar o plano certo para sua família em 2026.',
    sections: [
      {
        heading: 'O que é seguro de vida e como funciona',
        body: `O seguro de vida é um contrato entre você (o segurado) e uma seguradora: você paga um prêmio mensal e, em caso de morte ou invalidez permanente, a seguradora paga uma indenização (o capital segurado) aos beneficiários que você designou.

**Partes do contrato:**
- **Segurado:** Você — a pessoa cuja vida está sendo segurada
- **Beneficiários:** As pessoas que recebem a indenização (cônjuge, filhos, pais)
- **Capital segurado:** O valor da indenização — pode ser R$50.000 ou R$2.000.000
- **Prêmio:** Quanto você paga por mês ou ano
- **Vigência:** Prazo do contrato — 1 ano renovável, 5, 10 anos ou vitalício

O seguro de vida não é um investimento — ele não acumula valor resgatável (exceto produtos híbridos como VGBL/PGBL com cobertura por morte, que têm lógica diferente). É proteção pura: você paga pelo risco coberto.`,
      },
      {
        heading: 'Tipos de seguro de vida disponíveis no Brasil',
        body: `**1. Seguro de Vida Temporário (Prazo Definido):**
Cobre morte e/ou invalidez por um período fixo — 1, 5, 10 ou 20 anos. É o mais barato e recomendado para quem tem dependentes e dívidas em fase de acumulação de patrimônio. Ao fim do prazo, o contrato termina sem valor residual.

**2. Seguro de Vida Inteiro (Vitalício):**
Cobre até a morte, independentemente de quando ocorra. Tem prêmio maior e pode acumular valor de resgate ao longo do tempo. Recomendado para planejamento sucessório e cobertura de herdeiros menores de idade.

**3. Acidentes Pessoais (AP):**
Cobre exclusivamente morte e invalidez por acidente — não por doenças. Muito mais barato, mas com cobertura limitada. Bom como complemento, não como substituto.

**4. Seguro de Vida com Doenças Graves:**
Adicional que paga indenização em vida ao diagnóstico de câncer, AVC, infarto ou outras doenças listadas na apólice. Permite custear tratamento sem comprometer o patrimônio.

**5. Previdência com Cobertura por Risco (VGBL/PGBL com morte):**
Produto híbrido que combina acumulação para aposentadoria com cobertura por morte. Mais complexo e menos eficiente como seguro puro — use apenas se os benefícios tributários da previdência forem o objetivo principal.`,
      },
      {
        heading: 'Quanto de cobertura você realmente precisa',
        body: `A regra mais usada no mercado é: capital segurado = 5 a 10 vezes a renda bruta anual.

**Cálculo mais preciso (DIME Method adaptado):**
- **D — Dívidas:** Some todas as dívidas (financiamento imobiliário, carro, cartão, empréstimos)
- **I — Renda:** 3 a 5 anos de renda para os dependentes manterem o padrão de vida enquanto se reorganizam
- **M — Manutenção:** Custo de educação dos filhos até a independência (faculdade incluída)
- **E — Emergência:** Reserva de 6 meses de despesas familiares

**Exemplo:** Família com renda de R$8.000/mês, filhos de 4 e 7 anos, financiamento imobiliário de R$200.000:
- D: R$200.000 (financiamento) + R$30.000 (carro) = R$230.000
- I: R$8.000 × 12 × 4 anos = R$384.000
- M: 2 filhos × faculdade estimada R$80.000 = R$160.000
- E: R$8.000 × 6 = R$48.000
- **Total: ~R$822.000 → Contratar R$800.000–R$1.000.000**

Com esse capital, um plano temporário de 20 anos (filhos menores) custa entre R$80 e R$200/mês para adulto de 35 anos sem comorbidades — menos de 2,5% da renda.`,
      },
      {
        heading: 'Como comparar seguradoras de vida no Brasil',
        body: `Quatro critérios para comparar além do preço:

**1. Nota no Reclame Aqui (RA1000 preferencial):** Especialmente o índice de resolução de sinistros — que é justamente o pagamento de indenizações por morte e invalidez.

**2. Registro e solidez na SUSEP:** Todas devem ter autorização ativa. Para contratos longos (10+ anos), verifique também o rating de solidez — Fitch, S&P ou Moody's para grupos maiores.

**3. Cobertura de exclusões:** Leia a lista de exclusões antes de assinar. As mais comuns são: morte por esportes de risco não declarados, suicídio nos primeiros 2 anos, morte em guerra ou ato terrorista, uso de substâncias não declaradas.

**4. Carência:** A maioria dos contratos tem carência de 2 anos para morte natural (mas não para morte acidental). Se você tem histórico de saúde relevante, verifique a carência específica para as coberturas de doenças graves.`,
      },
      {
        heading: 'Ranking das melhores seguradoras de vida em 2026',
        body: `**Azos:** Especializada em seguro de vida, 100% digital. Processo 100% online, declaração de saúde simplificada para coberturas até R$1 milhão, resposta em minutos. Forte em morte acidental e invalidez. Boa nota no Reclame Aqui. Recomendada para perfis jovens e digitais.

**Porto Seguro Vida:** Parte do maior grupo de seguros do Brasil. Alta solidez financeira, ampla rede de corretorias, atendimento robusto. Coberturas completas incluindo doenças graves. Prêmio ligeiramente acima da média, mas reputação consolidada de pagamento.

**Icatu Seguros:** Especializada em vida e previdência, sem conglomerado bancário. Conhecida por agilidade no pagamento de sinistros e produtos flexíveis. Forte em coberturas combinadas (vida + previdência). Bem avaliada por corretores independentes.

**Bradesco Seguros:** Alto volume, boa cobertura territorial, forte em seguros coletivos empresariais. Para contratação individual, compare preço — tendem a ser mais caros para o mesmo capital.

**SulAmérica:** Sólida, com boa presença no Sudeste. Destaque para seguros de vida ligados a financiamentos imobiliários (MIP) e seguros empresariais.`,
      },
      {
        heading: 'Processo de contratação: o que esperar',
        body: `**1. Cotação:** Online (Azos, Youse Life) em 5 minutos ou via corretor. Informe: idade, sexo biológico, estado de saúde, capital desejado, prazo.

**2. Declaração de saúde:** Questionário sobre doenças preexistentes, cirurgias, medicamentos contínuos, histórico familiar. Seja honesto — omissões invalidam o contrato.

**3. Exame médico:** Obrigatório acima de certos capitais (geralmente R$500.000) ou idades (geralmente acima de 50 anos). A seguradora agenda e custeia.

**4. Análise de subscrição:** A seguradora analisa o perfil de risco. Pode: aceitar integralmente, aceitar com sobreprêmio (prêmio maior por risco elevado), aceitar com exclusão de cobertura específica, ou recusar.

**5. Emissão da apólice:** Em 2 a 10 dias úteis. Você recebe por email/correio. Leia antes de assinar — verifique capital, beneficiários, exclusões e prazo.

**6. Registro de beneficiários:** Atualize sempre que houver mudança de estado civil ou nascimento de filhos. A apólice paga para quem está no cadastro, não automaticamente para herdeiros legais.`,
      },
    ],
    keyTakeaways: [
      'Capital ideal: some dívidas + 3–5 anos de renda + educação dos filhos + reserva de emergência',
      'Seguro temporário é mais eficiente para a maioria: prêmio menor e cobre o período de maior exposição financeira',
      'Declare todas as condições de saúde — omissão pode invalidar o sinistro na hora mais crítica',
      'Compare RA1000 e rating SUSEP além do preço — quem paga sinistro rápido vale o prêmio extra',
    ],
    relatedSlugs: ['quanto-custa', 'capital-segurado', 'melhores-seguradoras', 'por-idade'],
  },

  {
    slug: 'quanto-custa',
    title: 'Quanto Custa Seguro de Vida no Brasil? Preços por Perfil 2026',
    metaTitle: 'Quanto Custa Seguro de Vida 2026 | Tabela de Preços por Perfil',
    description:
      'Tabela de preços de seguro de vida por idade, sexo e capital segurado no Brasil em 2026. Saiba quanto pagar e o que afeta o prêmio.',
    tag: 'Preços',
    updatedOn: '2026-04-11',
    readingTimeMin: 7,
    intro:
      'O preço do seguro de vida no Brasil varia de R$25/mês (jovem, cobertura básica) a R$600/mês (adulto 55+, capital alto, doenças graves incluídas). Entender os fatores que determinam o prêmio ajuda a contratar o capital certo pelo menor custo.',
    sections: [
      {
        heading: 'Tabela de preços por faixa etária e capital segurado (2026)',
        body: `Estimativas para seguro de vida temporário (10 anos), cobertura de morte natural e acidental, sem histórico de doenças graves:

| Idade | Capital R$200k | Capital R$500k | Capital R$1M |
|---|---|---|---|
| 25–29 anos | R$25–45/mês | R$55–95/mês | R$100–180/mês |
| 30–34 anos | R$30–55/mês | R$65–110/mês | R$120–210/mês |
| 35–39 anos | R$40–70/mês | R$90–145/mês | R$170–280/mês |
| 40–44 anos | R$55–95/mês | R$125–200/mês | R$240–390/mês |
| 45–49 anos | R$75–130/mês | R$175–285/mês | R$340–550/mês |
| 50–54 anos | R$110–185/mês | R$260–420/mês | R$500–810/mês |
| 55–59 anos | R$160–270/mês | R$380–610/mês | R$730–1.180/mês |

Prêmios femininos são em média 15–25% menores que masculinos para o mesmo perfil (menor expectativa de mortalidade). Valores incluem IOF (1,38% sobre o prêmio).`,
      },
      {
        heading: 'Os 7 fatores que determinam o preço do seu seguro de vida',
        body: `**1. Idade:** O fator de maior impacto. A mortalidade dobra aproximadamente a cada 8–10 anos de vida. Contratar aos 30 vs. aos 40 pode significar pagar 40–60% a menos pelo mesmo capital.

**2. Sexo biológico:** Mulheres vivem em média 7 anos mais que homens no Brasil (IBGE 2025). A maioria das seguradoras aplica prêmio menor para seguradas.

**3. Estado de saúde:** IMC elevado, tabagismo, diabetes, hipertensão e histórico cardiovascular aumentam o risco. Tabagistas pagam em média 50–80% a mais. Ex-fumantes (cessação >12 meses) geralmente têm prêmio equivalente a não-fumantes.

**4. Capital segurado:** O prêmio aumenta proporcionalmente ao capital — mas há economias de escala. Dobrar o capital geralmente não dobra o prêmio.

**5. Prazo:** Contratos mais longos têm prêmio nivelado — você paga o mesmo nos primeiros e últimos anos. Contratos anuais renováveis começam mais baratos mas encarecem com a idade.

**6. Coberturas adicionais:** Invalidez por doença, doenças graves, diária hospitalar e funeral assistido adicionam entre 20% e 80% ao prêmio base.

**7. Seguradora:** Para o mesmo perfil, a variação de preço entre seguradoras pode chegar a 40%. Sempre compare pelo menos 3 cotações.`,
      },
      {
        heading: 'Prêmio nivelado vs. prêmio crescente: qual escolher',
        body: `**Prêmio nivelado:** Você paga o mesmo valor durante toda a vigência do contrato. A seguradora calcula uma média atuarial — você paga mais do que o risco no início e menos no final. Melhor para quem quer previsibilidade orçamentária e contratos longos (10–20 anos).

**Prêmio crescente (renovável anualmente):** O contrato tem vigência de 1 ano e o prêmio aumenta a cada renovação conforme a idade. Começa mais barato, mas pode ficar caro após os 45 anos. Melhor para proteção de curto prazo ou quando o orçamento é restrito agora.

**Regra prática:** Se você tem menos de 40 anos e dependentes, o prêmio nivelado de 15–20 anos costuma ser mais econômico no longo prazo. Se você tem mais de 50 anos e precisa de cobertura temporária (filhos quase adultos), o renovável pode ser mais eficiente.`,
      },
      {
        heading: 'Como economizar sem reduzir a cobertura essencial',
        body: `**1. Contrate jovem:** Cada ano de atraso aumenta o prêmio. Um contrato de R$500.000 contratado aos 30 custa menos ao longo de 20 anos do que o mesmo contrato contratado aos 35.

**2. Separe o seguro de vida da previdência:** Misturar VGBL com cobertura por risco geralmente sai mais caro e menos eficiente do que contratar os dois separadamente.

**3. Escolha o prazo certo:** Não segure a vida inteira se o objetivo é proteger filhos até a independência. Um contrato de 20 anos é suficiente para a maioria das famílias com filhos pequenos.

**4. Revise exclusões antes de contratar:** Se a seguradora A exclui sua doença preexistente mas a seguradora B aceita com sobreprêmio, o custo efetivo pode ser semelhante — mas a B oferece cobertura real.

**5. Seguro coletivo pelo trabalho:** Se o empregador oferece, aproveite — as tarifas de grupo são 30–50% menores. Mas não dependa só dele — é cancelado se você trocar de emprego.`,
      },
    ],
    keyTakeaways: [
      'Prêmio para R$500k de capital: R$55–95/mês (25–29 anos) até R$380–610/mês (55–59 anos)',
      'Tabagistas pagam 50–80% a mais — e ex-fumantes (>12 meses) voltam à tabela normal',
      'Prêmio nivelado de 15–20 anos é mais econômico no longo prazo para quem é jovem e tem dependentes',
      'A variação de preço entre seguradoras pode chegar a 40% para o mesmo perfil — sempre compare 3 cotações',
    ],
    relatedSlugs: ['guia-completo', 'capital-segurado', 'por-idade', 'melhores-seguradoras'],
  },

  {
    slug: 'capital-segurado',
    title: 'Como Calcular o Capital Segurado Ideal para Sua Família',
    metaTitle: 'Capital Segurado: Quanto de Seguro de Vida Você Precisa?',
    description:
      'Aprenda a calcular o capital segurado ideal para seu seguro de vida usando o método DIME e outras abordagens práticas para proteger seus dependentes.',
    tag: 'Planejamento',
    updatedOn: '2026-04-11',
    readingTimeMin: 6,
    intro:
      'A maioria das pessoas contrata seguro de vida pelo valor errado — ou por excesso (pagando prêmio desnecessário) ou por falta (deixando dependentes em situação difícil). Calcular o capital certo leva menos de 15 minutos e pode fazer uma diferença enorme.',
    sections: [
      {
        heading: 'O método DIME: a abordagem mais completa',
        body: `O método DIME (Dívidas, Renda, Manutenção, Emergência) foi desenvolvido por planejadores financeiros americanos e adaptado ao contexto brasileiro:

**D — Dívidas:**
Some todas as dívidas que os beneficiários precisariam honrar:
- Financiamento imobiliário (saldo devedor)
- Financiamento de veículos
- Dívidas de cartão e crédito pessoal
- Empréstimos com garantia
- Dívidas empresariais com garantia pessoal (MEIs e sócios)

**I — Renda para os dependentes:**
Calcule quanto tempo seus dependentes precisariam para reorganizar a vida financeiramente: 3 a 5 anos de renda bruta anual é o padrão. Para famílias com filhos pequenos, use 5 anos. Para casais sem filhos onde o cônjuge trabalha, 2–3 anos pode ser suficiente.

**M — Manutenção e educação:**
Custos de educação dos filhos até a independência financeira. Inclua escola particular se for o caso, faculdade (média de R$1.500–R$4.000/mês por filho em universidade particular) e eventuais pós-graduações.

**E — Emergência:**
Reserva de 6 a 12 meses de despesas totais da família para o período imediato após o sinistro — antes de processos de inventário e reorganização financeira.`,
      },
      {
        heading: 'Exemplo prático completo',
        body: `**Perfil:** Guilherme, 37 anos, casado, dois filhos (6 e 9 anos), renda R$12.000/mês.

**Cálculo DIME:**
- **D:** Financiamento imobiliário R$280.000 + Carro R$45.000 = R$325.000
- **I:** R$12.000 × 12 × 5 anos = R$720.000
- **M:** 2 filhos × [4 anos ensino médio particular R$12k/ano + 5 anos faculdade R$2.500/mês] = 2 × (R$48.000 + R$150.000) = R$396.000
- **E:** R$12.000 × 8 meses = R$96.000

**Total: R$1.537.000 → Contratar R$1.500.000**

Para um contrato temporário de 20 anos (quando filhos terão 26 e 29 anos), Guilherme, sem comorbidades, pagaria entre R$220 e R$380/mês dependendo da seguradora — entre 1,8% e 3,2% da renda mensal.`,
      },
      {
        heading: 'Ajustando o capital ao longo do tempo',
        body: `O capital ideal não é fixo — ele muda conforme sua vida muda:

**Reduzir o capital faz sentido quando:**
- O saldo do financiamento imobiliário diminui significativamente
- Os filhos atingem independência financeira
- O cônjuge desenvolve renda própria relevante
- Você acumula patrimônio suficiente para suprir a necessidade (investimentos, imóveis quitados)

**Aumentar o capital faz sentido quando:**
- Nasce um novo filho
- Você contrai novas dívidas significativas
- Sua renda aumenta substancialmente e o estilo de vida dos dependentes se eleva
- O cônjuge para de trabalhar para cuidar dos filhos

Revisar o capital segurado a cada 3–5 anos ou a cada grande evento de vida é boa prática. A maioria das seguradoras permite ajuste de capital na renovação do contrato.`,
      },
      {
        heading: 'E se o capital calculado gerar um prêmio inacessível?',
        body: `Se o capital ideal resultar em prêmio acima de 3–4% da renda, use esta hierarquia de prioridades:

**1ª prioridade — Quitar dívidas:** O capital mínimo deve cobrir as dívidas (D do DIME). Uma família endividada sem seguro está em situação muito mais vulnerável.

**2ª prioridade — Renda de transição:** Pelo menos 2 anos de renda para os dependentes reorganizarem.

**3ª prioridade — Educação e emergência:** Adicione conforme o orçamento permitir.

Contratar R$800.000 com prêmio acessível é muito melhor do que não contratar enquanto espera conseguir o capital "ideal" de R$1.500.000. Proteção parcial é infinitamente superior a proteção zero.`,
      },
    ],
    keyTakeaways: [
      'Método DIME: some Dívidas + Renda (3–5 anos) + Manutenção/Educação dos filhos + Emergência (6–12 meses)',
      'Revise o capital a cada 3–5 anos ou após grandes eventos: nascimento de filhos, quitação de financiamento, mudança de renda',
      'Se o prêmio ideal for inacessível, priorize: dívidas > renda de transição > educação > emergência',
      'Prêmio entre 1% e 3% da renda mensal é considerado adequado para proteção completa',
    ],
    relatedSlugs: ['guia-completo', 'quanto-custa', 'por-idade', 'para-familia'],
  },

  {
    slug: 'por-idade',
    title: 'Seguro de Vida por Idade: O Que Contratar aos 20, 30, 40 e 50 Anos',
    metaTitle: 'Seguro de Vida por Idade 2026 | Guia por Faixa Etária',
    description:
      'As necessidades e o custo do seguro de vida mudam muito com a idade. Veja o que contratar, quanto pagar e qual cobertura faz sentido em cada fase da vida.',
    tag: 'Por Perfil',
    updatedOn: '2026-04-11',
    readingTimeMin: 7,
    intro:
      'O seguro de vida ideal aos 25 anos é completamente diferente do ideal aos 50. Nas suas 20s, o objetivo é proteger dívidas crescentes e dependentes futuros a custo mínimo. Nas suas 50s, é garantir que o patrimônio construído chegue intacto aos herdeiros. Este guia detalha o que faz sentido em cada fase.',
    sections: [
      {
        heading: '20–29 anos: o melhor momento para contratar',
        body: `**Situação típica:** Solteiro ou recém-casado, sem filhos ou com filhos pequenos, início da carreira, possivelmente com empréstimo estudantil ou financiamento do primeiro imóvel.

**Por que contratar agora:** O prêmio é o mais barato da vida — contratar R$500.000 de cobertura pode custar R$55–80/mês. Cada ano de atraso aumenta o prêmio. Um contrato de 30 anos iniciado aos 25 é muito mais barato no total do que iniciar aos 35.

**O que contratar:**
- Seguro temporário de 20–30 anos
- Capital de R$200.000–R$500.000 (ajuste se você for financiar imóvel em breve)
- Cobertura de morte natural + acidental + invalidez permanente total
- Considere adicionar aceleração por doenças graves se há histórico familiar de câncer ou doenças cardíacas

**O que não precisa ainda:** Seguro vitalício (caro e pouco eficiente nessa fase), seguro de vida com previdência embutida (exceto se o benefício fiscal for o objetivo).

**Dica de ouro:** Se seu empregador oferece seguro coletivo, verifique o capital — geralmente é 24x o salário. Pode ser insuficiente. Complemente com seguro individual se necessário.`,
      },
      {
        heading: '30–39 anos: fase de maior exposição financeira',
        body: `**Situação típica:** Casado, filhos em idade escolar, financiamento imobiliário ativo, carro financiado, renda crescente. Provavelmente o período de maior vulnerabilidade financeira familiar.

**Por que é crítico:** Você tem mais dívidas, mais dependentes e ainda não acumulou patrimônio suficiente para ser "autoassegurado". A diferença entre protegido e desprotegido pode significar vender o imóvel da família.

**O que contratar:**
- Capital calculado pelo método DIME (veja nosso guia específico)
- Cobertura de R$500.000 a R$2.000.000 dependendo do perfil
- Prazo que cubra até os filhos terem independência financeira (geralmente 15–20 anos)
- Invalidez por doença incluída — a probabilidade de invalidez antes dos 65 é maior que a de morte

**Ajuste se você tem:** Sócio em empresa (considere seguro de vida sócio-a-sócio), financiamento imobiliário acima de R$500.000 (seguro MIP pode ser exigido pelo banco).`,
      },
      {
        heading: '40–49 anos: reavaliação e ajuste',
        body: `**Situação típica:** Filhos adolescentes ou entrando na faculdade, financiamento imobiliário reduzido, patrimônio em acumulação, possivelmente primeira preocupação com saúde (hipertensão, colesterol).

**O que revisar:**
- Verifique se o capital contratado ainda é adequado — dívidas provavelmente diminuíram, mas filhos ainda dependem de você
- Se você não tinha seguro e vai contratar agora: espere pagar 2–3x mais do que pagaria aos 30 para o mesmo capital. Ainda compensa, mas o cálculo muda.

**Cuidados especiais nesta fase:**
- Declare condições de saúde emergentes honestamente — hipertensão controlada geralmente é aceita com sobreprêmio pequeno; omissão pode invalidar o contrato
- Considere adicionar cobertura de doenças graves se ainda não tem — a probabilidade de diagnóstico de câncer cresce significativamente após os 40
- Avalie se seguro coletivo do empregador cobre o necessário — muitos planos empresariais têm capital máximo insuficiente para este perfil`,
      },
      {
        heading: '50–65 anos: proteção patrimonial e planejamento sucessório',
        body: `**Situação típica:** Filhos adultos ou independentes, financiamentos quitados ou próximos do fim, patrimônio acumulado (imóveis, investimentos). O foco muda de proteção de renda para transferência de patrimônio.

**O que o seguro de vida faz nesta fase:**

**Planejamento sucessório:** Em caso de morte, o capital do seguro é pago diretamente aos beneficiários sem inventário e sem ITCMD (Imposto sobre Transmissão Causa Mortis) em muitos estados. Para herdeiros com necessidade de liquidez imediata, isso é altamente valioso.

**Cobertura de passivos específicos:** Se você ainda tem participação em empresa ou garantias pessoais em financiamentos, o seguro cobre o risco de deixar dívidas.

**Preço nessa fase:** Prêmios são significativamente mais altos. Um contrato vitalício de R$500.000 para 55 anos pode custar R$400–700/mês. Avalie se o benefício do planejamento sucessório justifica o prêmio — pode ser mais eficiente usar outros instrumentos (previdência privada, holding familiar).`,
      },
    ],
    keyTakeaways: [
      '20s: o prêmio mais barato da vida — contrate agora e trave a tabela para 20–30 anos',
      '30s: fase de maior exposição — capital calculado pelo DIME, prazo que cobre até filhos independentes',
      '40s: revise capital e adicione cobertura de doenças graves se não tem',
      '50s+: o foco muda para planejamento sucessório — seguro de vida paga beneficiários sem inventário',
    ],
    relatedSlugs: ['guia-completo', 'quanto-custa', 'capital-segurado', 'doencas-graves'],
  },

  {
    slug: 'doencas-graves',
    title: 'Seguro de Vida com Doenças Graves: Câncer, AVC e Infarto em 2026',
    metaTitle: 'Seguro Doenças Graves 2026 | Câncer, AVC, Infarto: O Que Cobre',
    description:
      'Entenda o que é a cobertura de doenças graves no seguro de vida, quais doenças são cobertas, como funciona o pagamento em vida e quando contratar.',
    tag: 'Coberturas',
    updatedOn: '2026-04-11',
    readingTimeMin: 6,
    intro:
      'A cobertura de doenças graves paga uma indenização ainda em vida, ao diagnóstico — não após a morte. Ela existe porque o diagnóstico de câncer, AVC ou infarto muitas vezes não mata imediatamente, mas gera custos imensos de tratamento que podem destruir o patrimônio familiar.',
    sections: [
      {
        heading: 'Como funciona a cobertura de doenças graves',
        body: `Ao contrário do seguro de vida tradicional, que paga ao falecimento, a cobertura de doenças graves (CDG) paga uma indenização em vida mediante diagnóstico confirmado de doença listada na apólice.

**Características principais:**
- O pagamento é em dinheiro, sem restrição de uso — você usa como quiser: tratamento, hipoteca, sustento familiar enquanto fica afastado
- O diagnóstico deve ser confirmado por médico especialista e documentado conforme exigência da seguradora
- Após o pagamento, a cobertura é encerrada (geralmente)
- A cobertura de morte normal permanece ativa independentemente — são coberturas separadas

**Carência:** A maioria das apólices tem carência de 180 a 365 dias para a cobertura de doenças graves. Ou seja, o diagnóstico deve ocorrer pelo menos 6–12 meses após a contratação para ser coberto.`,
      },
      {
        heading: 'Quais doenças são cobertas (e quais não são)',
        body: `**Doenças geralmente cobertas em apólices padrão:**
- Câncer (tumor maligno com histologia confirmada)
- Infarto agudo do miocárdio
- Acidente vascular cerebral (AVC com déficit neurológico permanente)
- Insuficiência renal crônica em estágio terminal (necessidade de diálise)
- Transplante de órgãos vitais (coração, rim, fígado, pulmão)
- Cirurgia de ponte de safena (revascularização do miocárdio)
- Esclerose múltipla
- Doença de Parkinson (em estágios avançados)
- Paralisia permanente de membros

**Exclusões comuns:**
- Cânceres in situ (tumor ainda não invasivo) — atenção: algumas apólices incluem, outras não
- AIDS / HIV (exceto se contratado antes do diagnóstico sem conhecimento)
- Doenças preexistentes conhecidas na data de contratação
- Sequelas de AVC sem déficit neurológico permanente documentado

**Verifique sempre:** O número de doenças cobertas varia muito entre apólices — de 10 a mais de 50 condições. Apólices mais completas cobrem condições menos comuns como distrofia muscular e síndrome de Creutzfeldt-Jakob.`,
      },
      {
        heading: 'Quando a cobertura de doenças graves é mais importante',
        body: `**Histórico familiar:** Se seus pais ou irmãos tiveram câncer, AVC ou infarto antes dos 60 anos, a probabilidade estatística de você desenvolver a mesma condição é significativamente maior. Esse é o argumento mais forte para incluir a cobertura.

**Profissão e estilo de vida:** Trabalhadores de alta pressão, fumantes e sedentários têm risco cardiovascular mais elevado. A cobertura funciona como hedge financeiro contra esse risco.

**Sem reserva financeira:** Se um tratamento de câncer de 12–18 meses custaria R$150.000–R$300.000 (quimioterapia, cirurgia, internações) e você não tem essa reserva, a cobertura de doenças graves pode evitar a destruição do patrimônio.

**Autônomos sem licença médica remunerada:** Um AVC que deixa você afastado por 6 meses significa 6 meses sem renda. A indenização preenche esse gap enquanto o INSS processa o auxílio-doença.`,
      },
      {
        heading: 'Quanto custa adicionar doenças graves ao seguro de vida',
        body: `A cobertura de doenças graves adiciona entre 20% e 60% ao prêmio base, dependendo:
- Das doenças cobertas (mais doenças = mais caro)
- Da sua idade (risco cresce com a idade)
- Do seu histórico de saúde

**Exemplo prático:**
- Homem, 38 anos, sem comorbidades
- Seguro de vida: R$500.000 de capital, cobertura de morte natural e acidental = R$110/mês
- Adicionando doenças graves (câncer, AVC, infarto, 10 condições): +R$35–55/mês
- **Total com doenças graves: R$145–165/mês**

Para o mesmo perfil com histórico familiar de câncer, o sobreprêmio pode dobrar — mas a cobertura ainda pode valer o custo dado o risco elevado.

Use nossa calculadora de seguro vida para simular com seu perfil específico.`,
      },
    ],
    keyTakeaways: [
      'A cobertura de doenças graves paga em vida ao diagnóstico — não aguarda o falecimento',
      'Carência de 180–365 dias é comum: contrate antes de precisar',
      'Verifique se cânceres in situ são cobertos — a maioria das apólices básicas não cobre',
      'Para autônomos sem licença remunerada, é especialmente valiosa: cobre renda enquanto você se trata',
    ],
    relatedSlugs: ['guia-completo', 'por-idade', 'para-familia', 'quanto-custa'],
  },

  {
    slug: 'prazo-vs-vitalicio',
    title: 'Seguro de Vida Temporário vs. Vitalício: Qual Escolher em 2026?',
    metaTitle: 'Seguro Vida Temporário vs Vitalício | Qual Vale Mais a Pena?',
    description:
      'Compare o seguro de vida temporário e o vitalício: diferenças de preço, quando cada um faz sentido e qual é a escolha certa para seu perfil em 2026.',
    tag: 'Comparativo',
    updatedOn: '2026-04-11',
    readingTimeMin: 5,
    intro:
      'A escolha entre seguro de vida temporário e vitalício é uma das decisões mais importantes na contratação. Para a maioria dos brasileiros em fase de acumulação de patrimônio, o temporário é a escolha mais eficiente — mas há situações específicas onde o vitalício faz sentido.',
    sections: [
      {
        heading: 'Diferenças fundamentais',
        body: `**Seguro Temporário:**
- Vigência de 1 a 30 anos (você escolhe)
- Prêmio nivelado durante a vigência — não muda
- Ao fim do prazo: contrato encerra sem valor residual
- Prêmio é significativamente mais baixo
- Objetivo: proteção de risco durante o período de maior exposição financeira

**Seguro Vitalício (Vida Inteira):**
- Cobertura até a morte, em qualquer idade
- Acumula valor de resgate ao longo do tempo (componente de poupança)
- Pode ser usado como ferramenta de planejamento sucessório
- Prêmio é 3 a 8 vezes mais alto para o mesmo capital
- Objetivo: garantir transferência de patrimônio e cobertura independente de quando ocorrer a morte`,
      },
      {
        heading: 'O argumento econômico para o temporário',
        body: `Para a maioria das famílias, o seguro temporário é mais eficiente por uma razão simples: **a necessidade de proteção diminui com o tempo.**

Na fase de acumulação (25–55 anos), você tem dívidas, dependentes e pouco patrimônio. Aqui o risco é máximo. Na fase de desacumulação (55–75 anos), o financiamento está quitado, os filhos são independentes e você tem investimentos para proteger os dependentes restantes.

**O argumento do "buy term, invest the difference":** Se o seguro vitalício custa R$400/mês e o temporário equivalente custa R$120/mês, a diferença de R$280/mês aplicada em um fundo de previdência com retorno de 6% a.a. por 20 anos resulta em aproximadamente R$130.000 de patrimônio adicional — que se soma à sua proteção quando o temporário expirar.

Essa estratégia funciona quando você realmente disciplinado sobre investir a diferença. Se não for, o seguro vitalício com poupança compulsória pode ser o caminho.`,
      },
      {
        heading: 'Quando o vitalício faz sentido',
        body: `**Planejamento sucessório para herdeiros com necessidade especial:** Filho com deficiência que dependerá de você por toda a vida. O seguro vitalício garante que, independentemente de quando você morrer, haverá recurso para o cuidado contínuo.

**Equalização de herança:** Você tem um imóvel ilíquido e dois filhos. Um herda o imóvel, o outro recebe o capital do seguro — a herança fica equilibrada sem necessidade de venda forçada.

**Planejamento com IRPF:** Em alguns cenários, o seguro de vida vitalício é mais eficiente do que doação antecipada com reserva de usufruto — consulte um planejador financeiro ou advogado tributarista.

**Negócio familiar:** Sócio-majoritário que não pode sair da empresa. A morte sem sucessão planejada pode destruir o negócio. O seguro vitalício garante liquidez para compra das cotas pelos herdeiros ou sócios remanescentes.`,
      },
    ],
    keyTakeaways: [
      'Para a maioria dos brasileiros em acumulação: seguro temporário é 3–8x mais barato e cobre o período de maior risco',
      'Vitalício faz sentido para: planejamento sucessório, equalização de herança, dependentes permanentes',
      '"Buy term, invest the difference" funciona se você disciplinado sobre investir os R$ economizados',
      'O temporário de 20–30 anos cobre a fase crítica (filhos dependentes + financiamentos ativos) a custo mínimo',
    ],
    relatedSlugs: ['guia-completo', 'quanto-custa', 'por-idade', 'capital-segurado'],
  },

  {
    slug: 'melhores-seguradoras',
    title: 'Melhores Seguradoras de Vida no Brasil 2026: Comparativo Completo',
    metaTitle: 'Melhores Seguradoras de Vida Brasil 2026 | Azos vs Porto vs Icatu',
    description:
      'Compare as principais seguradoras de vida do Brasil em 2026: Azos, Porto Seguro, Icatu, Bradesco e SulAmérica. Preços, coberturas, Reclame Aqui e para quem indicar.',
    tag: 'Comparativo',
    updatedOn: '2026-04-11',
    readingTimeMin: 8,
    intro:
      'Escolher a seguradora certa vai além de comparar preços. Uma seguradora com prêmio mais barato que demora 180 dias para pagar sinistro de morte é pior do que uma com prêmio 20% maior que resolve em 30 dias. Esta análise compara as principais seguradoras de vida do Brasil nos critérios que importam.',
    sections: [
      {
        heading: 'Azos: a nova referência digital',
        body: `**Fundada:** 2021 | **Modelo:** 100% digital, sem corretores físicos | **SUSEP:** Autorizada

**Pontos fortes:**
- Cotação e contratação 100% online — de 5 a 15 minutos
- Declaração de saúde simplificada para capitais até R$1.000.000
- Processo de sinistro digital — documentação enviada por app
- Prêmios competitivos, especialmente para perfis jovens (20–40 anos)
- Cobertura de invalidez por acidente e morte acidental com capital dobrado

**Pontos de atenção:**
- Empresa mais jovem — histórico de pagamento de sinistros menor que incumbentes
- Pode aplicar sobreprêmio relevante para condições de saúde preexistentes
- Atendimento 100% digital pode ser limitante para quem prefere suporte humano

**Indicada para:** Profissionais urbanos de 25–45 anos, sem comorbidades significativas, que valorizam processo ágil e digital.`,
      },
      {
        heading: 'Porto Seguro Vida: solidez e amplitude',
        body: `**Fundada:** 1945 (seguro de vida desde a década de 70) | **Grupo:** Porto (maior grupo segurador privado do Brasil) | **SUSEP:** Autorizada

**Pontos fortes:**
- Maior grupo segurador privado do Brasil — solidez financeira máxima
- Rede ampla de corretores e atendimento presencial em todo o país
- Coberturas completas incluindo doenças graves, DIT e funeral assistido
- Histórico sólido de pagamento de sinistros
- Seguros empresariais bem estruturados (vida em grupo, chave)

**Pontos de atenção:**
- Prêmio geralmente acima da média para o mesmo perfil
- Processo de sinistro pode ser mais burocrático do que concorrentes digitais
- Contratação tipicamente via corretor — menos agilidade para quem quer contratar diretamente

**Indicada para:** Famílias que priorizam segurança e solidez financeira da seguradora, especialmente para contratos de longo prazo (20+ anos) e capitais acima de R$1M.`,
      },
      {
        heading: 'Icatu Seguros: especialista independente',
        body: `**Fundada:** 1991 | **Modelo:** Independente (sem banco controlador) | **SUSEP:** Autorizada

**Pontos fortes:**
- Especializada exclusivamente em vida e previdência — sem distração com auto e residencial
- Reconhecida por agilidade no pagamento de sinistros de vida
- Forte em produtos combinados (vida + previdência) para planejamento de longo prazo
- Bem avaliada por corretores independentes como parceira confiável
- Flexibilidade maior em aceitação de perfis com comorbidades

**Pontos de atenção:**
- Menor presença em plataformas digitais de contratação direta
- Contratação majoritariamente via corretor

**Indicada para:** Famílias com planejamento financeiro de longo prazo, perfis que precisam de produto combinado vida+previdência, e quem valoriza especialização em vida.`,
      },
      {
        heading: 'Bradesco Seguros: volume e capilaridade',
        body: `**Grupo:** Bradesco | **Modelo:** Bancassurance (venda principalmente via banco) | **SUSEP:** Autorizada

**Pontos fortes:**
- Alta capilaridade — agências Bradesco em todo o Brasil
- Seguro coletivo empresarial bem estruturado e competitivo
- Histórico longo e solidez financeira do grupo
- Produtos para todos os perfis, incluindo idosos e portadores de condições crônicas

**Pontos de atenção:**
- Prêmios individuais tendem a ser menos competitivos que seguradoras especializadas
- Relacionamento bancário pode influenciar a oferta (produtos podem ser "empacotados" com outros produtos)
- Histórico de reclamações relacionado mais ao processo de sinistro do que ao pagamento

**Indicada para:** Clientes Bradesco que valorizam conveniência, especialmente para seguro coletivo empresarial com boa relação custo-benefício em grupo.`,
      },
      {
        heading: 'SulAmérica: forte no Sudeste',
        body: `**Fundada:** 1895 | **Grupo:** Desde 2022 parte do grupo Rede D'Or | **SUSEP:** Autorizada

**Pontos fortes:**
- Uma das seguradoras mais antigas do Brasil
- Forte presença no Sudeste, especialmente São Paulo e Rio de Janeiro
- Excelente em seguros de vida vinculados a financiamentos imobiliários (MIP)
- Linha de produtos ampla: vida individual, coletivo, previdência

**Pontos de atenção:**
- Após aquisição pela Rede D'Or, foco tem se voltado mais para saúde
- Presença menor no Norte e Nordeste
- Processo de contratação digital ainda em desenvolvimento

**Indicada para:** Quem está financiando imóvel no Sudeste (MIP competitivo) e quem quer seguro de vida coletivo via empregador na região.`,
      },
      {
        heading: 'Resumo: como escolher entre elas',
        body: `**Critério 1 — Preço:** Para o mesmo capital e perfil, Azos tende a ser mais competitiva para jovens sem comorbidades. Bradesco e Porto costumam ser mais caros no individual.

**Critério 2 — Agilidade no sinistro:** Icatu e Azos têm reputação de processo mais rápido. Para contratos de 20+ anos, pesquise o histórico atual de pagamento de sinistros no Reclame Aqui.

**Critério 3 — Solidez:** Para contratos longos (20+ anos), a solidez financeira importa muito. Porto Seguro e Bradesco são os mais sólidos historicamente. Azos é nova — verifique rating atual.

**Critério 4 — Flexibilidade de saúde:** Icatu e Azos são conhecidas por maior flexibilidade na aceitação de perfis com comorbidades moderadas, com sobreprêmio transparente.

**Regra de ouro:** Obtenha pelo menos 3 cotações para o mesmo capital e perfil, compare o prêmio, as exclusões específicas e o histórico de pagamento de sinistros de cada seguradora.`,
      },
    ],
    keyTakeaways: [
      'Azos: melhor para jovens digitais, 25–40 anos sem comorbidades — processo ágil, prêmio competitivo',
      'Porto Seguro: melhor solidez financeira — ideal para contratos longos e capitais altos',
      'Icatu: especialista independente, reconhecida por agilidade em sinistros e flexibilidade com comorbidades',
      'Obtenha 3 cotações para o mesmo perfil e compare prêmio + exclusões + histórico no Reclame Aqui',
    ],
    relatedSlugs: ['guia-completo', 'quanto-custa', 'por-idade', 'doencas-graves'],
  },

  {
    slug: 'para-familia',
    title: 'Seguro de Vida Familiar: Proteção para Cônjuge e Dependentes',
    metaTitle: 'Seguro de Vida Familiar 2026 | Como Proteger Cônjuge e Filhos',
    description:
      'Como estruturar seguro de vida para toda a família: cobertura para cônjuge, filhos dependentes e como calcular o capital correto para cada membro.',
    tag: 'Por Perfil',
    updatedOn: '2026-04-11',
    readingTimeMin: 6,
    intro:
      'A proteção familiar com seguro de vida vai além de segurar apenas o provedor principal. Quando o cônjuge que cuida dos filhos morre, os custos de reposição dos cuidados são imensos — e quando um filho morre, os custos emocionais e financeiros do luto também são relevantes.',
    sections: [
      {
        heading: 'Segurar o cônjuge que não trabalha: por que é essencial',
        body: `Muitas famílias segurem apenas o provedor de renda principal e ignoram o cônjuge que fica em casa cuidando dos filhos. Esse é um erro custoso.

Se o cônjuge cuidador falece, o custo de substituição dos serviços prestados (cuidado com filhos, gestão da casa, suporte educacional) pode ser imenso. Uma estimativa conservadora para uma família com dois filhos pequenos:
- Babá em tempo integral: R$3.000–5.000/mês
- Escola em horário estendido: R$1.500–2.500/mês adicional
- Serviços domésticos ampliados: R$1.500–2.000/mês

Isso significa R$6.000–9.500/mês em custos adicionais por pelo menos 5–10 anos. O capital adequado para o cônjuge cuidador: R$500.000–R$1.000.000.

O prêmio para segurar uma mulher de 33 anos, sem comorbidades, em R$500.000 por 15 anos: R$35–60/mês. Um dos seguros com melhor custo-benefício do mercado.`,
      },
      {
        heading: 'Seguro de vida para filhos: quando faz sentido',
        body: `O seguro de vida para filhos é controverso em planejamento financeiro — a função principal do seguro é proteger dependentes de quem falece, e filhos não têm dependentes.

**Quando pode fazer sentido:**
- **Trava de insurabilidade:** Alguns produtos permitem contratar para o filho hoje e garantir que, quando adulto, terá cobertura independentemente do estado de saúde futuro. Útil se há histórico familiar forte de doenças genéticas.
- **Aceleração por doenças graves:** Se o filho desenvolver leucemia ou doença grave, a indenização cobre tratamento sem comprometer o patrimônio familiar.
- **Cobertura de funeral:** Para famílias que não têm reserva líquida para gastos imediatos.

**Quando não faz sentido:** Como objetivo principal de proteger renda familiar — o filho não tem renda. O dinheiro do prêmio é melhor aplicado em cobertura adequada para os pais.`,
      },
      {
        heading: 'Seguro vida casal: individual ou conjunto',
        body: `**Apólices individuais (recomendado para a maioria):**
Cada cônjuge tem sua própria apólice com seus beneficiários designados. Em caso de morte de um, o outro recebe independentemente. É mais flexível, especialmente em caso de divórcio.

**Apólice conjunta (first-to-die):**
Paga ao primeiro cônjuge que falecer. Geralmente mais barata que duas apólices separadas para o mesmo capital total, mas oferece proteção apenas para um evento.

**Apólice conjunta (second-to-die/survivorship):**
Paga somente quando ambos falecem. Usada exclusivamente para planejamento sucessório — ex: proteger herança para filhos portadores de deficiência que precisarão de cuidados após a morte de ambos os pais.

**Recomendação para casais com filhos:** Duas apólices individuais, uma para cada cônjuge, com capital calculado independentemente para cada perfil.`,
      },
      {
        heading: 'Beneficiários: como nomear corretamente',
        body: `O capital do seguro de vida é pago diretamente aos beneficiários indicados na apólice — não passa por inventário. Isso é uma grande vantagem, mas exige cuidado na nomeação.

**Regras importantes:**
- Você pode nomear qualquer pessoa como beneficiário — não precisa ser parente
- Defina percentuais: ex. cônjuge 60%, filhos 20% cada
- Nomeie um beneficiário substituto caso o principal já tenha falecido
- Menores de idade recebem a indenização administrada por tutor legal até a maioridade — considere isso ao nomear filhos pequenos

**Erros comuns:**
- Não atualizar após divórcio: o ex-cônjuge permanece beneficiário se não for removido
- Nomear o espólio como beneficiário: o capital entra no inventário, perde a vantagem de liquidez imediata
- Esquecer de atualizar após nascimento de filhos adicionais

**Atualize os beneficiários a cada grande evento de vida:** casamento, divórcio, nascimento de filho, falecimento de beneficiário nomeado.`,
      },
    ],
    keyTakeaways: [
      'Segurar o cônjuge cuidador é tão importante quanto o provedor: substituição de cuidados pode custar R$6–9k/mês',
      'Para mulher de 33 anos sem comorbidades: R$500k de cobertura por 15 anos custa R$35–60/mês',
      'Duas apólices individuais são mais flexíveis do que apólice conjunta — especialmente se houver divórcio',
      'Atualize beneficiários após cada evento de vida: divórcio, casamento, nascimento de filhos',
    ],
    relatedSlugs: ['guia-completo', 'capital-segurado', 'por-idade', 'quanto-custa'],
  },

  {
    slug: 'para-mulheres',
    title: 'Seguro de Vida para Mulheres: Coberturas Específicas e Vantagens 2026',
    metaTitle: 'Seguro de Vida para Mulheres 2026 | Coberturas e Preços',
    description:
      'Mulheres pagam menos pelo seguro de vida e têm direito a coberturas específicas como doenças femininas e proteção na maternidade. Veja o que contratar.',
    tag: 'Por Perfil',
    updatedOn: '2026-04-11',
    readingTimeMin: 5,
    intro:
      'Mulheres têm duas vantagens no seguro de vida: pagam prêmios 15–25% menores (menor mortalidade estatística) e têm acesso a coberturas específicas para doenças femininas e maternidade. Apesar disso, seguros para mulheres são sistematicamente subestimados — especialmente para quem não é a principal provedora de renda.',
    sections: [
      {
        heading: 'Por que mulheres pagam menos pelo seguro de vida',
        body: `A esperança de vida das mulheres brasileiras é de 80,3 anos, contra 73,4 anos para homens (IBGE 2025). Essa diferença de 7 anos se traduz diretamente em menor risco atuarial — e, portanto, prêmios menores.

Para o mesmo capital, prazo e perfil de saúde, mulheres pagam em média 18–25% menos que homens. Para um contrato de R$500.000 por 20 anos:
- Homem, 35 anos: R$95–145/mês
- Mulher, 35 anos: R$72–115/mês

Essa vantagem é maior nas faixas etárias mais jovens e diminui após os 60 anos, quando as taxas de mortalidade convertem.`,
      },
      {
        heading: 'Coberturas específicas para mulheres',
        body: `**Doenças femininas (alguns produtos):**
Alguns planos incluem ou permitem adicionar cobertura específica para doenças com maior prevalência feminina: câncer de mama, câncer cervical, câncer de ovário, endometriose severa. A cobertura paga indenização em vida ao diagnóstico confirmado.

**Proteção na maternidade:**
Algumas apólices incluem cobertura para complicações graves da gravidez — eclampsia, embolia pulmonar obstétrica, sepse pós-parto. O seguro paga uma indenização por invalidez temporária ou por diagnóstico de condição grave.

**Reconstrução mamária após câncer:**
Produtos premium de algumas seguradoras incluem cobertura específica para custeio de reconstrução mamária após mastectomia — despesa que planos de saúde frequentemente cobrem parcialmente ou com grande burocracia.

**Atenção:** Gravidez em si não é evento coberto pelo seguro de vida — não confundir com seguro saúde ou seguro maternidade.`,
      },
      {
        heading: 'A mulher como provedora principal: proteção adequada',
        body: `O Brasil tem 16,5 milhões de famílias chefiadas por mulheres (IBGE 2024) — 29% de todos os arranjos familiares. Para mulheres que são as principais provedoras de renda, o dimensionamento do capital segurado deve seguir o mesmo método DIME aplicado a qualquer provedor.

**Situação comum e subestimada:**
- Mulher divorciada com 2 filhos, renda de R$7.000/mês
- Sem cônjuge para garantir renda em caso de falecimento
- Capital adequado: R$700.000–R$1.200.000
- Custo: R$55–110/mês (mulher, 38 anos, sem comorbidades)

O seguro de vida para mães solo é talvez o produto financeiro de maior urgência — sem ele, a família fica sem renda e sem proteção simultaneamente.`,
      },
    ],
    keyTakeaways: [
      'Mulheres pagam 18–25% menos pelo mesmo capital — a vantagem actuarial é real e significativa',
      'Câncer de mama e câncer cervical podem ser cobertos por adicionais de doenças femininas — verifique a apólice',
      'Mães solo têm a necessidade mais urgente: sem o seguro, a família perde renda e proteção ao mesmo tempo',
      'Cônjuge cuidador: mesmo sem renda própria, a substituição dos cuidados justifica cobertura de R$500k+',
    ],
    relatedSlugs: ['guia-completo', 'para-familia', 'doencas-graves', 'quanto-custa'],
  },

  {
    slug: 'para-empresas',
    title: 'Seguro de Vida Empresarial: Proteção para Sócios e Funcionários-Chave',
    metaTitle: 'Seguro de Vida Empresarial 2026 | Sócios e Funcionários-Chave',
    description:
      'Como o seguro de vida protege empresas com o seguro sócio-a-sócio e de pessoa-chave. Veja como funciona, quanto custa e quando é indispensável.',
    tag: 'Empresas',
    updatedOn: '2026-04-11',
    readingTimeMin: 6,
    intro:
      'Quando um sócio ou funcionário-chave morre, a empresa enfrenta dois problemas simultâneos: a perda da competência crítica e o risco de conflito societário com herdeiros que têm direito às cotas mas não necessariamente querem — ou podem — administrar o negócio.',
    sections: [
      {
        heading: 'Seguro sócio-a-sócio: como funciona',
        body: `O seguro sócio-a-sócio (ou seguro de compra e venda de cotas) é um mecanismo onde cada sócio segura a vida dos outros, sendo beneficiário da apólice.

**Dinâmica:** Se a empresa tem dois sócios de 50% cada e um falece, o sócio sobrevivente recebe o capital segurado e usa esse recurso para comprar as cotas dos herdeiros pelo valor pré-acordado — normalmente definido em acordo parassocial ou contrato social.

**Por que é essencial:**
- Evita que herdeiros sem interesse no negócio se tornem sócios indesejados
- Garante ao sócio sobrevivente controle total sem precisar se endividar para comprar as cotas
- Evita litígios e disputas com a família do sócio falecido
- Dá aos herdeiros liquidez imediata — recebem dinheiro em vez de cota ilíquida

**Capital a segurar:** Valor de mercado da participação de cada sócio. Para empresas sem valuation formal, use 3–5x o lucro anual da empresa como aproximação.`,
      },
      {
        heading: 'Seguro de pessoa-chave (key person)',
        body: `O seguro de pessoa-chave cobre o risco de morte ou invalidez de um funcionário cuja saída causaria dano financeiro relevante para o empresa.

**Exemplos típicos de pessoa-chave:**
- Diretor comercial responsável por 60% da receita
- Desenvolvedor-chefe de startup de tecnologia
- Médico especialista principal de clínica
- Gestor com relacionamentos únicos com grandes clientes

**Como funciona:** A empresa contrata a apólice e é beneficiária. Se a pessoa-chave morre ou fica permanentemente inválida, a empresa recebe o capital para: contratar e treinar substituto, cobrir receita perdida durante a transição, honrar compromissos com clientes.

**Capital sugerido:** 1–3 anos da receita que a pessoa-chave gera ou influencia diretamente. Para um diretor comercial que gera R$2M/ano em contratos, capital de R$2M–R$4M é justificado.

**Benefício tributário:** O prêmio pode ser deduzido como despesa operacional pela empresa (consulte contador para verificar elegibilidade na sua estrutura).`,
      },
      {
        heading: 'Seguro de vida em grupo: benefício para funcionários',
        body: `O seguro de vida em grupo é contratado pela empresa para todos (ou parte) dos funcionários, com custo por trabalhador muito menor do que apólices individuais — a economia de escala em grupo pode chegar a 40–60%.

**Estrutura típica:**
- Capital segurado: múltiplo do salário (geralmente 12–36x o salário mensal)
- Beneficiários: designados pelo funcionário
- Prêmio: pago pela empresa ou compartilhado (empresa + funcionário)
- Portabilidade: ao sair da empresa, o funcionário pode migrar para apólice individual sem nova análise de saúde (portabilidade SUSEP)

**Por que oferecer:**
- Diferencial de atração e retenção de talentos (especialmente para PMEs que competem com grandes empresas)
- Custo dedutível pelo IRPJ como benefício a funcionários
- Demonstração de cuidado com o colaborador — impacto direto em NPS interno`,
      },
    ],
    keyTakeaways: [
      'Seguro sócio-a-sócio evita que herdeiros sem experiência se tornem sócios forçados — protege o negócio e a família',
      'Capital para seguro de pessoa-chave: 1–3 anos da receita que o profissional gera ou influencia',
      'Seguro de vida em grupo é 40–60% mais barato que apólices individuais — excelente custo-benefício como benefício corporativo',
      'O prêmio do seguro empresarial pode ser dedutível como despesa operacional — verifique com contador',
    ],
    relatedSlugs: ['guia-completo', 'quanto-custa', 'prazo-vs-vitalicio', 'capital-segurado'],
  },

  {
    slug: 'invalidez-total',
    title: 'Invalidez Permanente Total: O Que Cobre e Como Funciona a Indenização',
    metaTitle: 'Invalidez Permanente Total Seguro de Vida | Como Funciona 2026',
    description:
      'Entenda como funciona a cobertura de invalidez permanente total e parcial no seguro de vida, o que é necessário para acionar e quanto você recebe.',
    tag: 'Coberturas',
    updatedOn: '2026-04-11',
    readingTimeMin: 5,
    intro:
      'A invalidez permanente pode ser mais financeiramente devastadora do que a morte — você ainda tem custos de vida, mas não consegue mais trabalhar. A probabilidade de ficar inválido antes dos 65 anos é de 1 em 4 no Brasil (IBGE), significativamente maior do que a probabilidade de morrer no mesmo período.',
    sections: [
      {
        heading: 'Tipos de invalidez cobertos pelo seguro de vida',
        body: `**Invalidez Permanente Total por Acidente (IPTA):**
A cobertura mais básica, presente em quase todos os seguros. Cobre perda total e permanente da capacidade de trabalho decorrente de acidente. Paga 100% do capital segurado.

**Invalidez Permanente Total por Doença (IPTD):**
Cobertura adicional (nem sempre incluída no plano básico). Cobre incapacidade total causada por doença — AVC com sequelas graves, esclerose múltipla avançada, câncer com sequelas permanentes. Fundamental — a maioria das invalidez no Brasil é por doença, não acidente.

**Invalidez Permanente Parcial por Acidente (IPPA):**
Paga proporcionalmente à gravidade da perda funcional. A SUSEP estabelece uma tabela padrão: perda de um dedo = X% do capital, perda de um membro = Y%, perda de visão de um olho = Z%. Consulte a tabela específica da sua apólice.

**Invalidez Laborativa Definitiva (ILD):**
Produto mais moderno — cobre a incapacidade para exercer sua profissão específica, mesmo que você possa fazer outra coisa. Um cirurgião que perde um dedo pode ser indenizado pela ILD mesmo que possa trabalhar como clínico geral.`,
      },
      {
        heading: 'O que é necessário para acionar a cobertura',
        body: `Para acionar a cobertura de invalidez, o segurado precisa comprovar:

**1. Diagnóstico médico:** Laudo de especialista documentando a condição com CID (Classificação Internacional de Doenças) e grau de limitação funcional.

**2. Caráter permanente:** A invalidez deve ser permanente — não pode ser recuperável com tratamento. Algumas seguradoras exigem aguardar o fim do período de reabilitação antes de pagar.

**3. Avaliação da seguradora:** A seguradora pode solicitar exame por perito próprio — você tem o direito de indicar seu próprio perito se discordar do laudo da seguradora.

**Prazo:** Seguradoras têm 30 dias para analisar a documentação completa e 30 dias adicionais para efetuar o pagamento após aprovação.

**Documentos típicos:** Laudos médicos + exames que comprovam o diagnóstico, laudo do INSS se já aprovado auxílio (reforça a comprovação), documentos pessoais e número da apólice.`,
      },
      {
        heading: 'O problema do "inválido funcional" e a ILD',
        body: `A cobertura de invalidez padrão tem uma limitação importante: ela paga pelo que você "perdeu" fisicamente (membro, visão, audição), não pelo impacto na sua capacidade de ganhar renda específica.

**Exemplo:** Pianista profissional com amputação do dedo mínimo. Pela tabela de invalidez parcial por acidente, a perda representa talvez 5–8% do capital segurado. Mas para o pianista, significa o fim da carreira.

A Invalidez Laborativa Definitiva (ILD) resolve isso: ela é acionada quando você não pode mais exercer sua profissão habitual, independentemente de poder fazer outra coisa. Para profissionais com profissões altamente especializadas (médicos, músicos, atletas, pilotos), a ILD é um adicional valioso.

Verifique se sua apólice inclui ILD ou apenas IPTA/IPTD — a diferença pode ser enorme na prática.`,
      },
    ],
    keyTakeaways: [
      '1 em 4 brasileiros ficará inválido antes dos 65 anos — a probabilidade supera a de morte no mesmo período',
      'Invalidez por doença (IPTD) deve estar incluída — a maioria das invalidez não é por acidente',
      'Invalidez Laborativa Definitiva (ILD) é essencial para profissionais com especialização única',
      'A seguradora tem 30 dias para analisar + 30 dias para pagar após aprovação — cobrar esses prazos',
    ],
    relatedSlugs: ['guia-completo', 'doencas-graves', 'para-familia', 'quanto-custa'],
  },

  {
    slug: 'autonomos-e-mei',
    title: 'Seguro de Vida para Autônomos, Freelancers e MEIs: Guia 2026',
    metaTitle: 'Seguro de Vida para Autônomo e MEI 2026 | O Que Contratar',
    description:
      'Autônomos e MEIs não têm FGTS nem licença remunerada. Veja como estruturar proteção de renda com seguro de vida, acidentes pessoais e invalidez.',
    tag: 'Por Perfil',
    updatedOn: '2026-04-11',
    readingTimeMin: 7,
    intro:
      'Para autônomos e MEIs, o seguro de vida não é apenas proteção familiar — é proteção do próprio negócio. Sem você, não há renda. Sem renda, não há empresa. A estrutura de proteção para trabalhadores independentes precisa cobrir tanto o risco de morte quanto o de afastamento temporário.',
    sections: [
      {
        heading: 'O que o INSS do MEI cobre (e o que não cobre)',
        body: `O MEI paga 5% do salário mínimo de INSS (R$75,60/mês em 2026), o que dá direito a:
- Aposentadoria por idade (65 anos H, 62 anos M) com 1 salário mínimo
- Auxílio-doença após 12 meses de contribuição — paga 1 salário mínimo enquanto afastado
- Salário-maternidade para MEI mulher
- Pensão por morte para dependentes (1 salário mínimo)

**O que o INSS do MEI não cobre:**
- Aposentadoria por tempo de contribuição — não há carência cumprida para isso
- Invalidez parcial — só paga invalidez total
- Afastamento por acidente nos primeiros 12 meses
- Renda acima de 1 salário mínimo em qualquer evento

**Conclusão:** Se sua renda é de R$5.000/mês ou mais, o INSS do MEI cobre menos de 25% da renda em caso de afastamento. A diferença precisa ser coberta com seguro privado.`,
      },
      {
        heading: 'A stack de proteção recomendada para autônomos',
        body: `**Camada 1 — Seguro de Vida com Invalidez por Doença:**
Protege dependentes em caso de morte e paga capital em caso de invalidez permanente por doença ou acidente. Capital mínimo: 5–8x a renda anual. Custo estimado para autônomo de 35 anos sem comorbidades, capital R$500.000: R$90–130/mês.

**Camada 2 — Acidentes Pessoais com Diária de Incapacidade Temporária (DIT):**
Para profissões com risco físico (pedreiro, eletricista, motorista, entregador): o AP cobre morte e invalidez por acidente. A DIT paga um valor diário (ex: R$100/dia) enquanto você estiver afastado por acidente — essencial para quem não tem reserva para meses sem renda. Custo: R$30–80/mês.

**Camada 3 — Reserva de emergência:**
Não é seguro, mas é parte da proteção: 6–12 meses de despesas pessoais em aplicação líquida. Cobre afastamentos curtos sem precisar acionar seguro.

**Total estimado para proteção adequada:** R$120–210/mês para autônomo de 35 anos — ou 2–4% da renda de R$5.000/mês.`,
      },
      {
        heading: 'Declaração de saúde: cuidados específicos para autônomos',
        body: `Autônomos frequentemente têm hábitos de vida que impactam o prêmio do seguro:

**Tabagismo:** Declare honestamente — fumantes pagam 50–80% mais. Se você parou há mais de 12 meses, pode declarar como ex-fumante em muitas seguradoras.

**Atividades de risco:** Se você pratica esportes de risco (moto, escalada, surf de alto rendimento) ou exerce profissão com risco elevado (trabalho em altura, eletricista, soldador), declare — apólices sem declaração de atividade de risco podem ter sinistros negados.

**Uso de veículo para trabalho:** Se você usa o carro para trabalho (entregador, representante comercial, motorista de app), isso afeta tanto o seguro auto quanto o seguro de vida — declare corretamente.

**Histórico de saúde:** Hipertensão, diabetes e histórico cardíaco são aceitos com sobreprêmio na maioria das seguradoras. Omitir para pagar menos é o erro mais comum — e o mais caro na hora do sinistro.`,
      },
      {
        heading: 'MEI: posso deduzir o prêmio do seguro no IRPF?',
        body: `**Para pessoa física (IRPF):** Prêmios de seguro de vida individual não são dedutíveis do imposto de renda da pessoa física no Brasil — diferente de outros países.

**Para MEI com CNPJ:** Se você contrata o seguro em nome do CNPJ como benefício a si mesmo (enquanto "funcionário" da empresa), pode haver tratamento diferenciado — consulte um contador, pois a dedutibilidade depende da estrutura.

**Contribuição ao INSS:** A alternativa mais eficiente do ponto de vista fiscal é aumentar a contribuição ao INSS além dos 5% obrigatórios do MEI — contribuir como autônomo adicional (11% ou 20% sobre qualquer base entre salário mínimo e teto) aumenta a cobertura previdenciária. Mas o teto do INSS ainda é insuficiente para a maioria — o seguro privado complementa.`,
      },
    ],
    keyTakeaways: [
      'INSS do MEI paga máximo 1 salário mínimo — se você ganha mais, a diferença não está coberta',
      'Stack recomendada: seguro vida + invalidez por doença + AP com DIT = R$120–210/mês para renda de R$5k',
      'DIT (Diária por Incapacidade Temporária) é o produto mais subestimado para autônomos — paga enquanto você está afastado',
      'Atividades de risco e uso comercial do veículo devem ser declarados — omissão pode invalidar o sinistro',
    ],
    relatedSlugs: ['guia-completo', 'invalidez-total', 'quanto-custa', 'doencas-graves'],
  },
];

export function getVidaGuideBySlug(slug: string): VidaGuide | undefined {
  return vidaGuides.find((g) => g.slug === slug);
}

export function getRelatedVidaGuides(slugs: string[]): VidaGuide[] {
  return slugs
    .map((s) => vidaGuides.find((g) => g.slug === s))
    .filter(Boolean) as VidaGuide[];
}

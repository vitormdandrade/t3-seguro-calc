import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import states from '../../../../data/states.json';
import insurers from '../../../../data/insurers.json';

const TIPOS = [
  {
    slug: 'seguro-auto',
    name: 'Seguro Auto',
    indexKey: 'auto_index' as const,
    baseMin: 80,
    baseMax: 400,
    icon: '🚗',
    calculadoraHref: '/calculadora/seguro-auto',
    description: (stateName: string) =>
      `Proteja seu veículo em ${stateName}. Compare cotações de seguro auto entre as principais seguradoras que atuam no estado.`,
    whyVaries: (stateName: string, index: number) =>
      `Em ${stateName}, o preço do seguro auto é ${index > 1 ? 'acima' : 'abaixo'} da média nacional (índice ${(index * 100).toFixed(0)}%). Os principais fatores são: densidade do tráfego, índice de roubos de veículos, infraestrutura das estradas e perfil de sinistros da região.`,
    coverages: [
      'Colisão e danos ao veículo',
      'Roubo e furto total ou parcial',
      'Danos a terceiros (RCF)',
      'Assistência 24h em todo o Brasil',
      'Vidros, faróis e retrovisores',
      'Defesa jurídica',
    ],
    tips: [
      'Compare pelo menos 3 cotações antes de contratar',
      'Verifique a franquia — franquias menores encarecem o prêmio',
      'Considere instalar rastreador para reduzir o prêmio',
      'Declare corretamente o CEP de pernoite do veículo',
    ],
    insurerProduct: 'auto',
  },
  {
    slug: 'seguro-vida',
    name: 'Seguro Vida',
    indexKey: 'vida_index' as const,
    baseMin: 30,
    baseMax: 300,
    icon: '❤️',
    calculadoraHref: '/calculadora/seguro-vida',
    description: (stateName: string) =>
      `Proteja sua família em ${stateName} com seguro de vida. Compare planos e coberturas das principais seguradoras.`,
    whyVaries: (stateName: string, index: number) =>
      `Em ${stateName}, o seguro de vida tem índice de custo ${(index * 100).toFixed(0)}% da média nacional. O preço varia conforme taxa de mortalidade regional, perfil epidemiológico e concorrência entre seguradoras no estado.`,
    coverages: [
      'Indenização por morte natural',
      'Morte acidental (cobertura dobrada)',
      'Invalidez permanente total ou parcial',
      'Doenças graves (câncer, AVC, infarto)',
      'Funeral assistido',
      'Cobertura para cônjuge e dependentes',
    ],
    tips: [
      'Contrate enquanto jovem — o prêmio é menor e não muda com a idade',
      'Defina o capital segurado com base na renda anual × número de dependentes',
      'Revise os beneficiários a cada grande mudança de vida',
      'Seguro de vida no trabalho geralmente não é suficiente — verifique o capital',
    ],
    insurerProduct: 'vida',
  },
  {
    slug: 'seguro-residencial',
    name: 'Seguro Residencial',
    indexKey: 'residencial_index' as const,
    baseMin: 50,
    baseMax: 250,
    icon: '🏠',
    calculadoraHref: '/calculadora/seguro-residencial',
    description: (stateName: string) =>
      `Proteja seu imóvel em ${stateName} com seguro residencial. Veja coberturas e compare preços das seguradoras do estado.`,
    whyVaries: (stateName: string, index: number) =>
      `Em ${stateName}, o seguro residencial custa ${(index * 100).toFixed(0)}% da média nacional. Os principais fatores são: risco de enchentes e desastres naturais, taxa de roubos a residências e densidade urbana da região.`,
    coverages: [
      'Incêndio, explosão e queda de raio',
      'Roubo e furto de bens',
      'Danos elétricos a equipamentos',
      'Responsabilidade civil do morador',
      'Danos por água (vazamentos e infiltrações)',
      'Assistência emergencial 24h',
    ],
    tips: [
      'Avalie o valor de reconstrução do imóvel — não confunda com valor de mercado',
      'Liste os bens a segurar: eletrodomésticos, eletrônicos, joias',
      'Verifique se o condomínio já cobre partes comuns — não pague em duplicata',
      'Inquilinos também podem contratar — protege móveis e bens pessoais',
    ],
    insurerProduct: 'residencial',
  },
  {
    slug: 'seguro-viagem',
    name: 'Seguro Viagem',
    indexKey: 'viagem_index' as const,
    baseMin: 20,
    baseMax: 200,
    icon: '✈️',
    calculadoraHref: '/calculadora/seguro-viagem',
    description: (stateName: string) =>
      `Viaje com segurança saindo de ${stateName}. Compare seguros de viagem para destinos nacionais e internacionais.`,
    whyVaries: (stateName: string, index: number) =>
      `Em ${stateName}, o seguro viagem tem demanda ${index > 1 ? 'acima' : 'abaixo'} da média (índice ${(index * 100).toFixed(0)}%). A variação de preço depende principalmente do destino e da duração da viagem — o estado de origem influencia menos que para outros tipos de seguro.`,
    coverages: [
      'Despesas médicas e hospitalares no exterior',
      'Cancelamento ou interrupção de viagem',
      'Extravio e danos à bagagem',
      'Assistência jurídica no exterior',
      'Regresso sanitário',
      'Assistência 24h por telefone',
    ],
    tips: [
      'Para Europa: mínimo de €30.000 em cobertura médica (exigência do Visto Schengen)',
      'Viagem nacional: garante cobertura em hospitais particulares fora da sua cidade',
      'Compre antes de embarcar — não é válido após o início da viagem',
      'Compare coberturas médicas, não apenas preço',
    ],
    insurerProduct: 'viagem',
  },
];

type Props = {
  params: Promise<{ uf: string; tipo: string }>;
};

export async function generateStaticParams() {
  const params: { uf: string; tipo: string }[] = [];
  for (const state of states) {
    for (const tipo of TIPOS) {
      params.push({ uf: state.uf.toLowerCase(), tipo: tipo.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uf, tipo: tipoSlug } = await params;
  const state = states.find((s) => s.uf.toLowerCase() === uf.toLowerCase());
  const tipo = TIPOS.find((t) => t.slug === tipoSlug);

  if (!state || !tipo) return { title: 'Página não encontrada' };

  const index = state[tipo.indexKey];
  const priceMin = Math.round(tipo.baseMin * index);
  const priceMax = Math.round(tipo.baseMax * index);

  return {
    title: `${tipo.name} em ${state.name} 2026 | Cotação R$${priceMin}–R$${priceMax}/mês`,
    description: `Compare ${tipo.name.toLowerCase()} em ${state.name}. Preços médios, coberturas e as melhores seguradoras que operam em ${state.capital} e no estado. Calculadora gratuita.`,
    alternates: {
      canonical: `/estado/${uf.toLowerCase()}/${tipoSlug}`,
    },
  };
}

export default async function EstadoTipoPage({ params }: Props) {
  const { uf, tipo: tipoSlug } = await params;
  const state = states.find((s) => s.uf.toLowerCase() === uf.toLowerCase());
  const tipo = TIPOS.find((t) => t.slug === tipoSlug);

  if (!state || !tipo) notFound();

  const index = state[tipo.indexKey];
  const priceMin = Math.round(tipo.baseMin * index);
  const priceMax = Math.round(tipo.baseMax * index);
  const vsMedia = ((index - 1) * 100).toFixed(0);
  const vsMediaLabel =
    index > 1.02
      ? `+${vsMedia}% acima da média`
      : index < 0.98
      ? `${vsMedia}% abaixo da média`
      : 'na média nacional';

  const stateInsurers = insurers.filter((i) =>
    i.products.includes(tipo.insurerProduct)
  );
  const otherTipos = TIPOS.filter((t) => t.slug !== tipoSlug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Quanto custa ${tipo.name} em ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `O ${tipo.name.toLowerCase()} em ${state.name} custa em média R$${priceMin} a R$${priceMax} por mês em 2026, dependendo do perfil, coberturas escolhidas e seguradora. O índice regional é ${(index * 100).toFixed(0)}% da média nacional.`,
        },
      },
      {
        '@type': 'Question',
        name: `Qual é a melhor seguradora de ${tipo.name.toLowerCase()} em ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `As principais seguradoras que operam em ${state.name} incluem Porto Seguro, Bradesco Seguros, SulAmérica e Youse. A melhor opção depende do perfil e das coberturas desejadas — use nossa calculadora para comparar.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Início</Link>
          <span>/</span>
          <Link href="/estado" className="hover:text-blue-600">Por Estado</Link>
          <span>/</span>
          <Link href={`/estado/${uf.toLowerCase()}`} className="hover:text-blue-600">{state.name}</Link>
          <span>/</span>
          <span className="text-gray-900">{tipo.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{tipo.icon}</span>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {state.name} · {state.region}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {tipo.name} em {state.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {tipo.description(state.name)}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Price card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl">
              <h2 className="text-lg font-medium mb-1 opacity-90">Faixa de preço estimada em {state.name}</h2>
              <div className="text-5xl font-bold mb-2">
                R${priceMin}–R${priceMax}
                <span className="text-2xl font-normal opacity-80">/mês</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    index > 1.02
                      ? 'bg-orange-400/20 text-orange-100'
                      : index < 0.98
                      ? 'bg-green-400/20 text-green-100'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {vsMediaLabel}
                </span>
                <span className="text-blue-200 text-sm">Índice regional: {(index * 100).toFixed(0)}% da média</span>
              </div>
              <p className="mt-4 text-blue-100 text-sm">
                Estimativa 2026. O preço final depende do seu perfil e coberturas escolhidas.
              </p>
            </div>

            {/* Why it varies */}
            <section className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Por que o {tipo.name} varia em {state.name}?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {tipo.whyVaries(state.name, index)}
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <strong>Nota sobre {state.capital}:</strong> {state.risk_note}
              </div>
            </section>

            {/* Coverages */}
            <section className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Coberturas Incluídas
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tipo.coverages.map((cov) => (
                  <div key={cov} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span className="text-gray-700">{cov}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Insurers */}
            <section className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Seguradoras em {state.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {stateInsurers.slice(0, 6).map((insurer) => (
                  <Link
                    key={insurer.slug}
                    href={`/seguradoras/${insurer.slug}`}
                    className="border border-gray-200 p-4 rounded-lg hover:shadow-md hover:border-blue-200 transition group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">
                        {insurer.name}
                      </h3>
                      <span className="text-yellow-500 text-sm">★ {insurer.rating}</span>
                    </div>
                    <span className="text-blue-600 text-sm">Ver detalhes →</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Dicas para Contratar em {state.name}
              </h2>
              <div className="space-y-4">
                {tipo.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Other insurance types for this state */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Outros Seguros em {state.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {otherTipos.map((t) => {
                  const tIndex = state[t.indexKey];
                  const tMin = Math.round(t.baseMin * tIndex);
                  const tMax = Math.round(t.baseMax * tIndex);
                  return (
                    <Link
                      key={t.slug}
                      href={`/estado/${uf.toLowerCase()}/${t.slug}`}
                      className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md hover:border-blue-200 transition text-center group"
                    >
                      <div className="text-2xl mb-2">{t.icon}</div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition text-sm mb-1">
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        R${tMin}–R${tMax}/mês
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-blue-600 text-white p-6 rounded-xl sticky top-4">
              <div className="text-3xl mb-3">{tipo.icon}</div>
              <h3 className="text-xl font-bold mb-2">Simule seu {tipo.name}</h3>
              <p className="text-blue-100 text-sm mb-5">
                Use nossa calculadora para obter uma estimativa personalizada para {state.name}.
              </p>
              <Link
                href={tipo.calculadoraHref}
                className="block w-full bg-white text-blue-700 text-center py-3 rounded-lg font-bold hover:bg-blue-50 transition"
              >
                Calcular Agora
              </Link>
              <div className="mt-4 text-xs text-blue-200 text-center">
                Gratuito · Sem cadastro · Resultado em segundos
              </div>
            </div>

            {/* State facts */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">{state.name} em Números</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Capital</dt>
                  <dd className="font-medium text-gray-900">{state.capital}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Região</dt>
                  <dd className="font-medium text-gray-900">{state.region}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">População</dt>
                  <dd className="font-medium text-gray-900">{state.population_millions}M hab.</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Índice {tipo.name}</dt>
                  <dd className={`font-bold ${index > 1.02 ? 'text-orange-600' : index < 0.98 ? 'text-green-600' : 'text-gray-900'}`}>
                    {(index * 100).toFixed(0)}%
                  </dd>
                </div>
              </dl>
            </div>

            {/* Vida guides cross-link */}
            {tipo.slug === 'seguro-vida' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="text-2xl mb-2">📖</div>
                <h3 className="font-bold text-red-900 mb-2">Guias de Seguro de Vida</h3>
                <p className="text-red-700 text-sm mb-4">
                  12 guias especializados: preços por idade, capital ideal, doenças graves e mais.
                </p>
                <Link
                  href="/seguro-vida"
                  className="block text-center bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg text-sm font-semibold transition"
                >
                  Ver todos os guias →
                </Link>
              </div>
            )}

            {/* All states link */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Compara por Estado</h3>
              <p className="text-gray-500 text-sm mb-4">
                Veja o {tipo.name.toLowerCase()} em todos os estados do Brasil.
              </p>
              <Link
                href="/estado"
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition"
              >
                Ver todos os estados →
              </Link>
            </div>
          </div>
        </div>

        {/* Other states for same tipo (internal-linking depth fix) */}
        <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-2">
            {tipo.name} em outros estados
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Compare {tipo.name.toLowerCase()} em estados vizinhos e principais
            capitais.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {states
              .filter((s) => s.uf !== uf.toUpperCase())
              .slice(0, 12)
              .map((s) => (
                <Link
                  key={s.uf}
                  href={`/estado/${s.uf.toLowerCase()}/${tipo.slug}`}
                  className="block text-sm text-gray-700 hover:text-blue-600 hover:underline px-2 py-1"
                >
                  {tipo.name} em {s.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

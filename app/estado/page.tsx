import { Metadata } from 'next';
import Link from 'next/link';
import states from '../../data/states.json';

export const metadata: Metadata = {
  title: 'Seguro por Estado | Compare Preços em Todo o Brasil 2026',
  description:
    'Compare preços de seguro auto, vida, residencial e viagem em todos os 27 estados do Brasil. Índices regionais, seguradoras locais e calculadoras gratuitas.',
  alternates: { canonical: '/estado' },
};

const REGIONS = ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'] as const;

const TIPOS = [
  { slug: 'seguro-auto', name: 'Auto', icon: '🚗', indexKey: 'auto_index' as const },
  { slug: 'seguro-vida', name: 'Vida', icon: '❤️', indexKey: 'vida_index' as const },
  { slug: 'seguro-residencial', name: 'Residencial', icon: '🏠', indexKey: 'residencial_index' as const },
  { slug: 'seguro-viagem', name: 'Viagem', icon: '✈️', indexKey: 'viagem_index' as const },
];

function IndexBadge({ index }: { index: number }) {
  const pct = (index * 100).toFixed(0);
  if (index > 1.05)
    return <span className="text-xs font-semibold text-orange-600">{pct}%</span>;
  if (index < 0.90)
    return <span className="text-xs font-semibold text-green-600">{pct}%</span>;
  return <span className="text-xs text-gray-500">{pct}%</span>;
}

export default function EstadoIndex() {
  const byRegion = REGIONS.map((region) => ({
    region,
    states: states.filter((s) => s.region === region),
  }));

  const avgAuto = (states.reduce((s, st) => s + st.auto_index, 0) / states.length).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex gap-2">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span>/</span>
        <span className="text-gray-900">Seguro por Estado</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Seguro por Estado no Brasil
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          O preço do seguro varia significativamente entre estados. Escolha seu estado para ver os índices regionais, preços estimados e seguradoras que operam na sua região.
        </p>
      </div>

      {/* Quick facts bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-700">27</div>
          <div className="text-sm text-blue-600 mt-1">Estados cobertos</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-700">4</div>
          <div className="text-sm text-blue-600 mt-1">Tipos de seguro</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-700">108</div>
          <div className="text-sm text-blue-600 mt-1">Comparações estado+tipo</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-700">{avgAuto}x</div>
          <div className="text-sm text-blue-600 mt-1">Índice médio auto</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
        <span className="text-gray-500 font-medium">Legenda de índice:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>
          <span className="text-gray-600">Acima da média (&gt;105%)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span className="text-gray-600">Abaixo da média (&lt;90%)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gray-400 inline-block"></span>
          <span className="text-gray-600">Na média (90–105%)</span>
        </span>
      </div>

      {/* States by region */}
      {byRegion.map(({ region, states: regionStates }) => (
        <section key={region} className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            {region}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionStates.map((state) => (
              <Link
                key={state.uf}
                href={`/estado/${state.uf.toLowerCase()}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition">
                      {state.name}
                    </div>
                    <div className="text-sm text-gray-500">{state.capital}</div>
                  </div>
                  <div className="text-2xl font-black text-gray-200 group-hover:text-blue-100 transition">
                    {state.uf}
                  </div>
                </div>

                {/* Per-type index pills */}
                <div className="grid grid-cols-4 gap-1">
                  {TIPOS.map((tipo) => (
                    <div key={tipo.slug} className="text-center">
                      <div className="text-base mb-0.5">{tipo.icon}</div>
                      <IndexBadge index={state[tipo.indexKey]} />
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    {state.population_millions}M hab.
                  </div>
                  <span className="text-blue-500 text-xs font-medium">
                    Ver cotações →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-10 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-3">Calcule seu seguro gratuitamente</h2>
        <p className="text-blue-200 mb-6">
          Escolha o tipo de seguro e simule em segundos. Sem cadastro.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {TIPOS.map((tipo) => (
            <Link
              key={tipo.slug}
              href={`/calculadora/${tipo.slug}`}
              className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition text-sm"
            >
              {tipo.icon} {tipo.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import states from '../../../data/states.json';

const TIPOS = [
  {
    slug: 'seguro-auto',
    name: 'Seguro Auto',
    icon: '🚗',
    indexKey: 'auto_index' as const,
    baseMin: 80,
    baseMax: 400,
    description: 'Proteção para seu veículo contra colisões, roubo e danos a terceiros.',
  },
  {
    slug: 'seguro-vida',
    name: 'Seguro Vida',
    icon: '❤️',
    indexKey: 'vida_index' as const,
    baseMin: 30,
    baseMax: 300,
    description: 'Proteção financeira para você e sua família em caso de morte ou invalidez.',
  },
  {
    slug: 'seguro-residencial',
    name: 'Seguro Residencial',
    icon: '🏠',
    indexKey: 'residencial_index' as const,
    baseMin: 50,
    baseMax: 250,
    description: 'Proteção para seu imóvel contra incêndios, roubos e danos elétricos.',
  },
  {
    slug: 'seguro-viagem',
    name: 'Seguro Viagem',
    icon: '✈️',
    indexKey: 'viagem_index' as const,
    baseMin: 20,
    baseMax: 200,
    description: 'Cobertura médica e de emergências para viagens nacionais e internacionais.',
  },
];

type Props = {
  params: Promise<{ uf: string }>;
};

export async function generateStaticParams() {
  return states.map((s) => ({ uf: s.uf.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uf } = await params;
  const state = states.find((s) => s.uf.toLowerCase() === uf.toLowerCase());
  if (!state) return { title: 'Estado não encontrado' };
  return {
    title: `Seguro em ${state.name} 2026 | Auto, Vida, Residencial e Viagem`,
    description: `Compare seguros em ${state.name}. Preços médios de seguro auto, vida, residencial e viagem para ${state.capital} e todo o estado em 2026.`,
    alternates: { canonical: `/estado/${uf.toLowerCase()}` },
  };
}

export default async function EstadoHub({ params }: Props) {
  const { uf } = await params;
  const state = states.find((s) => s.uf.toLowerCase() === uf.toLowerCase());
  if (!state) notFound();

  // Nearby states in same region for internal linking
  const sameRegion = states
    .filter((s) => s.region === state.region && s.uf !== state.uf)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex gap-2 flex-wrap">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span>/</span>
        <Link href="/estado" className="hover:text-blue-600">Por Estado</Link>
        <span>/</span>
        <span className="text-gray-900">{state.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          {state.region} · {state.population_millions}M habitantes
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Seguro em {state.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Compare preços de seguro auto, vida, residencial e viagem em {state.name}. Veja os índices regionais e as seguradoras que atuam em {state.capital}.
        </p>
      </div>

      {/* State risk note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <div className="flex items-start gap-3">
          <span className="text-amber-600 text-xl mt-0.5">ℹ</span>
          <div>
            <p className="font-semibold text-amber-900 mb-1">Perfil de risco: {state.name}</p>
            <p className="text-amber-800 text-sm">{state.risk_note}</p>
          </div>
        </div>
      </div>

      {/* Insurance type cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Tipos de Seguro em {state.name}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {TIPOS.map((tipo) => {
            const index = state[tipo.indexKey];
            const priceMin = Math.round(tipo.baseMin * index);
            const priceMax = Math.round(tipo.baseMax * index);
            const vsMedia = ((index - 1) * 100).toFixed(0);
            const aboveAvg = index > 1.02;
            const belowAvg = index < 0.98;

            return (
              <Link
                key={tipo.slug}
                href={`/estado/${uf.toLowerCase()}/${tipo.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tipo.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                      {tipo.name}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      aboveAvg
                        ? 'bg-orange-100 text-orange-700'
                        : belowAvg
                        ? 'bg-accent-soft text-accent'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {aboveAvg ? `+${vsMedia}%` : belowAvg ? `${vsMedia}%` : 'Na média'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{tipo.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      R${priceMin}–R${priceMax}
                      <span className="text-base font-normal text-gray-500">/mês</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Índice regional: {(index * 100).toFixed(0)}% da média
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
                    Ver detalhes →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* States in same region */}
      {sameRegion.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Outros estados do {state.region}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sameRegion.map((s) => (
              <Link
                key={s.uf}
                href={`/estado/${s.uf.toLowerCase()}`}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md hover:border-blue-200 transition"
              >
                <div className="font-bold text-gray-900 text-lg">{s.uf}</div>
                <div className="text-sm text-gray-500">{s.name}</div>
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <Link href="/estado" className="text-blue-600 text-sm hover:underline">
              Ver todos os estados →
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-blue-900 text-white p-10 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-3">Calcule o seu seguro agora</h2>
        <p className="text-blue-200 mb-6 text-lg">
          Nossas calculadoras são gratuitas e não exigem cadastro.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/calculadora/seguro-auto"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Seguro Auto
          </Link>
          <Link
            href="/calculadora/seguro-vida"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Seguro Vida
          </Link>
          <Link
            href="/calculadora/seguro-residencial"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Seguro Residencial
          </Link>
          <Link
            href="/calculadora/seguro-viagem"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Seguro Viagem
          </Link>
        </div>
      </section>
    </div>
  );
}

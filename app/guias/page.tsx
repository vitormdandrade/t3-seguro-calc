import { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '../../data/guides';

export const metadata: Metadata = {
  title: 'Guias de Seguros no Brasil | SUSEP, Sinistros e Como Contratar 2026',
  description:
    'Guias completos sobre seguros no Brasil. Aprenda sobre SUSEP, Reclame Aqui das seguradoras, como acionar sinistros e calcular a franquia ideal.',
  alternates: { canonical: '/guias' },
};

const CATEGORY_COLORS: Record<string, string> = {
  trust: 'bg-purple-100 text-purple-700',
  auto: 'bg-blue-100 text-blue-700',
  vida: 'bg-red-100 text-red-700',
  residencial: 'bg-green-100 text-green-700',
  viagem: 'bg-amber-100 text-amber-700',
  geral: 'bg-gray-100 text-gray-700',
};

export default function Guias() {
  const trustGuides = guides.filter((g) => g.category === 'trust');
  const otherGuides = guides.filter((g) => g.category !== 'trust');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex gap-2">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span>/</span>
        <span className="text-gray-900">Guias</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Guias de Seguros
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Aprenda como funciona o mercado de seguros no Brasil, seus direitos como consumidor e como comparar seguradoras de forma inteligente.
        </p>
      </div>

      {/* Trust signal guides — featured */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🔐</span>
          <h2 className="text-xl font-bold text-gray-900">Confiança & Regulação</h2>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold ml-1">Essencial antes de contratar</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {trustGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-400 transition group"
            >
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                {guide.categoryLabel}
              </span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition mt-3 mb-2 leading-snug">
                {guide.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {guide.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{guide.readingTimeMin} min</span>
                <span className="text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                  Ler guia →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All other guides */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Todos os Guias
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {otherGuides.map((guide) => {
            const catColor = CATEGORY_COLORS[guide.category] ?? CATEGORY_COLORS.geral;
            return (
              <Link
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg hover:border-blue-200 transition group flex gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColor}`}>
                      {guide.categoryLabel}
                    </span>
                    <span className="text-xs text-gray-400">{guide.readingTimeMin} min</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition mb-1 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{guide.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-blue-900 text-white p-10 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-3">Calcule seu seguro agora</h2>
        <p className="text-blue-200 mb-6">
          Use nossas calculadoras gratuitas — sem cadastro, resultado em segundos.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/calculadora/seguro-auto" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
            🚗 Seguro Auto
          </Link>
          <Link href="/calculadora/seguro-vida" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
            ❤️ Seguro Vida
          </Link>
          <Link href="/estado" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition">
            🗺️ Por Estado
          </Link>
        </div>
      </div>
    </div>
  );
}

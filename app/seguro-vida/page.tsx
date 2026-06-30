import { Metadata } from 'next';
import Link from 'next/link';
import { vidaGuides } from '../../data/vida-guides';

export const metadata: Metadata = {
  title: 'Seguro de Vida no Brasil 2026: Guias Completos | Calculaseguro',
  description:
    'Tudo sobre seguro de vida no Brasil: preços por idade, como calcular o capital certo, comparativo de seguradoras e guias por perfil. Conteúdo baseado em dados da SUSEP.',
  alternates: { canonical: '/seguro-vida' },
};

const TAG_COLORS: Record<string, string> = {
  'Guia Mestre': 'bg-red-100 text-red-700 border-red-200',
  'Preços': 'bg-amber-100 text-amber-700 border-amber-200',
  'Planejamento': 'bg-blue-100 text-blue-700 border-blue-200',
  'Por Perfil': 'bg-accent-soft text-accent border-green-200',
  'Coberturas': 'bg-purple-100 text-purple-700 border-purple-200',
  'Comparativo': 'bg-sky-100 text-sky-700 border-sky-200',
  'Empresas': 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function SeguroVidaHub() {
  const masterGuide = vidaGuides.find((g) => g.tag === 'Guia Mestre');
  const otherGuides = vidaGuides.filter((g) => g.tag !== 'Guia Mestre');

  const byTag: Record<string, typeof vidaGuides> = {};
  otherGuides.forEach((g) => {
    if (!byTag[g.tag]) byTag[g.tag] = [];
    byTag[g.tag].push(g);
  });

  const tagOrder = ['Preços', 'Planejamento', 'Por Perfil', 'Coberturas', 'Comparativo', 'Empresas'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Seguro de Vida no Brasil — Guias Completos 2026',
    description: 'Coleção de guias sobre seguro de vida no Brasil: preços, coberturas, comparativos e perfis.',
    url: 'https://calculaseguro.com.br/seguro-vida',
    publisher: {
      '@type': 'Organization',
      name: 'Calculaseguro',
      url: 'https://calculaseguro.com.br',
    },
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
          <span className="text-gray-900">Seguro de Vida</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">❤️</span>
            <span className="text-xs font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
              {vidaGuides.length} guias especializados
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Seguro de Vida no Brasil
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Tudo que você precisa para entender, comparar e contratar o seguro de vida certo para o seu perfil — com dados reais do mercado brasileiro de 2026.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Guias detalhados', value: vidaGuides.length.toString() },
            { label: 'Seguradoras analisadas', value: '8+' },
            { label: 'Faixas etárias cobertas', value: '25–65' },
            { label: 'Perfis específicos', value: '5' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Master guide — featured */}
        {masterGuide && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📖</span>
              <h2 className="text-xl font-bold text-gray-900">Comece por aqui</h2>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold ml-1">
                Guia Mestre
              </span>
            </div>
            <Link
              href={`/seguro-vida/${masterGuide.slug}`}
              className="block bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-8 hover:from-red-700 hover:to-red-900 transition group"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                    {masterGuide.tag} · {masterGuide.readingTimeMin} min
                  </span>
                  <h3 className="text-2xl font-bold mt-3 mb-3 leading-snug group-hover:underline">
                    {masterGuide.title}
                  </h3>
                  <p className="text-red-100 leading-relaxed max-w-xl">
                    {masterGuide.description}
                  </p>
                </div>
                <span className="text-4xl group-hover:translate-x-2 transition-transform inline-block self-center">
                  →
                </span>
              </div>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2">
                {masterGuide.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-100">
                    <span className="text-white font-bold mt-0.5">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Link>
          </section>
        )}

        {/* Guides by tag */}
        {tagOrder.map((tag) => {
          const tagGuides = byTag[tag];
          if (!tagGuides || tagGuides.length === 0) return null;
          const colorClass = TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-700 border-gray-200';
          return (
            <section key={tag} className="mb-10">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                <h2 className="text-lg font-bold text-gray-900">{tag}</h2>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
                  {tagGuides.length} {tagGuides.length === 1 ? 'guia' : 'guias'}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {tagGuides.map((guide) => {
                  const tc = TAG_COLORS[guide.tag] ?? 'bg-gray-100 text-gray-700 border-gray-200';
                  return (
                    <Link
                      key={guide.slug}
                      href={`/seguro-vida/${guide.slug}`}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-red-200 transition group flex gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tc}`}>
                            {guide.tag}
                          </span>
                          <span className="text-xs text-gray-400">{guide.readingTimeMin} min</span>
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition mb-1 leading-snug">
                          {guide.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                          {guide.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center">
                        <span className="text-red-400 group-hover:translate-x-1 transition-transform inline-block text-lg">
                          →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Calculator CTA */}
        <div className="bg-red-700 text-white p-10 rounded-2xl text-center mt-4">
          <h2 className="text-3xl font-bold mb-3">Calcule o preço do seu seguro de vida agora</h2>
          <p className="text-red-200 mb-6 max-w-xl mx-auto">
            Nossa calculadora gratuita estima o prêmio com base no seu perfil, sem cadastro e sem compromisso.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/calculadora/seguro-vida"
              className="bg-white text-red-700 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition text-lg"
            >
              ❤️ Calcular agora
            </Link>
            <Link
              href="/estado"
              className="bg-red-600 text-white border border-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
            >
              🗺️ Ver preços por estado
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

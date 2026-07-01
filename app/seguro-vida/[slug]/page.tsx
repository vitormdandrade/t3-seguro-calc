import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { vidaGuides, getVidaGuideBySlug, getRelatedVidaGuides } from '../../../data/vida-guides';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return vidaGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getVidaGuideBySlug(slug);
  if (!guide) return { title: 'Guia não encontrado' };
  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: `/seguro-vida/${slug}` },
  };
}

const TAG_COLORS: Record<string, string> = {
  'Guia Mestre': 'bg-teal-100 text-teal-700',
  'Preços': 'bg-amber-100 text-amber-700',
  'Planejamento': 'bg-teal-50 text-teal-700',
  'Por Perfil': 'bg-accent-soft text-accent',
  'Coberturas': 'bg-teal-100 text-teal-700',
  'Comparativo': 'bg-teal-50 text-teal-700',
  'Empresas': 'bg-amber-100 text-amber-700',
};

export default async function VidaGuideDetail({ params }: Props) {
  const { slug } = await params;
  const guide = getVidaGuideBySlug(slug);
  if (!guide) notFound();

  const related = getRelatedVidaGuides(guide.relatedSlugs);
  const tagColor = TAG_COLORS[guide.tag] ?? 'bg-gray-100 text-gray-700';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedOn,
    author: { '@type': 'Organization', name: 'Calculaseguro' },
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-teal-600">Início</Link>
          <span>/</span>
          <Link href="/seguro-vida" className="hover:text-teal-600">Seguro de Vida</Link>
          <span>/</span>
          <span className="text-gray-900 line-clamp-1">{guide.title}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColor}`}>
              {guide.tag}
            </span>
            <span className="text-sm text-gray-500">
              Atualizado em {new Date(guide.updatedOn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-sm text-gray-500">· {guide.readingTimeMin} min de leitura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug mb-4">
            {guide.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {guide.intro}
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
            <span>✦</span> Pontos Principais
          </h2>
          <ul className="space-y-3">
            {guide.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-teal-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                <span className="text-teal-900 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <article className="prose prose-lg max-w-none">
          {guide.sections.map((section, idx) => (
            <section key={idx} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {section.heading}
              </h2>
              {section.body.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('| ')) {
                  const rows = paragraph.split('\n').filter(Boolean);
                  return (
                    <div key={pIdx} className="overflow-x-auto mb-4">
                      <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        {rows.map((row, rIdx) => {
                          if (row.startsWith('|---')) return null;
                          const cells = row.split('|').filter(Boolean).map((c) => c.trim());
                          if (rIdx === 0) {
                            return (
                              <thead key={rIdx} className="bg-gray-50">
                                <tr>
                                  {cells.map((c, cIdx) => (
                                    <th key={cIdx} className="px-4 py-2 text-left font-semibold text-gray-700">
                                      {c}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                            );
                          }
                          return (
                            <tbody key={rIdx}>
                              <tr className="border-t border-gray-100">
                                {cells.map((c, cIdx) => (
                                  <td key={cIdx} className="px-4 py-2 text-gray-700">
                                    {c}
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  );
                }

                const rendered = paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                return (
                  <p
                    key={pIdx}
                    className="text-gray-700 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: rendered }}
                  />
                );
              })}
            </section>
          ))}
        </article>

        {/* Trust footer */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-10 mb-10">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔍</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Sobre este guia</p>
              <p className="text-gray-600 text-sm">
                Produzido pela equipe editorial do Calculaseguro com base em dados públicos da SUSEP, pesquisa de mercado e fontes especializadas em seguros de vida no Brasil. Última revisão: {new Date(guide.updatedOn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}. Não substitui aconselhamento profissional — para situações específicas, consulte um corretor de seguros registrado na SUSEP.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-700 text-white p-8 rounded-xl text-center mb-10">
          <h3 className="text-2xl font-bold mb-2">Calcule o preço do seu seguro de vida</h3>
          <p className="text-teal-100 mb-6">
            Estimativa personalizada com base no seu perfil — sem cadastro, resultado em segundos.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/calculadora/seguro-vida"
              className="bg-white text-teal-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              ❤️ Calcular agora
            </Link>
            <Link
              href="/seguro-vida"
              className="bg-teal-600 border border-teal-400 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-500 transition text-sm"
            >
              Ver todos os guias
            </Link>
            <Link
              href="/estado"
              className="bg-teal-600 border border-teal-400 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-500 transition text-sm"
            >
              🗺️ Por estado
            </Link>
          </div>
        </div>

        {/* Related guides */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Guias Relacionados</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/seguro-vida/${rel.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-teal-200 transition group"
                >
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[rel.tag] ?? 'bg-gray-100 text-gray-700'}`}
                  >
                    {rel.tag}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition mt-2 text-sm leading-snug">
                    {rel.title}
                  </h3>
                  <span className="text-teal-500 text-xs mt-2 inline-block">Ler guia →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

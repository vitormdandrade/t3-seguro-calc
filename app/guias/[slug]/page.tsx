import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuideBySlug, getRelatedGuides } from '../../../data/guides';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Guia não encontrado' };
  return {
    title: `${guide.title} | Calculaseguro`,
    description: guide.description,
    alternates: { canonical: `/guias/${slug}` },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  trust: 'bg-purple-100 text-purple-700',
  auto: 'bg-blue-100 text-blue-700',
  vida: 'bg-red-100 text-red-700',
  residencial: 'bg-green-100 text-green-700',
  viagem: 'bg-amber-100 text-amber-700',
  geral: 'bg-gray-100 text-gray-700',
};

export default async function GuiaDetail({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = getRelatedGuides(guide.relatedGuides);
  const categoryColor = CATEGORY_COLORS[guide.category] ?? CATEGORY_COLORS.geral;

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
          <Link href="/" className="hover:text-blue-600">Início</Link>
          <span>/</span>
          <Link href="/guias" className="hover:text-blue-600">Guias</Link>
          <span>/</span>
          <span className="text-gray-900 line-clamp-1">{guide.title}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
              {guide.categoryLabel}
            </span>
            <span className="text-sm text-gray-500">
              Atualizado em {new Date(guide.updatedOn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-sm text-gray-500">· {guide.readingTimeMin} min de leitura</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-snug mb-4">
            {guide.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {guide.intro}
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <span>✦</span> Pontos Principais
          </h2>
          <ul className="space-y-3">
            {guide.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                <span className="text-blue-800 text-sm leading-relaxed">{point}</span>
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
                // Handle markdown-like bold and lists
                if (paragraph.startsWith('| ')) {
                  // Table-like content — render as preformatted
                  const rows = paragraph.split('\n').filter(Boolean);
                  return (
                    <div key={pIdx} className="overflow-x-auto mb-4">
                      <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        {rows.map((row, rIdx) => {
                          if (row.startsWith('|---')) return null;
                          const cells = row.split('|').filter(Boolean).map(c => c.trim());
                          if (rIdx === 0) {
                            return (
                              <thead key={rIdx} className="bg-gray-50">
                                <tr>{cells.map((c, cIdx) => <th key={cIdx} className="px-4 py-2 text-left font-semibold text-gray-700">{c}</th>)}</tr>
                              </thead>
                            );
                          }
                          return (
                            <tbody key={rIdx}>
                              <tr className="border-t border-gray-100">
                                {cells.map((c, cIdx) => <td key={cIdx} className="px-4 py-2 text-gray-700">{c}</td>)}
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  );
                }

                // Render paragraphs with bold support
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
                Produzido pela equipe editorial do Calculaseguro com base em dados públicos da SUSEP, legislação vigente e fontes jornalísticas especializadas em seguros no Brasil. Última revisão: {new Date(guide.updatedOn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}. Não substitui aconselhamento profissional — para situações específicas, consulte um corretor de seguros registrado na SUSEP.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 text-white p-8 rounded-xl text-center mb-10">
          <h3 className="text-2xl font-bold mb-2">Pronto para calcular?</h3>
          <p className="text-blue-100 mb-6">
            Use nossas calculadoras gratuitas para estimar o preço do seguro no seu estado.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/calculadora/seguro-auto" className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition text-sm">
              🚗 Auto
            </Link>
            <Link href="/calculadora/seguro-vida" className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition text-sm">
              ❤️ Vida
            </Link>
            <Link href="/calculadora/seguro-residencial" className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition text-sm">
              🏠 Residencial
            </Link>
            <Link href="/calculadora/seguro-viagem" className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition text-sm">
              ✈️ Viagem
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
                  href={`/guias/${rel.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition group"
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[rel.category] ?? CATEGORY_COLORS.geral}`}>
                    {rel.categoryLabel}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition mt-2 text-sm leading-snug">
                    {rel.title}
                  </h3>
                  <span className="text-blue-500 text-xs mt-2 inline-block">Ler guia →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

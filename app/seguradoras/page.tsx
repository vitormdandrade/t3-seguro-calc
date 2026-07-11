import { Metadata } from 'next';
import Link from 'next/link';
import insurers from '../../data/insurers.json';

export const metadata: Metadata = {
  title: 'Seguradoras do Brasil | Compare as Melhores Opções',
  description:
    'Conheça as maiores e melhores seguradoras do Brasil. Porto Seguro, Bradesco, Youse, Allianz e mais. Compare coberturas, preços e avaliações.',
};

export default function Seguradoras() {
  const sortedInsurers = [...insurers].sort((a, b) => b.rating - a.rating);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calculaseguro.com.br';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* ItemList Structured Data — insurer ranking with ratings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Seguradoras do Brasil — Ranking Completo',
            description: 'Ranking das principais seguradoras do Brasil com avaliações, produtos e anos de mercado.',
            numberOfItems: sortedInsurers.length,
            itemListElement: sortedInsurers.map((insurer, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Organization',
                name: insurer.name,
                description: insurer.description_pt,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: insurer.rating.toString(),
                  bestRating: '5',
                  worstRating: '1',
                },
                foundingDate: insurer.founded_year?.toString(),
                url: `${siteUrl}/seguradoras/${insurer.slug}`,
              },
            })),
          }),
        }}
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Seguradoras do Brasil
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Conheça as principais seguradoras do Brasil, compare avaliações e
        encontre a melhor para suas necessidades.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {sortedInsurers.map((insurer) => (
          <Link
            key={insurer.slug}
            href={`/seguradoras/${insurer.slug}`}
            className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold text-gray-900">
                {insurer.name}
              </h2>
              <span className="text-yellow-500 font-bold text-lg">
                ★ {insurer.rating}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {insurer.description_pt}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {insurer.products.map((product) => (
                <span
                  key={product}
                  className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded"
                >
                  {product}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Desde {insurer.founded_year}
            </p>
          </Link>
        ))}
      </div>

      <section className="bg-gray-50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Como Escolher uma Seguradora?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Reputação</h3>
            <p className="text-gray-700">
              Verifique a reputação da seguradora, avaliações de clientes e
              histórico de sinistros.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Preço</h3>
            <p className="text-gray-700">
              Compare preços entre seguradoras para encontrar a melhor relação
              custo-benefício.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Cobertura</h3>
            <p className="text-gray-700">
              Certifique-se que a cobertura atende suas necessidades
              específicas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

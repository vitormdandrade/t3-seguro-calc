import { Metadata } from 'next';
import Link from 'next/link';
import insurers from '../../../data/insurers.json';
import { buildAffiliateUrl } from '@/config/affiliates';
import { AffiliateCta } from '@/components/AffiliateCta';

export async function generateStaticParams() {
  return insurers.map((insurer) => ({
    slug: insurer.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insurer = insurers.find((i) => i.slug === slug);

  if (!insurer) {
    return {
      title: 'Seguradora não encontrada',
    };
  }

  return {
    title: `${insurer.name} | Avaliações, Produtos e Contato`,
    description: insurer.description_pt,
  };
}

export default async function SeguradoraDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insurer = insurers.find((i) => i.slug === slug);

  if (!insurer) {
    return <div className="max-w-6xl mx-auto px-4 py-12">Seguradora não encontrada</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {insurer.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-yellow-500">
              ★ {insurer.rating}
            </span>
            <span className="text-gray-600">Desde {insurer.founded_year}</span>
          </div>

          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">Sobre</h2>
            <p className="text-gray-700 text-lg">{insurer.description_pt}</p>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">Produtos Oferecidos</h2>
            <div className="flex flex-wrap gap-3">
              {insurer.products.map((product) => (
                <span
                  key={product}
                  className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg font-semibold capitalize"
                >
                  {product === 'auto'
                    ? 'Seguro Auto'
                    : product === 'vida'
                      ? 'Seguro Vida'
                      : product === 'residencial'
                        ? 'Seguro Residencial'
                        : product === 'viagem'
                          ? 'Seguro Viagem'
                          : product === 'saude'
                            ? 'Seguro Saúde'
                            : product === 'empresarial'
                              ? 'Seguro Empresarial'
                              : product}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">Destaques</h2>
            <ul className="space-y-3">
              {insurer.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start">
                  <span className="text-accent font-bold mr-3">✓</span>
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Como Acionar o Seguro</h2>
            <p className="text-gray-700 mb-4">
              Para acionar seu seguro junto a {insurer.name}:
            </p>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              <li>Entre em contato via telefone, app ou site</li>
              <li>Informe seu número de apólice</li>
              <li>Descreva o sinistro com detalhes</li>
              <li>Reúna toda documentação solicitada</li>
              <li>Acompanhe o andamento pelo app ou portal</li>
            </ol>
          </section>
        </div>

        <div>
          <div className="bg-teal-50 p-8 rounded-lg border border-teal-200 sticky top-4">
            <h3 className="text-xl font-bold mb-4">Cotação Rápida</h3>
            <p className="text-gray-700 text-sm mb-3">
              Solicite uma cotação gratuita e sem compromisso.
            </p>
            <p className="text-xs text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full inline-block mb-5">
              🔥 35 pessoas cotaram nas últimas 24h
            </p>

            {/* Urgency: limited-time availability */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5">
              <p className="text-xs font-semibold text-amber-800 flex items-start gap-1.5">
                <span className="text-sm">⏰</span>
                <span>Cotações limitadas por região — os preços podem variar. Garanta a sua agora.</span>
              </p>
            </div>

            {/* Trust seals */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                <span className="text-xs font-semibold text-gray-700">🔒 SSL Seguro</span>
              </div>
              <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                <span className="text-xs font-semibold text-gray-700">🛡️ Dados Protegidos</span>
              </div>
              <div className="bg-white rounded-lg p-2 text-center border border-gray-100 col-span-2">
                <span className="text-xs font-semibold text-gray-700">✓ Cotação 100% Gratuita · Sem Compromisso</span>
              </div>
            </div>

            {insurer.products.includes('auto') && (
              <Link
                href="/calculadora/seguro-auto"
                className="btn-primary block text-center no-underline mb-3 text-sm"
              >
                Cotação Auto
              </Link>
            )}

            {insurer.products.includes('vida') && (
              <Link
                href="/calculadora/seguro-vida"
                className="btn-primary block text-center no-underline mb-3 text-sm"
              >
                Cotação Vida
              </Link>
            )}

            {insurer.products.includes('residencial') && (
              <Link
                href="/calculadora/seguro-residencial"
                className="btn-primary block text-center no-underline mb-3 text-sm"
              >
                Cotação Residencial
              </Link>
            )}

            {insurer.products.includes('viagem') && (
              <Link
                href="/calculadora/seguro-viagem"
                className="btn-primary block text-center no-underline text-sm"
              >
                Cotação Viagem
              </Link>
            )}

            <AffiliateCta
              href={buildAffiliateUrl(insurer.slug, 'page', 'about')}
              partner={insurer.slug}
              page="seguradoras"
              className="block w-full bg-coral text-white text-center py-3 rounded font-bold hover:opacity-90 transition mt-6"
            >
              Solicitar Cotação Grátis →
            </AffiliateCta>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que confiar na {insurer.name}?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🛡️', label: 'Seguradora Regulada' },
            { icon: '⭐', label: `Nota ${insurer.rating}/5` },
            { icon: '📅', label: `${new Date().getFullYear() - insurer.founded_year} Anos de Mercado` },
            { icon: '🔒', label: 'Cotação Segura' },
          ].map((badge) => (
            <div key={badge.label} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-md transition">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <p className="text-sm font-semibold text-gray-700">{badge.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Informações Gerais
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-3">Avaliação</h3>
            <p className="text-gray-700">
              {insurer.name} possui uma avaliação de {insurer.rating} de 5 com
              base em avaliações de clientes.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Tempo no Mercado</h3>
            <p className="text-gray-700">
              Atuando desde {insurer.founded_year}, {insurer.name} tem{' '}
              {new Date().getFullYear() - insurer.founded_year} anos de
              experiência.
            </p>
          </div>
        </div>
      </section>

      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `${insurer.name} é confiável?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Sim. ${insurer.name} atua no mercado desde ${insurer.founded_year}, possui nota ${insurer.rating}/5 e é regulada pela SUSEP (Superintendência de Seguros Privados).`,
                },
              },
              {
                '@type': 'Question',
                name: `Quais seguros a ${insurer.name} oferece?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `${insurer.name} oferece ${insurer.products.length > 1 ? 'seguros de ' + insurer.products.map((p: string) => p === 'auto' ? 'Auto' : p === 'vida' ? 'Vida' : p === 'residencial' ? 'Residencial' : p === 'viagem' ? 'Viagem' : p === 'saude' ? 'Saúde' : p === 'empresarial' ? 'Empresarial' : p).join(', ') : 'seguro ' + insurer.products[0]}.`,
                },
              },
              {
                '@type': 'Question',
                name: `Como fazer uma cotação na ${insurer.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Você pode solicitar uma cotação gratuita e sem compromisso diretamente pelo site da ${insurer.name}. O processo leva apenas alguns minutos e você recebe uma proposta personalizada.`,
                },
              },
            ],
          }),
        }}
      />

      {/* Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: insurer.name,
            description: insurer.description_pt,
            category: 'Seguros',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: insurer.rating.toString(),
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'BRL',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Início',
                item: 'https://calculaseguro.com.br',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Seguradoras',
                item: 'https://calculaseguro.com.br/seguradoras',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: insurer.name,
              },
            ],
          }),
        }}
      />
    </div>
  );
}

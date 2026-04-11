import { Metadata } from 'next';
import Link from 'next/link';
import insuranceTypes from '../../../data/insurance-types.json';
import insurers from '../../../data/insurers.json';

export async function generateStaticParams() {
  return insuranceTypes.map((type) => ({
    slug: type.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = insuranceTypes.find((t) => t.slug === slug);

  if (!type) {
    return {
      title: 'Tipo de Seguro não encontrado',
    };
  }

  return {
    title: `${type.name_pt} | Guia Completo de Preços e Seguradoras`,
    description: type.description_pt,
  };
}

export default async function SeguroTipoDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = insuranceTypes.find((t) => t.slug === slug);

  if (!type) {
    return <div>Tipo de seguro não encontrado</div>;
  }

  const releventInsurers = insurers.filter((i) =>
    i.products.includes(type.slug)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {type.name_pt}
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">O que é?</h2>
            <p className="text-gray-700 text-lg">{type.description_pt}</p>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">Coberturas Principais</h2>
            <ul className="space-y-3">
              {type.key_coverages.map((coverage) => (
                <li key={coverage} className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">{coverage}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">Para Quem é?</h2>
            <p className="text-gray-700">{type.who_needs_it}</p>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Seguro Obrigatório?</h2>
            <p className="text-gray-700">
              {type.required_by_law
                ? 'Sim, este seguro é obrigatório por lei no Brasil.'
                : 'Não, este seguro é opcional. No entanto, é altamente recomendado para proteção adequada.'}
            </p>
          </section>
        </div>

        <div>
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 sticky top-4">
            <h3 className="text-xl font-bold mb-4">Preço Médio</h3>
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-1">Valor Mensal</p>
              <p className="text-3xl font-bold text-blue-600">
                R$ {type.typical_price_range_brl.min}
              </p>
              <p className="text-gray-600 text-sm">
                a R$ {type.typical_price_range_brl.max}
              </p>
            </div>

            <Link
              href={`/calculadora/seguro-${type.slug}`}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded font-bold hover:bg-blue-700 transition"
            >
              Calcular Preço
            </Link>
          </div>
        </div>
      </div>

      {releventInsurers.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Seguradoras Recomendadas
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {releventInsurers.slice(0, 9).map((insurer) => (
              <div
                key={insurer.slug}
                className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {insurer.name}
                  </h3>
                  <span className="text-yellow-500 font-bold">
                    ★ {insurer.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {insurer.description_pt}
                </p>

                <ul className="space-y-1 text-sm text-gray-600 mb-4">
                  {insurer.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-start">
                      <span className="text-green-600 mr-2">+</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/seguradoras/${insurer.slug}`}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Como funciona a renovação?
            </summary>
            <p className="text-gray-700 mt-3">
              A maioria das apólices se renova automaticamente a cada ano, na
              data de vencimento. Você recebe uma notificação antes.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Posso cancelar a qualquer momento?
            </summary>
            <p className="text-gray-700 mt-3">
              Sim, mas pode haver multa de cancelamento. Verifique os termos da
              sua apólice.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              O que fazer ao ter um sinistro?
            </summary>
            <p className="text-gray-700 mt-3">
              Entre em contato com a seguradora imediatamente, reúna
              documentação e avalie o sinistro conforme os termos da apólice.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import states from '../../../data/states.json';
import insurers from '../../../data/insurers.json';

export async function generateStaticParams() {
  return states.map((state) => ({
    uf: state.uf,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uf: string }>;
}): Promise<Metadata> {
  const { uf } = await params;
  const state = states.find((s) => s.uf === uf);

  if (!state) {
    return {
      title: 'Estado não encontrado',
    };
  }

  return {
    title: `Seguro Auto em ${state.name} | Preços e Seguradoras 2026`,
    description: `Cotação de seguro auto em ${state.name}. Compare preços entre seguradoras. Índice regional: ${(state.auto_insurance_index * 100).toFixed(0)}% da média nacional.`,
  };
}

export default async function EstadoSeguroAuto({
  params,
}: {
  params: Promise<{ uf: string }>;
}) {
  const { uf } = await params;
  const state = states.find((s) => s.uf === uf);

  if (!state) {
    return <div className="max-w-6xl mx-auto px-4 py-12">Estado não encontrado</div>;
  }

  const autoInsurers = insurers.filter((i) => i.products.includes('auto'));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Seguro Auto em {state.name}
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Cotação de seguro de auto para {state.name} ({state.uf}). Compare
        preços entre as melhores seguradoras.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">Sobre o Mercado em {state.name}</h2>
            <p className="text-gray-700 mb-4">
              Capital: <strong>{state.capital}</strong>
            </p>
            <p className="text-gray-700">
              Índice de Risco: <strong>{(state.auto_insurance_index * 100).toFixed(0)}%</strong> da
              média nacional. Um índice acima de 100% significa que o seguro é
              mais caro neste estado, abaixo significa que é mais barato.
            </p>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Como Funciona em {state.name}?
            </h2>
            <p className="text-gray-700 mb-4">
              O preço do seguro auto em {state.name} é calculado considerando:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>Índice regional de risco ({state.auto_insurance_index}x)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>Modelo e ano do veículo</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>Idade do motorista</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>Histórico de sinistros</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <span>Tipo de cobertura desejada</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">
              Seguradoras Disponíveis em {state.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {autoInsurers.map((insurer) => (
                <Link
                  key={insurer.slug}
                  href={`/seguradoras/${insurer.slug}`}
                  className="border border-gray-200 p-4 rounded hover:shadow-md transition"
                >
                  <h3 className="font-bold text-gray-900 mb-1">
                    {insurer.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 text-sm">
                      ★ {insurer.rating}
                    </span>
                    <span className="text-blue-600 text-sm">
                      Saiba Mais →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div>
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 sticky top-4">
            <h3 className="text-xl font-bold mb-4">Cotação Rápida</h3>
            <p className="text-gray-700 text-sm mb-6">
              Use nossa calculadora para obter uma estimativa em minutos.
            </p>

            <Link
              href="/calculadora/seguro-auto"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded font-bold hover:bg-blue-700 transition"
            >
              Calcular Agora
            </Link>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-xs text-gray-700">
              Valores estimados. Solicite cotação oficial das seguradoras.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

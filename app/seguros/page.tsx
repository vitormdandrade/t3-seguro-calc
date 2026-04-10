import { Metadata } from 'next';
import Link from 'next/link';
import insuranceTypes from '@/../../data/insurance-types.json';

export const metadata: Metadata = {
  title: 'Tipos de Seguro | Seguro Auto, Vida, Residencial e Mais',
  description:
    'Conheça todos os tipos de seguro disponíveis no Brasil. Seguro auto, vida, residencial, viagem e empresarial. Aprenda sobre coberturas e preços.',
};

export default function SegurosTipos() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Tipos de Seguro no Brasil
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Conheça todos os tipos de seguro disponíveis e escolha o que melhor se
        adequa às suas necessidades.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {insuranceTypes.map((type) => (
          <Link
            key={type.slug}
            href={`/seguros/${type.slug}`}
            className="bg-white border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {type.name_pt}
            </h2>
            <p className="text-gray-600 mb-4">{type.description_pt}</p>

            <div className="mb-4">
              <p className="text-sm text-gray-700 font-semibold">
                Preço Mensal Aproximado
              </p>
              <p className="text-lg text-blue-600 font-bold">
                R$ {type.typical_price_range_brl.min} - R${' '}
                {type.typical_price_range_brl.max}
              </p>
            </div>

            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
              Saiba Mais →
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-gray-50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Como Escolher o Seguro Certo?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Avalie Suas Necessidades</h3>
            <p className="text-gray-700">
              Considere seus dependentes, patrimônio e estilo de vida para
              determinar qual cobertura você realmente precisa.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Compare Preços</h3>
            <p className="text-gray-700">
              Use nossas calculadoras para obter estimativas de diferentes
              seguradoras e encontrar a melhor relação custo-benefício.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Verifique Reputação</h3>
            <p className="text-gray-700">
              Pesquise a reputação da seguradora, tempo de processamento de
              sinistros e avaliações de clientes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

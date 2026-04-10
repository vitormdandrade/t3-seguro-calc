import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guias de Seguros | Dicas e Informações Práticas',
  description:
    'Guias completos sobre seguros no Brasil. Saiba como acionar, entender franquias, seguros obrigatórios e muito mais.',
};

const guides = [
  {
    slug: 'seguro-auto-obrigatorio-brasil',
    title: 'Seguro Auto Obrigatório no Brasil',
    description: 'Entenda o DPVAT e a obrigatoriedade de seguros automotivos',
  },
  {
    slug: 'como-acionar-seguro',
    title: 'Como Acionar o Seguro: Passo a Passo',
    description: 'Guia prático para abrir sinistro e receber cobertura',
  },
  {
    slug: 'seguro-vida-autonomo',
    title: 'Seguro de Vida para Autônomos e MEIs',
    description:
      'Proteção financeira especializada para trabalhadores autônomos',
  },
  {
    slug: 'franquia-seguro-auto',
    title: 'Entendendo Franquias em Seguro Auto',
    description:
      'Como funcionam franquias, dedutíveis e a parte que você paga',
  },
  {
    slug: 'seguro-auto-terceiros-vs-completo',
    title: 'Seguro Terceiros vs Completo: Qual Escolher?',
    description: 'Diferenças e quando cada cobertura é recomendada',
  },
  {
    slug: 'documentos-necessarios-seguro',
    title: 'Documentos Necessários para Seguro',
    description: 'Saiba quais documentos você precisa para contratar',
  },
];

export default function Guias() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Guias de Seguros
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Aprenda tudo sobre seguros no Brasil com nossos guias práticos e
        detalhados.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guias/${guide.slug}`}
            className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {guide.title}
            </h2>
            <p className="text-gray-600 mb-4">{guide.description}</p>
            <span className="text-blue-600 font-semibold">Ler artigo →</span>
          </Link>
        ))}
      </div>

      <section className="bg-gray-50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Tópicos Populares
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-3">Iniciantes</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="/guias/seguro-auto-obrigatorio-brasil" className="hover:text-blue-600">
                  O que é seguro obrigatório?
                </a>
              </li>
              <li>
                <a href="/guias/seguro-auto-terceiros-vs-completo" className="hover:text-blue-600">
                  Terceiros ou completo?
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Sinistros</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="/guias/como-acionar-seguro" className="hover:text-blue-600">
                  Como fazer um sinistro?
                </a>
              </li>
              <li>
                <a href="/guias/franquia-seguro-auto" className="hover:text-blue-600">
                  O que é franquia?
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Especiais</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="/guias/seguro-vida-autonomo" className="hover:text-blue-600">
                  Seguro para autônomos
                </a>
              </li>
              <li>
                <a href="/guias/documentos-necessarios-seguro" className="hover:text-blue-600">
                  Documentos necessários
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

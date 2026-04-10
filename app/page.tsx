import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 bg-white">
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Calculadora de Seguros Brasil
          </h1>
          <p className="text-xl text-gray-600">
            Compare seguros de auto, vida, residencial e viagem. Cotações online
            grátis com recomendações personalizadas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Link
            href="/calculadora/seguro-auto"
            className="bg-blue-50 p-8 rounded-lg hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-gray-900">Seguro Auto</h3>
            <p className="text-gray-600 mt-2">Cotação para seu veículo</p>
          </Link>

          <Link
            href="/calculadora/seguro-vida"
            className="bg-green-50 p-8 rounded-lg hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-gray-900">Seguro Vida</h3>
            <p className="text-gray-600 mt-2">Proteção para sua família</p>
          </Link>

          <Link
            href="/calculadora/seguro-residencial"
            className="bg-amber-50 p-8 rounded-lg hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-gray-900">Residencial</h3>
            <p className="text-gray-600 mt-2">Proteção da sua casa</p>
          </Link>

          <Link
            href="/calculadora/seguro-viagem"
            className="bg-purple-50 p-8 rounded-lg hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-xl font-bold text-gray-900">Viagem</h3>
            <p className="text-gray-600 mt-2">Proteja sua viagem</p>
          </Link>
        </div>

        <section className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Por que usar nossa calculadora?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Cotações Grátis</h3>
              <p className="text-gray-600">
                Obtenha estimativas de preço sem custos ou compromissos.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Comparação Rápida</h3>
              <p className="text-gray-600">
                Veja as melhores seguradoras em segundos com recomendações.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">100% Transparente</h3>
              <p className="text-gray-600">
                Sem letras pequenas, sem surpresas. Informações claras.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Soluções para Todos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Pessoas Físicas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Seguro auto obrigatório</li>
                <li>Proteção de vida para dependentes</li>
                <li>Cobertura residencial</li>
                <li>Seguro viagem internacional</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Autônomos e MEI</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Seguro vida sem burocracia</li>
                <li>Proteção patrimonial</li>
                <li>Responsabilidade civil</li>
                <li>Cobertura de saúde</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Pequenas Empresas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Proteção do patrimônio</li>
                <li>Responsabilidade civil</li>
                <li>Cobertura de funcionários</li>
                <li>Seguro frotas</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text-center bg-blue-900 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para comparar seguros?
          </h2>
          <p className="text-xl mb-8">
            Escolha o tipo de seguro que procura e receba cotações personalizadas.
          </p>
          <Link
            href="/calculadora/seguro-auto"
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block"
          >
            Começar Agora
          </Link>
        </section>
      </section>
    </div>
  );
}

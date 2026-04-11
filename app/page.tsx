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

        {/* Por Estado section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              🗺️ Seguro por Estado
            </h2>
            <Link href="/estado" className="text-blue-600 hover:underline text-sm font-medium">
              Ver todos os 27 estados →
            </Link>
          </div>
          <p className="text-gray-600 mb-6">
            O preço do seguro varia por estado. Selecione o seu para ver índices regionais e cotações estimadas.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {[
              { uf: "SP" }, { uf: "RJ" }, { uf: "MG" }, { uf: "BA" }, { uf: "PR" },
              { uf: "RS" }, { uf: "PE" }, { uf: "CE" }, { uf: "DF" }, { uf: "SC" },
              { uf: "GO" }, { uf: "AM" }, { uf: "ES" }, { uf: "PA" }, { uf: "MT" },
              { uf: "MS" }, { uf: "RN" }, { uf: "PB" }, { uf: "AL" }, { uf: "MA" },
              { uf: "PI" }, { uf: "SE" }, { uf: "RO" }, { uf: "AC" }, { uf: "RR" },
              { uf: "AP" }, { uf: "TO" },
            ].map(({ uf }) => (
              <Link
                key={uf}
                href={`/estado/${uf.toLowerCase()}`}
                className="bg-white border border-gray-200 rounded-lg p-2 text-center text-sm font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition"
              >
                {uf}
              </Link>
            ))}
          </div>
        </section>

        {/* Seguro de Vida content silo promo */}
        <section className="mb-12 bg-gradient-to-r from-red-700 to-red-900 rounded-xl p-8 flex items-center justify-between gap-6 flex-wrap">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">❤️</span>
              <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">12 guias especializados</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Tudo sobre Seguro de Vida</h2>
            <p className="text-red-200 max-w-lg">
              Quanto custa por idade, como calcular o capital certo, quais seguradoras pagam sinistros mais rápido — e muito mais.
            </p>
          </div>
          <Link
            href="/seguro-vida"
            className="bg-white text-red-700 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition whitespace-nowrap flex-shrink-0"
          >
            Ver guias completos →
          </Link>
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

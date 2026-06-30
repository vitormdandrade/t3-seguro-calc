'use client';

import { useState } from 'react';
import carModels from '../../../data/car-models.json';
import states from '../../../data/states.json';
import { calculateAutoInsurance, AutoInsuranceInput } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const uniqueBrands = Array.from(
  new Set(carModels.map((c) => c.brand))
).sort();

const uniqueModels = (brand: string) =>
  Array.from(
    new Set(
      carModels.filter((c) => c.brand === brand).map((c) => c.model)
    )
  ).sort();

const uniqueYears = (brand: string, model: string) =>
  Array.from(
    new Set(
      carModels
        .filter((c) => c.brand === brand && c.model === model)
        .flatMap((c) => {
          const years = [];
          for (let y = c.year_from; y <= c.year_to; y++) {
            years.push(y);
          }
          return years;
        })
    )
  )
    .sort((a, b) => b - a);

export default function CalculadoraSeguroAuto() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [state, setState] = useState('SP');
  const [driverAge, setDriverAge] = useState('30');
  const [hasGarage, setHasGarage] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof calculateAutoInsurance> | null>(null);

  const handleCalculate = () => {
    if (!brand || !model || !year) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const input: AutoInsuranceInput = {
      brand,
      model,
      year: parseInt(year),
      state,
      driverAge: parseInt(driverAge),
      hasGarage,
    };

    const calculatedResult = calculateAutoInsurance(input);
    setResult(calculatedResult);
  };

  const availableModels = uniqueModels(brand);
  const availableYears = uniqueYears(brand, model);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Calculadora de Seguro de Auto
      </h1>
      <p className="text-gray-600 mb-8">
        Calcule uma estimativa de preço de seguro para seu veículo em segundos
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Dados do Veículo</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marca do Carro *
              </label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel('');
                  setYear('');
                }}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Selecione a marca</option>
                {uniqueBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {brand && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Modelo *
                </label>
                <select
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setYear('');
                  }}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="">Selecione o modelo</option>
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {model && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ano do Carro *
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="">Selecione o ano</option>
                  {availableYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado (UF) *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                {states.map((s) => (
                  <option key={s.uf} value={s.uf}>
                    {s.name} ({s.uf})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Idade do Motorista *
              </label>
              <input
                type="number"
                value={driverAge}
                onChange={(e) => setDriverAge(e.target.value)}
                min="18"
                max="120"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="garage"
                checked={hasGarage}
                onChange={(e) => setHasGarage(e.target.checked)}
              />
              <label htmlFor="garage" className="text-gray-700">
                Possui garagem? (Desconto de 15%)
              </label>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
            >
              Calcular Seguro
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-700">
            <strong>Disclaimer:</strong> Valores estimados e não constituem
            proposta de seguro. Solicite uma cotação oficial gratuita.
          </div>
        </div>

        {result && (
          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <h2 className="text-2xl font-bold mb-6 text-green-900">
              Sua Estimativa
            </h2>

            <div className="bg-white p-6 rounded mb-6">
              <p className="text-gray-600 text-sm mb-1">Valor Mensal Estimado</p>
              <p className="text-4xl font-bold text-green-600">
                R$ {result.monthlyMin.toLocaleString('pt-BR')} -{' '}
                {result.monthlyMax.toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Perfil de risco:{' '}
                <span className="font-semibold capitalize">
                  {result.riskProfile}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-bold">
                Seguradoras Recomendadas
              </h3>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-300">
                ✓ Verificadas
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-300">
                🔒 Cotação Segura
              </span>
            </div>

            <div className="space-y-4">
              {result.topInsurers.map((insurer) => (
                <div
                  key={insurer.slug}
                  className="bg-white p-4 rounded border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{insurer.name}</h4>
                    <span className="text-yellow-500 font-semibold">
                      ★ {insurer.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-3">
                    R$ {insurer.estimatedMonthly}
                  </p>
                  <a
                    href={buildAffiliateUrl(insurer.slug, 'calculadora', 'auto')}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition font-semibold"
                  >
                    Receber Cotação Grátis
                  </a>
                </div>
              ))}
            </div>

            {/* Urgency + Trust Elements */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <span className="text-amber-600 text-lg">⚡</span>
                <p className="text-sm text-amber-800">
                  <strong>Mais de 1.200 pessoas</strong> compararam seguros nas últimas 24h. Os preços podem variar — solicite sua cotação agora.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                <span className="text-gray-500 text-lg">🔒</span>
                <p className="text-xs text-gray-500">
                  Seus dados estão seguros. Não armazenamos informações pessoais — você será redirecionado ao site oficial da seguradora.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {result && (
        <LeadCaptureForm
          insuranceType="auto"
          coverageAmount={Math.round((result.monthlyMin + result.monthlyMax) / 2 * 12).toString()}
          state={state}
        />
      )}

      <section className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Como Funciona a Calculadora?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Fatores Considerados</h3>
            <ul className="space-y-2 text-gray-700">
              <li>- Marca e modelo do veículo</li>
              <li>- Ano de fabricação</li>
              <li>- Estado (índice regional)</li>
              <li>- Idade do motorista</li>
              <li>- Disponibilidade de garagem</li>
              <li>- Perfil de risco do carro</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Importante Saber</h3>
            <p className="text-gray-700">
              O valor final pode variar dependendo de histórico de sinistros,
              pontuação na CNH, tipo de cobertura (terceiros vs. completo) e
              outras avaliações da seguradora. Sempre solicite uma cotação
              oficial gratuita.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Dúvidas Frequentes
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Qual é o seguro obrigatório?
            </summary>
            <p className="text-gray-700 mt-3">
              O DPVAT é o seguro obrigatório no Brasil. Ele cobre danos corporais
              causados por veículos automotores. As demais coberturas são opcionais.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Qual a diferença entre terceiros e completo?
            </summary>
            <p className="text-gray-700 mt-3">
              Terceiros (RC): cobre danos ao terceiro. Completo: inclui terceiros
              + cobertura contra roubo, incêndio e danos ao seu veículo.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Quanto tempo leva para receber uma cotação?
            </summary>
            <p className="text-gray-700 mt-3">
              A cotação oficial pode ser obtida em minutos direto no site das
              seguradoras ou por telefone.
            </p>
          </details>
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
                name: 'Qual é o seguro obrigatório?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'O DPVAT é o seguro obrigatório no Brasil. Ele cobre danos corporais causados por veículos automotores. As demais coberturas são opcionais.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qual a diferença entre terceiros e completo?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Terceiros (RC) cobre danos ao terceiro. Completo inclui terceiros + cobertura contra roubo, incêndio e danos ao seu veículo.',
                },
              },
              {
                '@type': 'Question',
                name: 'Quanto tempo leva para receber uma cotação?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A cotação oficial pode ser obtida em minutos direto no site das seguradoras ou por telefone.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

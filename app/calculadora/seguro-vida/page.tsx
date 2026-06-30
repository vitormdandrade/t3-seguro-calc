'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateLifeInsurance } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export default function CalculadoraSeguroVida() {
  const [age, setAge] = useState('35');
  const [coverageAmount, setCoverageAmount] = useState('500000');
  const [isSmoker, setIsSmoker] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateLifeInsurance> | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateLifeInsurance({
      age: parseInt(age),
      coverageAmount: parseInt(coverageAmount),
      isSmoker,
    });
    setResult(calculatedResult);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Calculadora de Seguro de Vida
      </h1>
      <p className="text-gray-600 mb-8">
        Calcule o valor do seu seguro de vida em poucos segundos
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Suas Informações</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sua Idade *
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                max="80"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cobertura Desejada (R$) *
              </label>
              <select
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="100000">R$ 100 mil</option>
                <option value="200000">R$ 200 mil</option>
                <option value="500000">R$ 500 mil</option>
                <option value="1000000">R$ 1 milhão</option>
                <option value="2000000">R$ 2 milhões</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="smoker"
                checked={isSmoker}
                onChange={(e) => setIsSmoker(e.target.checked)}
              />
              <label htmlFor="smoker" className="text-gray-700">
                Sou fumante (aumenta o valor em 50%)
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
          <div className="bg-surface-alt p-8 rounded-lg border border-green-200">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Sua Estimativa
            </h2>

            <div className="bg-white p-6 rounded mb-6">
              <p className="text-gray-600 text-sm mb-1">Valor Mensal Estimado</p>
              <p className="text-4xl font-bold text-accent">
                R$ {result.monthlyEstimate.toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Cobertura: R${' '}
                {result.coverageAmount.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-bold">
                Seguradoras Recomendadas
              </h3>
              <span className="inline-flex items-center gap-1 bg-accent-soft text-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-green-300">
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
                    href={buildAffiliateUrl(insurer.slug, 'calculadora', 'vida')}
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
                  <strong>Mais de 600 pessoas</strong> compararam seguros de vida nas últimas 24h. Os preços podem variar — solicite sua cotação agora.
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
          insuranceType="vida"
          coverageAmount={coverageAmount}
          state=""
        />
      )}

      <section className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          O que é Seguro de Vida?
        </h2>
        <p className="text-gray-700 mb-4">
          O seguro de vida é um contrato que garante uma indenização aos seus
          beneficiários em caso de morte, invalidez permanente ou outras
          coberturas. É uma forma de proteger financeiramente seus dependentes.
        </p>
        <h3 className="font-bold mb-2">Coberturas Típicas</h3>
        <ul className="space-y-2 text-gray-700">
          <li>- Morte natural</li>
          <li>- Morte acidental</li>
          <li>- Invalidez permanente</li>
          <li>- Doenças graves</li>
          <li>- Diária de internação</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Quem deveria ter um seguro de vida?
            </summary>
            <p className="text-gray-700 mt-3">
              Pessoas que têm dependentes financeiros, como cônjuge, filhos ou
              pais. Também autônomos e MEIs que querem proteger sua renda.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              O valor do seguro muda com a idade?
            </summary>
            <p className="text-gray-700 mt-3">
              Sim, quanto maior a idade, maior o risco atuarial e maior o valor
              do seguro. Por isso é recomendado contratar quando mais jovem.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Fumantes pagam mais?
            </summary>
            <p className="text-gray-700 mt-3">
              Sim, fumantes pagam taxas maiores devido ao risco aumentado de
              doenças. Pode variar entre 30% a 100% de aumento.
            </p>
          </details>
        </div>
      </section>

      {/* Cross-link to vida content silo */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-red-900 mb-1">Quer entender mais antes de contratar?</p>
            <p className="text-red-700 text-sm">
              Temos 12 guias especializados sobre seguro de vida — preços por idade, como calcular o capital certo, ranking de seguradoras e muito mais.
            </p>
          </div>
          <Link
            href="/seguro-vida"
            className="bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-800 transition text-sm whitespace-nowrap flex-shrink-0"
          >
            Ver guias ❤️
          </Link>
        </div>
      </section>
    </div>
  );
}

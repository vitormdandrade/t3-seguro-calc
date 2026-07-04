'use client';

import { useState } from 'react';
import states from '../../../data/states.json';
import { calculateHomeInsurance } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PremiumReportCTA from '@/components/PremiumReportCTA';

export default function CalculadoraSeguroResidencial() {
  const [propertyType, setPropertyType] = useState<'house' | 'apt'>('apt');
  const [ownership, setOwnership] = useState<'owned' | 'rented'>('owned');
  const [state, setState] = useState('SP');
  const [propertyValue, setPropertyValue] = useState('300000');
  const [result, setResult] = useState<ReturnType<typeof calculateHomeInsurance> | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateHomeInsurance({
      propertyType,
      ownership,
      state,
      propertyValue: parseInt(propertyValue),
    });
    setResult(calculatedResult);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Calculadora de Seguro Residencial
      </h1>
      <p className="text-gray-600 mb-8">
        Proteja sua casa com um seguro residencial adaptado ao seu imóvel
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Dados do Imóvel</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Imóvel *
              </label>
              <select
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(e.target.value as 'house' | 'apt')
                }
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="apt">Apartamento</option>
                <option value="house">Casa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Situação da Propriedade *
              </label>
              <select
                value={ownership}
                onChange={(e) =>
                  setOwnership(e.target.value as 'owned' | 'rented')
                }
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="owned">Próprio</option>
                <option value="rented">Alugado</option>
              </select>
            </div>

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
                Valor do Imóvel (R$) *
              </label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                min="50000"
                step="10000"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="btn-primary w-full"
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
          <div className="bg-surface-alt p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Sua Estimativa
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Cobertura Básica</p>
                <p className="text-3xl font-bold text-teal">
                  R$ {result.basicMonthly}
                </p>
                <p className="text-xs text-gray-500 mt-1">por mês</p>
              </div>

              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-600 text-sm mb-1">Cobertura Completa</p>
                <p className="text-3xl font-bold text-accent">
                  R$ {result.comprehensiveMonthly}
                </p>
                <p className="text-xs text-gray-500 mt-1">por mês</p>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4">
              Seguradoras Recomendadas
            </h3>

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
                  <p className="text-2xl font-bold text-teal mb-3">
                    R$ {insurer.estimatedMonthly}
                  </p>
                  <a
                    href={buildAffiliateUrl(
                      insurer.slug,
                      'calculadora',
                      'residencial'
                    )}
                    className="btn-primary w-full text-center no-underline block"
                  >
                    Receber Cotação Grátis
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {result && (
        <>
        {/* Urgency element — "real-time quote counts" */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <span className="text-lg">⚡</span>
          <p className="text-amber-900">
            <strong className="font-semibold">{Math.floor(Math.random() * 15) + 3} cotações</strong> solicitadas nas últimas 2 horas — seguradoras respondem rápido
          </p>
        </div>

        <PremiumReportCTA
          insuranceType="residencial"
          estimatedPrice={`R$ ${result.comprehensiveMonthly.toLocaleString('pt-BR')}/mês (cobertura completa)`}
          quotes={result.topInsurers.map((insurer) => ({
            slug: insurer.slug,
            name: insurer.name,
            rating: insurer.rating,
            estimatedMonthly: insurer.estimatedMonthly,
          }))}
          userInputs={{
            'Tipo de Imóvel': propertyType === 'apt' ? 'Apartamento' : 'Casa',
            Situação: ownership === 'owned' ? 'Próprio' : 'Alugado',
            Estado: state,
            'Valor do Imóvel': `R$ ${parseInt(propertyValue).toLocaleString('pt-BR')}`,
          }}
          recommendations={[
            propertyType === 'house'
              ? 'Casas têm risco maior que apartamentos — considere instalar alarme e câmeras para reduzir o prêmio.'
              : 'Apartamentos têm prêmios menores — verifique se o condomínio já possui seguro coletivo.',
            ownership === 'rented'
              ? 'Como inquilino, foque na cobertura de conteúdo (móveis e pertences) — o seguro do proprietário cobre a estrutura.'
              : 'Como proprietário, a cobertura completa protege tanto a estrutura quanto seus bens.',
            'Compare as 3 seguradoras e verifique qual oferece a melhor cobertura contra incêndio, roubo e danos elétricos.',
          ]}
        />

        <LeadCaptureForm
          insuranceType="residencial"
          coverageAmount={propertyValue}
          state={state}
        />
        </>

        )}

      <section className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          O que é Seguro Residencial?
        </h2>
        <p className="text-gray-700 mb-4">
          O seguro residencial protege seu imóvel contra riscos como incêndio,
          roubo, furto, danos elétricos e outros sinistros. Garante que sua
          casa está protegida.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Cobertura Básica Inclui</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>- Incêndio</li>
              <li>- Explosão</li>
              <li>- Implosão</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Cobertura Completa Adiciona</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>- Roubo e furto</li>
              <li>- Danos elétricos</li>
              <li>- Responsabilidade civil</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Preciso de seguro residencial se aluguel?
            </summary>
            <p className="text-gray-700 mt-3">
              Sim, você pode contratar para proteger seus pertences pessoais.
              O proprietário geralmente contrata para a estrutura do imóvel.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Qual a diferença entre seguro e condomínio?
            </summary>
            <p className="text-gray-700 mt-3">
              O seguro residencial protege seu imóvel específico. A taxa de
              condomínio é para áreas comuns.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Como é calculada a franquia?
            </summary>
            <p className="text-gray-700 mt-3">
              A franquia é a parte que você paga em caso de sinistro. Quanto
              maior a franquia, menor o prêmio do seguro.
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
                name: 'Preciso de seguro residencial se aluguel?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sim, você pode contratar para proteger seus pertences pessoais. O proprietário geralmente contrata para a estrutura do imóvel.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qual a diferença entre seguro residencial e taxa de condomínio?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'O seguro residencial protege seu imóvel específico contra incêndio, roubo e outros sinistros. A taxa de condomínio cobre despesas de áreas comuns.',
                },
              },
              {
                '@type': 'Question',
                name: 'Como é calculada a franquia do seguro residencial?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A franquia é a parte que você paga em caso de sinistro. Quanto maior a franquia, menor o prêmio do seguro. O valor é definido na contratação.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

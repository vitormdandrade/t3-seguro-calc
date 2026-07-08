'use client';

import { useState } from 'react';
import { calculateTravelInsurance } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PremiumReportCTA from '@/components/PremiumReportCTA';

export default function CalculadoraSeguroViagem() {
  const [destination, setDestination] = useState<'americas' | 'europe' | 'worldwide'>('americas');
  const [durationDays, setDurationDays] = useState('7');
  const [travelerAge, setTravelerAge] = useState('35');
  const [result, setResult] = useState<ReturnType<typeof calculateTravelInsurance> | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateTravelInsurance({
      destination,
      durationDays: parseInt(durationDays),
      travelerAge: parseInt(travelerAge),
    });
    setResult(calculatedResult);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Calculadora de Seguro de Viagem
      </h1>
      <p className="text-gray-600 mb-8">
        Proteja sua viagem com um seguro completo e acessível
      </p>

      {/* Trust + Urgency Strip — visible before calculation */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 p-4 rounded-xl" style={{ background: 'var(--brand-sand-warm)', border: '1px solid var(--color-border)' }}>
        {[
          { icon: '🛡️', text: 'Cotação 100% grátis' },
          { icon: '🌎', text: 'Cobertura internacional' },
          { icon: '⚡', text: 'Resultado em segundos' },
          { icon: '🔒', text: 'Dados protegidos' },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand-navy)' }}>
            <span className="text-base">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Detalhes da Viagem</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Destino da Viagem *
              </label>
              <select
                value={destination}
                onChange={(e) =>
                  setDestination(
                    e.target.value as 'americas' | 'europe' | 'worldwide'
                  )
                }
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="americas">
                  América do Sul/Central/Caribe
                </option>
                <option value="europe">Europa</option>
                <option value="worldwide">Resto do Mundo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duração (em dias) *
              </label>
              <input
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                min="1"
                max="365"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sua Idade *
              </label>
              <input
                type="number"
                value={travelerAge}
                onChange={(e) => setTravelerAge(e.target.value)}
                min="18"
                max="120"
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

            <div className="bg-white p-6 rounded mb-6">
              <p className="text-gray-600 text-sm mb-1">Valor Total da Viagem</p>
              <p className="text-4xl font-bold text-accent">
                R$ {result.estimatedTotal.toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                R$ {result.costPerDay}/dia
              </p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-bold">
                Seguradoras Recomendadas
              </h3>
              <span className="inline-flex items-center gap-1 bg-accent-soft text-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-teal-200">
                ✓ Verificadas
              </span>
              <span className="inline-flex items-center gap-1 bg-accent-soft text-accent text-xs font-semibold px-2.5 py-1 rounded-full border border-teal-200">
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
                  <p className="text-2xl font-bold text-teal mb-3">
                    R$ {insurer.estimatedTotal.toLocaleString('pt-BR')}
                  </p>
                  <a
                    href={buildAffiliateUrl(insurer.slug, 'calculadora', 'viagem')}
                    className="btn-primary w-full text-center no-underline block"
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
                  <strong>Mais de 800 viajantes</strong> compararam seguros nas últimas 24h. Os preços podem variar — solicite sua cotação agora.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <span className="text-lg leading-none mt-0.5">💰</span>
                <p className="text-sm font-semibold" style={{ color: '#166534' }}>
                  <strong>Economize até R$ {(result.estimatedTotal * 0.35).toLocaleString('pt-BR')}</strong> comparando pelo menos 3 cotações. Quem compara, paga até 35% menos no seguro viagem.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                <span className="text-lg leading-none mt-0.5">⏰</span>
                <p className="text-sm font-semibold" style={{ color: '#92400e' }}>
                  Oferta limitada: algumas seguradoras têm vagas limitadas por região. Garanta sua cotação antes que as vagas se esgotem.
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
        <PremiumReportCTA
          insuranceType="viagem"
          estimatedPrice={`R$ ${result.estimatedTotal.toLocaleString('pt-BR')} (total)`}
          quotes={result.topInsurers.map((insurer) => ({
            slug: insurer.slug,
            name: insurer.name,
            rating: insurer.rating,
            estimatedMonthly: Math.round(insurer.estimatedTotal / parseInt(durationDays) * 30),
          }))}
          userInputs={{
            Destino: destination === 'americas' ? 'Américas/Caribe' : destination === 'europe' ? 'Europa' : 'Mundial',
            Duração: `${durationDays} dias`,
            'Idade do Viajante': `${travelerAge} anos`,
          }}
          recommendations={[
            destination === 'europe'
              ? 'Para Europa, verifique se o seguro atende os requisitos do Tratado de Schengen (mínimo €30.000 de cobertura médica).'
              : destination === 'worldwide'
                ? 'Para destinos mundiais, opte por coberturas mais amplas incluindo repatriação sanitária.'
                : 'Para Américas, o custo é mais baixo, mas verifique cobertura para esportes e atividades de aventura.',
            parseInt(travelerAge) > 60
              ? 'Viajantes com mais de 60 anos devem verificar se há limite de idade na apólice e cobertura para doenças preexistentes.'
              : 'Seu perfil jovem garante as melhores taxas — aproveite para incluir seguro de cancelamento.',
            'Compare as 3 seguradoras e verifique qual oferece assistência 24h em português e maior rede credenciada no destino.',
          ]}
        />
      )}

      {result && (
        <LeadCaptureForm
          insuranceType="viagem"
          coverageAmount={result.estimatedTotal.toString()}
          state=""
        />
      )}

      <section className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          O que é Seguro de Viagem?
        </h2>
        <p className="text-gray-700 mb-4">
          O seguro de viagem protege você durante deslocamentos nacionais e
          internacionais, cobrindo despesas médicas, cancelamento, bagagem e
          outras eventualidades.
        </p>
        <h3 className="font-bold mb-2">Coberturas Principais</h3>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">+</span>
            <span>Despesas médicas no exterior</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">+</span>
            <span>Cancelamento de viagem</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">+</span>
            <span>Bagagem extraviada</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">+</span>
            <span>Assistência jurídica</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">+</span>
            <span>Repatriação</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">+</span>
            <span>Assistência 24h no exterior</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Dúvidas Frequentes
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Seguro de viagem é obrigatório?
            </summary>
            <p className="text-gray-700 mt-3">
              Não é obrigatório no Brasil, mas é altamente recomendado,
              especialmente para viagens internacionais. Alguns países como
              Schengen exigem.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Viagens frequentes têm desconto?
            </summary>
            <p className="text-gray-700 mt-3">
              Sim, existem seguros anuais para quem viaja várias vezes no ano.
              Geralmente mais econômicos.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              A cobertura inclui COVID-19?
            </summary>
            <p className="text-gray-700 mt-3">
              Depende da apólice. Verifique se a seguradora oferece cobertura
              para doenças infecciosas.
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
                name: 'Seguro de viagem é obrigatório?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Não é obrigatório no Brasil, mas é altamente recomendado, especialmente para viagens internacionais. Alguns países como Schengen exigem.',
                },
              },
              {
                '@type': 'Question',
                name: 'Viagens frequentes têm desconto?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sim, existem seguros anuais para quem viaja várias vezes no ano. Geralmente mais econômicos.',
                },
              },
              {
                '@type': 'Question',
                name: 'A cobertura inclui COVID-19?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Depende da apólice. Verifique se a seguradora oferece cobertura para doenças infecciosas.',
                },
              },
            ],
          }),
        }}
      />
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Calcula Seguro',
            url: 'https://calculaseguro.com.br',
            description: 'Comparador de seguros online. Cotação grátis de seguro auto, viagem, residencial, vida e saúde.',
            sameAs: [
              'https://calculaseguro.com.br',
            ],
          }),
        }}
      />
    </div>
  );
}

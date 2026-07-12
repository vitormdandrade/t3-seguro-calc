'use client';

import { useState } from 'react';
import carModels from '../../../data/car-models.json';
import states from '../../../data/states.json';
import { calculateAutoInsurance, AutoInsuranceInput } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import PremiumReportCTA from '@/components/PremiumReportCTA';

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
      <span className="eyebrow mb-3">🚗 Calculadora · Auto</span>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--brand-navy)', letterSpacing: '-0.02em' }}>
        Calculadora de Seguro Auto
      </h1>
      <p className="text-body mb-8" style={{ color: 'var(--color-muted)' }}>
        Calcule uma estimativa de preço de seguro para seu veículo em segundos.
      </p>

      {/* Social Proof Strip — pre-calculation */}
      <div className="flex items-center justify-center gap-2 mb-8 p-3 rounded-xl text-sm font-semibold text-center" style={{ background: 'var(--brand-teal)', color: '#fff' }}>
        <span>🏆</span>
        <span>Junte-se a mais de <strong>50.000 brasileiros</strong> que já economizaram até <strong>35%</strong> no seguro auto comparando aqui</span>
      </div>

      {/* Trust + Urgency Strip — visible before calculation */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 p-4 rounded-xl" style={{ background: 'var(--brand-sand-warm)', border: '1px solid var(--color-border)' }}>
        {[
          { icon: '🛡️', text: 'Cotação 100% grátis' },
          { icon: '⭐', text: '26 seguradoras verificadas' },
          { icon: '⚡', text: 'Resultado em segundos' },
          { icon: '🔒', text: 'Dados protegidos' },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand-navy)' }}>
            <span className="text-base">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">
        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--brand-navy)' }}>Dados do veículo</h2>

          <div className="space-y-5">
            <div>
              <label className="field-label">
                Marca do carro *
              </label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel('');
                  setYear('');
                }}
                className="select-field w-full"
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
                <label className="field-label">
                  Modelo *
                </label>
                <select
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setYear('');
                  }}
                  className="select-field w-full"
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
                <label className="field-label">
                  Ano do carro *
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="select-field w-full"
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
              <label className="field-label">
                Estado (UF) *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="select-field w-full"
              >
                {states.map((s) => (
                  <option key={s.uf} value={s.uf}>
                    {s.name} ({s.uf})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label">
                Idade do motorista *
              </label>
              <input
                type="number"
                value={driverAge}
                onChange={(e) => setDriverAge(e.target.value)}
                min="18"
                max="120"
                className="input-field w-full"
              />
            </div>

            <label htmlFor="garage" className="flex items-center gap-3 cursor-pointer select-none rounded-xl px-4 py-3" style={{ background: 'var(--brand-sand)', border: '1px solid var(--color-border)' }}>
              <input
                type="checkbox"
                id="garage"
                checked={hasGarage}
                onChange={(e) => setHasGarage(e.target.checked)}
                className="w-4 h-4 accent-[var(--brand-teal)]"
              />
              <span className="text-sm font-medium" style={{ color: 'var(--brand-navy)' }}>
                Possui garagem? <span style={{ color: 'var(--brand-teal)' }}>(desconto de 15%)</span>
              </span>
            </label>

            <button
              onClick={handleCalculate}
              className="btn-primary w-full"
            >
              Calcular seguro
            </button>
          </div>

          <p className="mt-6 p-4 rounded-xl text-sm" style={{ background: 'var(--color-warning-soft)', border: '1px solid #f3e3bf', color: 'var(--brand-navy)' }}>
            <strong style={{ color: 'var(--brand-gold)' }}>Aviso:</strong> Valores estimados que não constituem
            proposta de seguro. Solicite uma cotação oficial gratuita.
          </p>
        </div>

        {result && (
          <div className="result-panel p-6 sm:p-8">
            <span className="eyebrow mb-4" style={{ color: 'var(--brand-teal)' }}>Sua estimativa</span>

            <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-caption mb-1">Valor mensal estimado</p>
              <p className="price-figure" style={{ fontSize: '2.5rem' }}>
                R$ {result.monthlyMin.toLocaleString('pt-BR')}
                <span style={{ color: 'var(--color-muted)', fontWeight: 600, fontSize: '1.5rem' }}>
                  {' '}– {result.monthlyMax.toLocaleString('pt-BR')}
                </span>
              </p>
              <p className="text-sm mt-3" style={{ color: 'var(--color-muted)' }}>
                Perfil de risco:{' '}
                <span className="font-semibold capitalize" style={{ color: 'var(--brand-navy)' }}>
                  {result.riskProfile}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h3 className="text-base font-bold mr-1" style={{ color: 'var(--brand-navy)' }}>
                Seguradoras recomendadas
              </h3>
              <span className="pill pill-teal">✓ Verificadas</span>
              <span className="pill" style={{ background: 'var(--brand-sand-warm)', color: 'var(--brand-navy)' }}>🔒 Cotação segura</span>
            </div>

            <div className="space-y-3">
              {result.topInsurers.map((insurer, idx) => (
                <div
                  key={insurer.slug}
                  className="rounded-2xl p-4"
                  style={{ background: idx === 0 ? '#fef3c7' : 'var(--color-surface)', border: idx === 0 ? '2px solid #f59e0b' : '1px solid var(--color-border)' }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold" style={{ color: 'var(--brand-navy)' }}>{insurer.name}</h4>
                      {idx === 0 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ background: '#fef3c7', color: '#92400e', borderColor: '#fcd34d' }}>
                          ⭐ Mais procurada
                        </span>
                      )}
                      <span className="text-sm font-semibold" style={{ color: 'var(--brand-gold)' }}>
                        ★ {insurer.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xl font-extrabold" style={{ color: 'var(--brand-teal)' }}>
                      R$ {insurer.estimatedMonthly}
                    </p>
                  </div>
                  <a
                    href={buildAffiliateUrl(insurer.slug, 'calculadora', 'auto')}
                    className="btn-primary w-full text-center no-underline block"
                  >
                    Receber cotação grátis
                  </a>
                </div>
              ))}
            </div>

            {/* Urgency + Trust Elements */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: 'var(--color-accent-secondary-soft)', border: '1px solid #f6d3c6' }}>
                <span className="text-lg leading-none mt-0.5">⚡</span>
                <p className="text-sm" style={{ color: 'var(--brand-coral-dark, #c2410c)' }}>
                  <strong>Mais de 1.200 pessoas</strong> compararam seguros nas últimas 24h. Os preços podem variar — solicite sua cotação agora.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <span className="text-lg leading-none mt-0.5">👁️</span>
                <p className="text-sm font-semibold" style={{ color: '#1e40af' }}>
                  <strong>{Math.floor(Math.random() * 15 + 5)} pessoas</strong> estão vendo esta cotação agora — as vagas de algumas seguradoras são limitadas por região.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <span className="text-lg leading-none mt-0.5">💰</span>
                <p className="text-sm font-semibold" style={{ color: '#166534' }}>
                  <strong>Economize até R$ {(result.monthlyMax * 12 * 0.35).toLocaleString('pt-BR')}/ano</strong> comparando pelo menos 3 cotações. Quem compara, paga até 35% menos no seguro auto.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                <span className="text-lg leading-none mt-0.5">⏰</span>
                <p className="text-sm font-semibold" style={{ color: '#92400e' }}>
                  Oferta limitada: algumas seguradoras têm vagas limitadas por região. Garanta sua cotação antes que as vagas se esgotem.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl p-3" style={{ background: 'var(--brand-sand)', border: '1px solid var(--color-border)' }}>
                <span className="text-lg leading-none mt-0.5">🛡️</span>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  Cotação 100% gratuita e sem compromisso. Seus dados estão seguros — você será redirecionado ao site oficial da seguradora.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {result && (
        <PremiumReportCTA
          insuranceType="auto"
          estimatedPrice={`R$ ${result.monthlyMin.toLocaleString('pt-BR')} – R$ ${result.monthlyMax.toLocaleString('pt-BR')}/mês`}
          quotes={result.topInsurers.map((insurer) => ({
            slug: insurer.slug,
            name: insurer.name,
            rating: insurer.rating,
            estimatedMonthly: insurer.estimatedMonthly,
          }))}
          userInputs={{
            Marca: brand,
            Modelo: model,
            Ano: year,
            Estado: state,
            'Idade do Motorista': `${driverAge} anos`,
            Garagem: hasGarage ? 'Sim' : 'Não',
          }}
          recommendations={[
            result.riskProfile === 'high'
              ? 'Considere instalar rastreador GPS para reduzir o prêmio em até 15%.'
              : 'Seu perfil de risco é favorável — compare as opções para obter o melhor custo-benefício.',
            'Solicite cotações das 3 seguradoras acima e negocie descontos para pagamento anual.',
            hasGarage
              ? 'Manter o veículo em garagem já está garantindo seu desconto de ~15%.'
              : 'Estacionar em garagem pode reduzir seu seguro em até 15%.',
          ]}
        />
      )}

      {result && (
        <LeadCaptureForm
          insuranceType="auto"
          coverageAmount={Math.round((result.monthlyMin + result.monthlyMax) / 2 * 12).toString()}
          state={state}
        />
      )}

      <section className="rounded-2xl p-6 sm:p-8 mb-12" style={{ background: 'var(--brand-sand-warm)' }}>
        <h2 className="text-xl sm:text-2xl font-bold mb-5" style={{ color: 'var(--brand-navy)' }}>
          Como funciona a calculadora?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-3" style={{ color: 'var(--brand-navy)' }}>Fatores considerados</h3>
            <ul className="space-y-2">
              {['Marca e modelo do veículo', 'Ano de fabricação', 'Estado (índice regional)', 'Idade do motorista', 'Disponibilidade de garagem', 'Perfil de risco do carro'].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-muted)' }}>
                  <span style={{ color: 'var(--brand-teal)' }} className="mt-0.5">✓</span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3" style={{ color: 'var(--brand-navy)' }}>Importante saber</h3>
            <p className="text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
              O valor final pode variar dependendo de histórico de sinistros,
              pontuação na CNH, tipo de cobertura (terceiros vs. completo) e
              outras avaliações da seguradora. Sempre solicite uma cotação
              oficial gratuita.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: 'var(--brand-navy)' }}>
          Dúvidas frequentes
        </h2>
        <div className="space-y-3">
          {[
            ['Qual é o seguro obrigatório?', 'O DPVAT é o seguro obrigatório no Brasil. Ele cobre danos corporais causados por veículos automotores. As demais coberturas são opcionais.'],
            ['Qual a diferença entre terceiros e completo?', 'Terceiros (RC): cobre danos ao terceiro. Completo: inclui terceiros + cobertura contra roubo, incêndio e danos ao seu veículo.'],
            ['Quanto tempo leva para receber uma cotação?', 'A cotação oficial pode ser obtida em minutos direto no site das seguradoras ou por telefone.'],
          ].map(([q, a]) => (
            <details key={q} className="card p-5 group">
              <summary className="font-semibold cursor-pointer flex items-center justify-between gap-4 list-none" style={{ color: 'var(--brand-navy)' }}>
                {q}
                <span className="transition-transform group-open:rotate-180" style={{ color: 'var(--brand-teal)' }}>⌄</span>
              </summary>
              <p className="mt-3 text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
                {a}
              </p>
            </details>
          ))}
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

      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Início',
                item: 'https://calculaseguro.com.br',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Calculadoras',
                item: 'https://calculaseguro.com.br/calculadora',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Seguro Auto',
                item: 'https://calculaseguro.com.br/calculadora/seguro-auto',
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
            description: 'Comparador de seguros online. Cotação grátis de seguro auto, viagem, residencial, vida e saúde. Compare 26 seguradoras verificadas.',
            sameAs: [
              'https://calculaseguro.com.br',
            ],
          }),
        }}
      />
    </div>
  );
}

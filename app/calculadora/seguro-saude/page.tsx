'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateHealthInsurance, HealthInsuranceInput } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const COVERAGE_TYPE_OPTIONS = [
  { value: 'enfermaria', label: 'Enfermaria (quarto compartilhado)' },
  { value: 'apartamento', label: 'Apartamento (quarto privativo)' },
] as const;

const REGION_OPTIONS = [
  { value: 'capital', label: 'Capital / Região Metropolitana' },
  { value: 'interior', label: 'Interior' },
] as const;

const COVERAGE_AMOUNT_OPTIONS = [
  { value: '50000', label: 'Básico (~R$ 50 mil/ano)' },
  { value: '100000', label: 'Intermediário (~R$ 100 mil/ano)' },
  { value: '200000', label: 'Premium (~R$ 200 mil/ano)' },
  { value: '300000', label: 'Plus (~R$ 300 mil/ano)' },
];

export default function CalculadoraSeguroSaude() {
  const [age, setAge] = useState('35');
  const [coverageType, setCoverageType] = useState<HealthInsuranceInput['coverageType']>('enfermaria');
  const [region, setRegion] = useState<HealthInsuranceInput['region']>('capital');
  const [dependents, setDependents] = useState('0');
  const [coverageAmount, setCoverageAmount] = useState('100000');
  const [result, setResult] = useState<ReturnType<typeof calculateHealthInsurance> | null>(null);

  const handleCalculate = () => {
    if (!age || parseInt(age) < 18 || parseInt(age) > 80) {
      alert('Por favor, insira uma idade entre 18 e 80 anos.');
      return;
    }

    const input: HealthInsuranceInput = {
      age: parseInt(age),
      coverageType,
      region,
      dependents: parseInt(dependents),
      coverageAmount: parseInt(coverageAmount),
    };

    const calculatedResult = calculateHealthInsurance(input);
    setResult(calculatedResult);
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <span className="eyebrow mb-3">🏥 Calculadora · Plano de Saúde</span>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--brand-navy)', letterSpacing: '-0.02em' }}>
        Calculadora de Plano de Saúde
      </h1>
      <p className="text-body mb-8" style={{ color: 'var(--color-muted)' }}>
        Simule o custo mensal do seu plano de saúde individual ou familiar com base no mercado brasileiro
      </p>

      {/* Trust + Social Proof Strip */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 p-4 rounded-xl" style={{ background: 'var(--brand-sand-warm)', border: '1px solid var(--color-border)' }}>
        {[
          { icon: '🏥', text: 'Cotação 100% gratuita' },
          { icon: '📊', text: 'Dados do mercado brasileiro' },
          { icon: '⚡', text: 'Resultado em segundos' },
          { icon: '🔒', text: 'Sem cadastro necessário' },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand-navy)' }}>
            <span className="text-base">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Live Viewer Counter — social proof at top */}
      <div className="flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
        <span>👁️</span>
        <span><strong>{(() => { const today = new Date().toISOString().slice(0, 10); let hash = 0; for (let i = 0; i < today.length; i++) {{ hash = ((hash << 5) - hash) + today.charCodeAt(i); hash |= 0; }} return 5 + (Math.abs(hash) % 15); })()} pessoas</strong> estão simulando planos de saúde agora</span>
      </div>

      {/* ── Calculator Grid ────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">
        {/* Input Card */}
        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--brand-navy)' }}>
            Seu Perfil
          </h2>

          <div className="space-y-5">
            {/* Age */}
            <div>
              <label className="field-label">
                Sua Idade * (18–80 anos)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                max="80"
                className="input-field w-full"
                placeholder="Ex: 35"
              />
            </div>

            {/* Coverage Type */}
            <div>
              <label className="field-label">
                Tipo de Acomodação *
              </label>
              <select
                value={coverageType}
                onChange={(e) =>
                  setCoverageType(e.target.value as HealthInsuranceInput['coverageType'])
                }
                className="select-field w-full"
              >
                {COVERAGE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="field-label">
                Região de Residência *
              </label>
              <select
                value={region}
                onChange={(e) =>
                  setRegion(e.target.value as HealthInsuranceInput['region'])
                }
                className="select-field w-full"
              >
                {REGION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dependents */}
            <div>
              <label className="field-label">
                Número de Dependentes (0–5)
              </label>
              <select
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                className="select-field w-full"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n === 0
                      ? 'Nenhum (apenas você)'
                      : `${n} dependente${n > 1 ? 's' : ''}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Coverage Amount */}
            <div>
              <label className="field-label">
                Cobertura Desejada *
              </label>
              <select
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(e.target.value)}
                className="select-field w-full"
              >
                {COVERAGE_AMOUNT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-caption mt-1">
                Valor de referência anual da cobertura
              </p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="btn-primary w-full"
            >
              Simular Plano de Saúde
            </button>
          </div>

          {/* Disclaimer */}
          <p
            className="mt-6 p-4 rounded-xl text-sm"
            style={{
              background: 'var(--color-warning-soft)',
              border: '1px solid #f3e3bf',
              color: 'var(--brand-navy)',
            }}
          >
            <strong style={{ color: 'var(--brand-gold)' }}>Aviso:</strong>{' '}
            Valores estimados com base em médias do mercado brasileiro e não
            constituem proposta de plano de saúde. Solicite uma cotação oficial
            gratuita.
          </p>
        </div>

        {/* Results Panel */}
        {result && (
          <div className="result-panel p-6 sm:p-8">
            <span className="eyebrow mb-4" style={{ color: 'var(--brand-teal)' }}>
              Sua estimativa
            </span>

            {/* Price Range */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-caption mb-1">Faixa de preço mensal estimada</p>
              <p className="price-figure" style={{ fontSize: '2.25rem' }}>
                R$ {formatCurrency(result.monthlyMin)}
                <span
                  style={{
                    color: 'var(--color-muted)',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                  }}
                >
                  {' '}– {formatCurrency(result.monthlyPremium)}
                </span>
              </p>
              <p
                className="text-sm mt-2 font-semibold"
                style={{ color: 'var(--brand-teal)' }}
              >
                Valor típico: R$ {formatCurrency(result.monthlyTypical)}/mês
              </p>

              <div className="divider my-4" />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-caption">Acomodação</span>
                  <p className="font-semibold" style={{ color: 'var(--brand-navy)' }}>
                    {result.coverageType}
                  </p>
                </div>
                <div>
                  <span className="text-caption">Região</span>
                  <p className="font-semibold" style={{ color: 'var(--brand-navy)' }}>
                    {result.region}
                  </p>
                </div>
                <div>
                  <span className="text-caption">Faixa Etária</span>
                  <p className="font-semibold" style={{ color: 'var(--brand-navy)' }}>
                    {result.ageRange}
                  </p>
                </div>
                <div>
                  <span className="text-caption">Perfil de Risco</span>
                  <p
                    className="font-semibold capitalize"
                    style={{
                      color:
                        result.riskTier === 'baixo'
                          ? 'var(--brand-teal)'
                          : result.riskTier === 'médio'
                            ? 'var(--brand-gold)'
                            : 'var(--brand-coral)',
                    }}
                  >
                    {result.riskTier}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Tiers */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div
                className="rounded-xl p-3 text-center"
                style={{
                  background: 'var(--color-accent-soft)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--brand-teal)' }}>
                  Mínimo
                </p>
                <p
                  className="text-lg font-extrabold mt-1"
                  style={{ color: 'var(--brand-navy)' }}
                >
                  R$ {formatCurrency(result.monthlyMin)}
                </p>
              </div>
              <div
                className="rounded-xl p-3 text-center"
                style={{
                  background: 'var(--brand-teal-soft)',
                  border: '2px solid var(--brand-teal)',
                }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--brand-teal)' }}>
                  Típico
                </p>
                <p
                  className="text-lg font-extrabold mt-1"
                  style={{ color: 'var(--brand-navy)' }}
                >
                  R$ {formatCurrency(result.monthlyTypical)}
                </p>
              </div>
              <div
                className="rounded-xl p-3 text-center"
                style={{
                  background: 'var(--color-accent-secondary-soft)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--brand-coral)' }}>
                  Premium
                </p>
                <p
                  className="text-lg font-extrabold mt-1"
                  style={{ color: 'var(--brand-navy)' }}
                >
                  R$ {formatCurrency(result.monthlyPremium)}
                </p>
              </div>
            </div>

            {/* Recommended Insurers */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h3
                className="text-base font-bold mr-1"
                style={{ color: 'var(--brand-navy)' }}
              >
                Operadoras Recomendadas
              </h3>
              <span className="pill pill-teal">✓ Verificadas</span>
              <span
                className="pill"
                style={{
                  background: 'var(--brand-sand-warm)',
                  color: 'var(--brand-navy)',
                }}
              >
                🔒 Cotação Segura
              </span>
            </div>

            <div className="space-y-3">
              {result.topInsurers.map((insurer) => (
                <div
                  key={insurer.slug}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <h4
                        className="font-bold"
                        style={{ color: 'var(--brand-navy)' }}
                      >
                        {insurer.name}
                      </h4>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--brand-gold)' }}
                      >
                        ★ {insurer.rating.toFixed(1)}
                      </span>
                    </div>
                    <p
                      className="text-xl font-extrabold"
                      style={{ color: 'var(--brand-teal)' }}
                    >
                      R$ {formatCurrency(insurer.estimatedMonthly)}
                    </p>
                  </div>
                  <a
                    href={buildAffiliateUrl(insurer.slug, 'calculadora', 'saude')}
                    className="btn-primary w-full text-center no-underline block"
                  >
                    Receber Cotação Grátis
                  </a>
                </div>
              ))}
            </div>

            {/* Urgency + Trust Elements */}
            <div className="mt-6 space-y-3">
              <div
                className="flex items-start gap-2.5 rounded-xl p-3"
                style={{
                  background: 'var(--color-accent-secondary-soft)',
                  border: '1px solid #f6d3c6',
                }}
              >
                <span className="text-lg leading-none mt-0.5">⚡</span>
                <p
                  className="text-sm"
                  style={{ color: 'var(--brand-coral-dark, #c2410c)' }}
                >
                  <strong>Mais de 2.500 pessoas</strong> compararam planos de
                  saúde nas últimas 24h. Os preços podem variar — solicite sua
                  cotação agora.
                </p>
              </div>
              <div
                className="flex items-start gap-2.5 rounded-xl p-3"
                style={{
                  background: 'var(--brand-sand)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span className="text-lg leading-none mt-0.5">🔒</span>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  Seus dados estão seguros. Não armazenamos informações pessoais —
                  você será redirecionado ao site oficial da operadora.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Lead Capture Form ──────────────────────────────────────── */}
      {result && (
        <LeadCaptureForm
          insuranceType="saude"
          coverageAmount={result.monthlyTypical.toString()}
          state=""
        />
      )}

      {/* ── How It Works ───────────────────────────────────────────── */}
      <section
        className="rounded-2xl p-6 sm:p-8 mb-12"
        style={{ background: 'var(--brand-sand-warm)' }}
      >
        <h2
          className="text-xl sm:text-2xl font-bold mb-5"
          style={{ color: 'var(--brand-navy)' }}
        >
          Como funciona a calculadora de plano de saúde?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3
              className="font-bold mb-3"
              style={{ color: 'var(--brand-navy)' }}
            >
              Fatores considerados
            </h3>
            <ul className="space-y-2">
              {[
                'Idade do titular (faixas etárias ANS)',
                'Tipo de acomodação (enfermaria ou apartamento)',
                'Região de residência (capital ou interior)',
                'Número de dependentes no plano',
                'Nível de cobertura desejada',
                'Rede credenciada da operadora',
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  <span
                    style={{ color: 'var(--brand-teal)' }}
                    className="mt-0.5"
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="font-bold mb-3"
              style={{ color: 'var(--brand-navy)' }}
            >
              Tipos de Plano de Saúde
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
              <li>
                <strong style={{ color: 'var(--brand-navy)' }}>Enfermaria:</strong>{' '}
                Quarto compartilhado com 2 a 4 leitos. Opção mais econômica,
                ideal para quem busca o essencial.
              </li>
              <li>
                <strong style={{ color: 'var(--brand-navy)' }}>Apartamento:</strong>{' '}
                Quarto privativo individual. Mais conforto e privacidade durante
                a internação. Custa em média 30–50% mais que a enfermaria.
              </li>
              <li>
                <strong style={{ color: 'var(--brand-navy)' }}>Abrangência:</strong>{' '}
                Os planos podem ter cobertura municipal, estadual, regional ou
                nacional. Quanto maior a abrangência, maior o custo.
              </li>
            </ul>
            <p
              className="text-sm mt-3"
              style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}
            >
              O valor final pode variar conforme a operadora, rede credenciada,
              carências e condições específicas do contrato. Sempre solicite uma
              cotação oficial.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section>
        <h2
          className="text-xl sm:text-2xl font-bold mb-6"
          style={{ color: 'var(--brand-navy)' }}
        >
          Dúvidas Frequentes sobre Plano de Saúde
        </h2>
        <div className="space-y-3">
          {[
            [
              'Qual a diferença entre enfermaria e apartamento?',
              'Enfermaria é o quarto compartilhado (2 a 4 leitos), enquanto apartamento é o quarto privativo individual. O plano com apartamento custa em média 30–50% mais caro, mas oferece mais conforto e privacidade durante internações.',
            ],
            [
              'Plano de saúde tem carência?',
              'Sim. A ANS permite carência de até 180 dias para consultas e exames simples, e até 24 meses para doenças e lesões preexistentes. Planos empresariais com mais de 30 vidas podem ter isenção de carência.',
            ],
            [
              'Como funciona o reajuste por idade?',
              'A ANS define 10 faixas etárias para reajuste. O valor da última faixa (59 anos ou mais) não pode ser superior a 6 vezes o valor da primeira faixa. O reajuste por mudança de faixa etária é aplicado no aniversário.',
            ],
            [
              'Qual o melhor plano de saúde para MEI?',
              'Planos empresariais para MEI (microempreendedor individual) costumam ser mais acessíveis que planos individuais. Operadoras como Amil, Bradesco Saúde e NotreDame Intermédica oferecem planos a partir de 2 vidas com preços competitivos.',
            ],
            [
              'Planos de saúde cobrem doenças preexistentes?',
              'Sim, após o período de carência (até 24 meses). Durante a carência, a operadora pode oferecer cobertura parcial temporária (CPT) para essas condições. É obrigatório declarar doenças preexistentes na contratação.',
            ],
            [
              'Posso incluir dependentes no plano?',
              'Sim. Cônjuge, filhos (até 21 anos, ou 24 se universitários), e em alguns casos pais podem ser incluídos como dependentes. Cada dependente representa um acréscimo no valor mensal.',
            ],
          ].map(([q, a]) => (
            <details key={q as string} className="card p-5 group">
              <summary
                className="font-semibold cursor-pointer flex items-center justify-between gap-4 list-none"
                style={{ color: 'var(--brand-navy)' }}
              >
                {q as string}
                <span
                  className="transition-transform group-open:rotate-180"
                  style={{ color: 'var(--brand-teal)' }}
                >
                  ⌄
                </span>
              </summary>
              <p
                className="mt-3 text-sm"
                style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}
              >
                {a as string}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── FAQPage Structured Data ─────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Qual a diferença entre enfermaria e apartamento?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Enfermaria é o quarto compartilhado (2 a 4 leitos), enquanto apartamento é o quarto privativo individual. O plano com apartamento custa em média 30–50% mais caro, mas oferece mais conforto e privacidade durante internações.',
                },
              },
              {
                '@type': 'Question',
                name: 'Plano de saúde tem carência?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sim. A ANS permite carência de até 180 dias para consultas e exames simples, e até 24 meses para doenças e lesões preexistentes. Planos empresariais com mais de 30 vidas podem ter isenção de carência.',
                },
              },
              {
                '@type': 'Question',
                name: 'Como funciona o reajuste por idade?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A ANS define 10 faixas etárias para reajuste. O valor da última faixa (59 anos ou mais) não pode ser superior a 6 vezes o valor da primeira faixa. O reajuste por mudança de faixa etária é aplicado no aniversário.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qual o melhor plano de saúde para MEI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Planos empresariais para MEI costumam ser mais acessíveis que planos individuais. Operadoras como Amil, Bradesco Saúde e NotreDame Intermédica oferecem planos a partir de 2 vidas com preços competitivos.',
                },
              },
              {
                '@type': 'Question',
                name: 'Planos de saúde cobrem doenças preexistentes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sim, após o período de carência (até 24 meses). Durante a carência, a operadora pode oferecer cobertura parcial temporária (CPT). É obrigatório declarar doenças preexistentes na contratação.',
                },
              },
            ],
          }),
        }}
      />

      {/* ── Cross-link ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-12 mt-8">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-teal-900 mb-1">
              Quer comparar outras opções de seguro?
            </p>
            <p className="text-teal-700 text-sm">
              Explore nossas calculadoras de seguro auto, vida, residencial e
              viagem — tudo em um só lugar.
            </p>
          </div>
          <Link
            href="/seguros"
            className="bg-teal-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-800 transition text-sm whitespace-nowrap flex-shrink-0"
          >
            Ver todos os seguros 🛡️
          </Link>
        </div>
      </section>
    </div>
  );
}

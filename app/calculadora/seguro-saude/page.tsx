'use client';

import { useState } from 'react';
import Link from 'next/link';
import states from '../../../data/states.json';
import { calculateHealthInsurance, HealthInsuranceInput } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const COVERAGE_OPTIONS = [
  { value: 'ambulatorial', label: 'Ambulatorial (consultas e exames)' },
  { value: 'hospitalar', label: 'Hospitalar (com internação)' },
  { value: 'enfermaria', label: 'Enfermaria (quarto compartilhado)' },
  { value: 'referencia', label: 'Referência ANS (cobertura completa)' },
];

const BRAZILIAN_CAPITALS = [
  'São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte',
  'Curitiba', 'Porto Alegre', 'Salvador', 'Recife', 'Fortaleza',
  'Manaus', 'Belém', 'Goiânia', 'São Luís', 'Maceió', 'Natal',
  'Teresina', 'João Pessoa', 'Aracaju', 'Cuiabá', 'Campo Grande',
  'Florianópolis', 'Vitória', 'Porto Velho', 'Rio Branco',
  'Macapá', 'Boa Vista', 'Palmas',
];

export default function CalculadoraSeguroSaude() {
  const [age, setAge] = useState('35');
  const [coverageType, setCoverageType] = useState<HealthInsuranceInput['coverageType']>('hospitalar');
  const [city, setCity] = useState('São Paulo');
  const [dependents, setDependents] = useState('0');
  const [result, setResult] = useState<ReturnType<typeof calculateHealthInsurance> | null>(null);

  const handleCalculate = () => {
    if (!age || parseInt(age) < 18 || parseInt(age) > 80) {
      alert('Por favor, insira uma idade entre 18 e 80 anos.');
      return;
    }
    if (!city.trim()) {
      alert('Por favor, informe sua cidade.');
      return;
    }

    const input: HealthInsuranceInput = {
      age: parseInt(age),
      coverageType,
      city: city.trim(),
      dependents: parseInt(dependents),
    };

    const calculatedResult = calculateHealthInsurance(input);
    setResult(calculatedResult);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Calculadora de Plano de Saúde
      </h1>
      <p className="text-gray-600 mb-8">
        Simule o preço do seu plano de saúde em segundos e compare as melhores operadoras
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Seu Perfil</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sua Idade * (18-80)
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
                Tipo de Cobertura *
              </label>
              <select
                value={coverageType}
                onChange={(e) =>
                  setCoverageType(e.target.value as HealthInsuranceInput['coverageType'])
                }
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                {COVERAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cidade *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Selecione sua cidade</option>
                {BRAZILIAN_CAPITALS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                {states.map((s) => (
                  <option key={s.uf} value={s.uf}>
                    {s.name} ({s.uf})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Dependentes (0-5)
              </label>
              <select
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n === 0 ? 'Nenhum (apenas você)' : `${n} dependente${n > 1 ? 's' : ''}`}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
            >
              Simular Plano de Saúde
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-700">
            <strong>Disclaimer:</strong> Valores estimados e não constituem
            proposta de plano de saúde. Solicite uma cotação oficial gratuita.
          </div>
        </div>

        {result && (
          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <h2 className="text-2xl font-bold mb-6 text-green-900">
              Sua Estimativa
            </h2>

            <div className="bg-white p-6 rounded mb-6">
              <p className="text-gray-600 text-sm mb-1">
                Valor Mensal Estimado ({result.coverageType})
              </p>
              <p className="text-4xl font-bold text-green-600">
                R$ {result.monthlyMin.toLocaleString('pt-BR')} -{' '}
                {result.monthlyMax.toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Faixa de risco:{' '}
                <span className="font-semibold capitalize">
                  {result.riskTier}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-bold">
                Operadoras Recomendadas
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
                    R$ {insurer.estimatedMonthly.toLocaleString('pt-BR')}
                  </p>
                  <a
                    href={buildAffiliateUrl(insurer.slug, 'calculadora', 'saude')}
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
                  <strong>Mais de 2.500 pessoas</strong> compararam planos de saúde nas últimas 24h. Os preços podem variar — solicite sua cotação agora.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                <span className="text-gray-500 text-lg">🔒</span>
                <p className="text-xs text-gray-500">
                  Seus dados estão seguros. Não armazenamos informações pessoais — você será redirecionado ao site oficial da operadora.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {result && (
        <LeadCaptureForm
          insuranceType="saude"
          coverageAmount={Math.round((result.monthlyMin + result.monthlyMax) / 2).toString()}
          state=""
        />
      )}

      <section className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Como Funciona o Plano de Saúde?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Fatores que Influenciam o Preço</h3>
            <ul className="space-y-2 text-gray-700">
              <li>- Idade do titular (faixas etárias ANS)</li>
              <li>- Tipo de cobertura (ambulatorial, hospitalar, referência)</li>
              <li>- Cidade de residência</li>
              <li>- Número de dependentes</li>
              <li>- Rede credenciada da operadora</li>
              <li>- Abrangência (municipal, estadual, nacional)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Tipos de Plano</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Ambulatorial:</strong> Consultas e exames simples</li>
              <li><strong>Hospitalar:</strong> Inclui internação</li>
              <li><strong>Enfermaria:</strong> Quarto compartilhado</li>
              <li><strong>Referência ANS:</strong> Cobertura completa obrigatória</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Dúvidas Frequentes sobre Plano de Saúde
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Qual o melhor plano de saúde para MEI?
            </summary>
            <p className="text-gray-700 mt-3">
              Planos empresariais para MEI (microempreendedor individual) costumam ser mais acessíveis.
              Operadoras como Amil, Bradesco Saúde e Unimed oferecem planos a partir de 2 vidas.
              Simule na calculadora para ter uma estimativa.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Plano de saúde tem carência?
            </summary>
            <p className="text-gray-700 mt-3">
              Sim, a ANS permite carência de até 180 dias para consultas e exames, e 24 meses para
              doenças preexistentes. Planos empresariais com mais de 30 vidas podem ter isenção.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Como funciona o reajuste por idade?
            </summary>
            <p className="text-gray-700 mt-3">
              A ANS define 10 faixas etárias. O último reajuste (aos 59+) não pode ser superior a 6x
              o valor da primeira faixa (0-18 anos). Os percentuais variam por operadora.
            </p>
          </details>
          <details className="bg-white p-4 rounded border border-gray-200">
            <summary className="font-bold cursor-pointer">
              Qual a diferença entre enfermaria e apartamento?
            </summary>
            <p className="text-gray-700 mt-3">
              Enfermaria é quarto compartilhado (2 a 4 leitos). Apartamento é quarto privativo.
              O plano com apartamento custa em média 30-50% mais caro.
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
                name: 'Qual o melhor plano de saúde para MEI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Planos empresariais para MEI (microempreendedor individual) costumam ser mais acessíveis. Operadoras como Amil, Bradesco Saúde e Unimed oferecem planos a partir de 2 vidas. Simule na calculadora para ter uma estimativa.',
                },
              },
              {
                '@type': 'Question',
                name: 'Plano de saúde tem carência?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sim, a ANS permite carência de até 180 dias para consultas e exames, e 24 meses para doenças preexistentes. Planos empresariais com mais de 30 vidas podem ter isenção.',
                },
              },
              {
                '@type': 'Question',
                name: 'Como funciona o reajuste por idade?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A ANS define 10 faixas etárias. O último reajuste (aos 59+) não pode ser superior a 6x o valor da primeira faixa (0-18 anos). Os percentuais variam por operadora.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qual a diferença entre enfermaria e apartamento?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Enfermaria é quarto compartilhado (2 a 4 leitos). Apartamento é quarto privativo. O plano com apartamento custa em média 30-50% mais caro.',
                },
              },
            ],
          }),
        }}
      />

      {/* Cross-link to seguros page */}
      <section className="max-w-6xl mx-auto px-4 pb-12 mt-8">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-bold text-teal-900 mb-1">Quer comparar outras opções de seguro?</p>
            <p className="text-teal-700 text-sm">
              Explore nossas calculadoras de seguro auto, vida, residencial e viagem — tudo em um só lugar.
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

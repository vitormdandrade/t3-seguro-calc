'use client';

import { useState } from 'react';
import { calculateTravelInsurance } from '@/lib/calculators';
import { buildAffiliateUrl } from '@/config/affiliates';

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
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Calculadora de Seguro de Viagem
      </h1>
      <p className="text-gray-600 mb-8">
        Proteja sua viagem com um seguro completo e acessível
      </p>

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
              <p className="text-gray-600 text-sm mb-1">Valor Total da Viagem</p>
              <p className="text-4xl font-bold text-green-600">
                R$ {result.estimatedTotal.toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                R$ {result.costPerDay}/dia
              </p>
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
                  <p className="text-2xl font-bold text-blue-600 mb-3">
                    R$ {insurer.estimatedTotal.toLocaleString('pt-BR')}
                  </p>
                  <a
                    href={buildAffiliateUrl(insurer.slug, 'calculadora', 'viagem')}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition font-semibold"
                  >
                    Receber Cotação Grátis
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
            <span className="text-green-600 font-bold mr-2">+</span>
            <span>Despesas médicas no exterior</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">+</span>
            <span>Cancelamento de viagem</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">+</span>
            <span>Bagagem extraviada</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">+</span>
            <span>Assistência jurídica</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">+</span>
            <span>Repatriação</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">+</span>
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
    </div>
  );
}

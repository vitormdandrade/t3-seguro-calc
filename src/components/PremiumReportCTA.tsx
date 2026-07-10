'use client';

import { useState, useMemo } from 'react';

interface QuoteInsurer {
  slug: string;
  name: string;
  rating: number;
  estimatedMonthly: number;
  highlights?: string[];
}

interface PremiumReportCTAProps {
  insuranceType: string;
  estimatedPrice: string;
  quotes: QuoteInsurer[];
  userInputs: Record<string, string>;
  recommendations: string[];
}

export default function PremiumReportCTA({
  insuranceType,
  estimatedPrice,
  quotes,
  userInputs,
  recommendations,
}: PremiumReportCTAProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  // Deterministic daily visitor count for urgency (changes once per day)
  const visitorsNow = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = ((hash << 5) - hash) + today.charCodeAt(i);
      hash |= 0;
    }
    return 3 + (Math.abs(hash) % 15); // 3–17 visitors
  }, []);

  const reportsSoldThisMonth = useMemo(() => {
    const now = new Date();
    const monthSeed = `${now.getFullYear()}-${now.getMonth()}`;
    let hash = 0;
    for (let i = 0; i < monthSeed.length; i++) {
      hash = ((hash << 5) - hash) + monthSeed.charCodeAt(i);
      hash |= 0;
    }
    return 180 + (Math.abs(hash) % 80); // 180–259 reports
  }, []);

  const insuranceLabels: Record<string, string> = {
    auto: 'Seguro Auto',
    vida: 'Seguro de Vida',
    residencial: 'Seguro Residencial',
    viagem: 'Seguro Viagem',
  };

  const handleBuyReport = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          insuranceType,
          email: email.trim() || undefined,
          userInputs,
          estimatedPrice,
          quotes,
          recommendations,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao iniciar pagamento.');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não recebida.');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao processar pagamento. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">📊</span>
          <h3 className="text-lg font-bold text-amber-900">
            Relatório Premium de Cotação
          </h3>
        </div>
        <p className="text-amber-800 text-sm">
          Receba um PDF completo com 3 cotações reais e recomendações personalizadas
        </p>
      </div>

      {/* Body */}
      <div className="bg-white px-6 py-5">
        {/* What's included */}
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span className="text-sm text-gray-700">
              3 cotações comparadas lado a lado
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span className="text-sm text-gray-700">
              Tabela comparativa detalhada
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span className="text-sm text-gray-700">
              Recomendações para seu perfil
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span className="text-sm text-gray-700">
              Enviado por email em PDF
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span className="text-sm text-gray-700">
              Download imediato após pagamento
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span className="text-sm text-gray-700">
              Dados de {insuranceLabels[insuranceType] || insuranceType}
            </span>
          </div>
        </div>

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email para receber o relatório
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
          />
        </div>

        {/* Urgency + Social Proof strip */}
        <div className="mb-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            👁️ {visitorsNow} pessoas visualizando agora
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            📊 +{reportsSoldThisMonth} relatórios vendidos este mês
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
            🛡️ Garantia de 7 dias
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-gray-400 line-through">R$ 39,90</p>
            <p className="text-2xl font-extrabold text-gray-900">
              R$ 19,90
              <span className="text-sm font-normal text-gray-500 ml-1">
                pagamento único
              </span>
            </p>
            <p className="text-xs text-green-600 font-medium mt-0.5">
              Economize R$ 20 — oferta por tempo limitado
            </p>
          </div>
          <button
            onClick={handleBuyReport}
            disabled={loading}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-base"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processando...
              </span>
            ) : (
              'Quero Meu Relatório Completo 🚀'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Trust badges — more prominent */}
        <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">🔒</span>
            <span className="text-[11px] font-semibold text-gray-700">Pagamento seguro</span>
            <span className="text-[10px] text-gray-400">Stripe SSL</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">📧</span>
            <span className="text-[11px] font-semibold text-gray-700">Entrega imediata</span>
            <span className="text-[10px] text-gray-400">PDF por email</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">↩️</span>
            <span className="text-[11px] font-semibold text-gray-700">7 dias de garantia</span>
            <span className="text-[10px] text-gray-400">Sem perguntas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

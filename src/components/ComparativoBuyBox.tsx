'use client';

import { useState } from 'react';

export default function ComparativoBuyBox() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleBuy = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: 'comparativo-2026',
          email: email.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao iniciar pagamento.');
      }

      // Redireciona para o Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de pagamento não recebida.');
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
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: 'var(--color-surface)',
        border: '2px solid var(--brand-teal)',
        boxShadow: '0 12px 32px rgba(15, 118, 110, 0.12)',
      }}
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <p className="text-4xl font-extrabold" style={{ color: 'var(--brand-navy)' }}>
          R$ 14,90
        </p>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-muted)' }}>
          pagamento único
        </p>
      </div>
      <p className="text-sm mt-1.5 mb-5" style={{ color: 'var(--color-muted)' }}>
        Menos que uma franquia de streaming — e pode economizar centenas de reais na
        sua próxima apólice.
      </p>

      <label
        className="block text-sm font-semibold mb-1.5"
        style={{ color: 'var(--brand-navy)' }}
      >
        Email para receber o PDF
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition mb-4"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--brand-navy)',
        }}
      />

      <button
        onClick={handleBuy}
        disabled={loading}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processando...
          </span>
        ) : (
          'Comprar o comparativo por R$ 14,90 →'
        )}
      </button>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-4 text-xs flex-wrap" style={{ color: 'var(--color-muted)' }}>
        <span>🔒 Pagamento via Stripe</span>
        <span>📧 Entrega imediata por email</span>
      </div>
    </div>
  );
}

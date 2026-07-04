'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RelatorioPage() {
  const params = useParams();
  const sessionId = params?.session_id as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadReady, setDownloadReady] = useState(false);

  const handleDownload = async () => {
    if (!sessionId) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/report/${sessionId}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao gerar o relatório.');
      }

      const blob = await response.blob();
      const disposition = response.headers.get('Content-Disposition') || '';
      const filenameMatch = disposition.match(/filename="?([^";]+)"?/);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filenameMatch?.[1] || `relatorio-cotacao-calcula-seguro.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setDownloadReady(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao baixar o relatório. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      // Auto-trigger download
      handleDownload();
    }
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-12">
        <div className="text-6xl mb-6">📊</div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Seu Relatório Premium está pronto!
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          O pagamento foi confirmado e seu PDF está sendo gerado. O download
          começará automaticamente e uma cópia também vai para o seu email.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
            {error}
          </div>
        )}

        {downloadReady && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">
              ✅ Download concluído!
            </p>
            <p className="text-green-700 text-sm mt-1">
              O relatório também foi enviado para seu email.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleDownload}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3.5 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Gerando relatório...
              </span>
            ) : (
              '📥 Baixar Relatório Novamente'
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>🛡️</span>
            <span>Pagamento seguro via Stripe</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 mb-2">
            O que vem no seu relatório:
          </h3>
          <ul className="text-left text-sm text-gray-600 space-y-2 max-w-sm mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              3 cotações reais comparadas lado a lado
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              Tabela comparativa detalhada
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              Recomendações personalizadas
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              Análise de cada seguradora
            </li>
          </ul>
        </div>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-left">
          <p className="font-bold text-amber-900 mb-1">
            📊 Conheça também: Comparativo de Seguros 2026
          </p>
          <p className="text-sm text-amber-800 mb-3 leading-relaxed">
            Guia completo em PDF com preços de 10 tipos de seguro, ranking de
            seguradoras, valores por modelo de carro e índices dos 27 estados —
            por apenas R$ 14,90.
          </p>
          <Link
            href="/comparativo-2026"
            className="text-sm font-semibold text-amber-900 underline"
          >
            Ver o Comparativo 2026 →
          </Link>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ← Voltar para Calcula Seguro
          </Link>
        </div>
      </div>
    </div>
  );
}

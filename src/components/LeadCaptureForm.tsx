'use client';

import { useState, FormEvent } from 'react';

export interface LeadCaptureFormProps {
  insuranceType: string;
  coverageAmount: string;
  state: string;
}

export default function LeadCaptureForm({
  insuranceType,
  coverageAmount,
  state,
}: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido.');
      setLoading(false);
      return;
    }

    // Basic phone validation (Brazilian format)
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      setError('Por favor, insira um telefone válido com DDD.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          insurance_type: insuranceType,
          coverage_amount: coverageAmount,
          state,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar lead.');
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao enviar seus dados. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) {
      formatted = '(' + digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formatted += ') ' + digits.substring(2, 7);
    }
    if (digits.length > 7) {
      formatted += '-' + digits.substring(7, 11);
    }
    return formatted;
  };

  if (success) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-xl p-8 text-center mt-8">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Recebemos seus dados!
        </h3>
        <p className="text-accent mb-4">
          Um corretor parceiro entrará em contato em até 24 horas para
          apresentar as melhores cotações de seguro.
        </p>
        <p className="text-accent text-sm">
          Fique atento ao seu telefone e email. Atendimento gratuito e sem
          compromisso.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-8 mt-8 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-blue-900 mb-2">
          Receba Cotações Personalizadas Grátis 🎯
        </h3>
        <p className="text-blue-700">
          Corretores parceiros enviarão as melhores cotações para o seu perfil.
          Sem compromisso e 100% gratuito.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label
            htmlFor="lead-name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Nome Completo *
          </label>
          <input
            id="lead-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="lead-phone"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Telefone (WhatsApp) *
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(11) 99999-9999"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            disabled={loading}
            maxLength={16}
          />
        </div>

        <div>
          <label
            htmlFor="lead-email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Enviando...
            </span>
          ) : (
            'Quero Receber Cotações Grátis'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Seus dados estão seguros e não serão compartilhados com terceiros.
          Apenas corretores parceiros verificarão sua solicitação.
        </p>
      </form>
    </div>
  );
}

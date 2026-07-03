'use client';

import { useState, useEffect, FormEvent } from 'react';
import carModels from '../../../data/car-models.json';
import states from '../../../data/states.json';
import { useUtm } from '@/hooks/useUtm';

/* ── Data helpers (mirror logic from calculadora/seguro-auto but self-contained) ── */

const uniqueBrands = Array.from(new Set(carModels.map((c: any) => c.brand))).sort() as string[];
const getModels = (brand: string) =>
  Array.from(
    new Set(carModels.filter((c: any) => c.brand === brand).map((c: any) => c.model))
  ).sort() as string[];
const getYears = (brand: string, model: string) =>
  Array.from(
    new Set(
      carModels
        .filter((c: any) => c.brand === brand && c.model === model)
        .flatMap((c: any) => {
          const ys: number[] = [];
          for (let y = c.year_from; y <= c.year_to; y++) ys.push(y);
          return ys;
        })
    )
  ).sort((a: number, b: number) => b - a) as number[];

/* ── Page ── */

export default function LpSeguroAuto() {
  const utm = useUtm();

  /* Calculator state */
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [state, setState] = useState('SP');
  const [driverAge, setDriverAge] = useState('30');

  /* Form state */
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  /* Scroll form into view when shown */
  useEffect(() => {
    if (formVisible) {
      const el = document.getElementById('lead-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [formVisible]);

  /* Phone formatting */
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let fmt = '';
    if (digits.length > 0) fmt = '(' + digits.substring(0, 2);
    if (digits.length > 2) fmt += ') ' + digits.substring(2, 7);
    if (digits.length > 7) fmt += '-' + digits.substring(7, 11);
    return fmt;
  };

  /* Validate and show form */
  const handleGetQuotes = () => {
    if (!brand || !model || !year) {
      setFormVisible(true); // Still scroll to form
      return;
    }
    setFormVisible(true);
  };

  /* Submit lead */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Insira um email válido.');
      setLoading(false);
      return;
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      setError('Insira um telefone válido com DDD.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          insurance_type: 'auto',
          coverage_amount: null,
          state: state || '',
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_term: utm.utm_term,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar.');
      setSuccess(true);

      /* Track conversion */
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-REPLACE_WITH_CONVERSION_ID/REPLACE_WITH_CONVERSION_LABEL',
        });
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Render ── */

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-sand)' }}>
      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--brand-teal) 0%, #0d5c57 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 md:py-20">
          <div className="text-center mb-8 md:mb-10">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#ccfbf1' }}
            >
              +10 Seguradoras Parceiras
            </span>
            <h1 className="text-hero mb-3" style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 5vw, 2.75rem)' }}>
              Cotação de Seguro Auto em 30 segundos — Grátis
            </h1>
            <p className="text-subheading" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto' }}>
              Preencha os dados do seu veículo e receba cotações de até 3 seguradoras parceiras. Rápido, seguro e sem compromisso.
            </p>
          </div>

          {/* ═══ Quick Calculator card (above the fold) ═══ */}
          <div className="max-w-lg mx-auto card p-5 sm:p-6" style={{ borderRadius: 'var(--radius-xl)', border: '2px solid var(--color-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--brand-navy)' }}>
              🚗 Dados do veículo
            </h2>

            <div className="space-y-3">
              {/* Brand */}
              <div>
                <label className="field-label">Marca *</label>
                <select value={brand} onChange={e => { setBrand(e.target.value); setModel(''); setYear(''); }}
                  className="select-field w-full">
                  <option value="">Selecione a marca</option>
                  {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Model */}
              {brand && (
                <div>
                  <label className="field-label">Modelo *</label>
                  <select value={model} onChange={e => { setModel(e.target.value); setYear(''); }}
                    className="select-field w-full">
                    <option value="">Selecione o modelo</option>
                    {getModels(brand).map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}

              {/* Year */}
              {model && (
                <div>
                  <label className="field-label">Ano *</label>
                  <select value={year} onChange={e => setYear(e.target.value)}
                    className="select-field w-full">
                    <option value="">Selecione o ano</option>
                    {getYears(brand, model).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              )}

              {/* State */}
              <div>
                <label className="field-label">Estado (UF) *</label>
                <select value={state} onChange={e => setState(e.target.value)}
                  className="select-field w-full">
                  {states.map((s: any) => (
                    <option key={s.uf} value={s.uf}>{s.name} ({s.uf})</option>
                  ))}
                </select>
              </div>

              {/* Driver age */}
              <div>
                <label className="field-label">Idade do motorista *</label>
                <input type="number" value={driverAge} onChange={e => setDriverAge(e.target.value)}
                  min="18" max="120" className="input-field w-full" />
              </div>

              {/* CTA */}
              <button onClick={handleGetQuotes} className="btn-primary w-full text-base py-3.5">
                Quero Receber Cotações Grátis 🎯
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="trust-chip">
                <span>🔒</span> Seus dados estão seguros
              </div>
              <div className="trust-chip">
                <span>⚡</span> Resposta em minutos
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-8">
            <p className="text-sm animate-bounce" style={{ color: 'rgba(255,255,255,0.8)' }}>
              ↓ Preencha e receba cotações agora
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Lead Form Section ═══ */}
      <section id="lead-form-section" className="max-w-lg mx-auto px-4 py-10 sm:py-14">
        {success ? (
          /* Success state */
          <div className="result-panel p-6 sm:p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--brand-navy)' }}>
              Recebemos seus dados!
            </h2>
            <p className="mb-2" style={{ color: 'var(--color-muted)' }}>
              Até 3 corretores parceiros entrarão em contato em até 24 horas com as melhores cotações de seguro auto para o seu perfil.
            </p>
            <p className="text-sm" style={{ color: 'var(--color-muted-soft)' }}>
              Atendimento gratuito e sem compromisso. Fique atento ao seu telefone e email.
            </p>
          </div>
        ) : (
          /* Form */
          <div className="card-featured p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--brand-navy)' }}>
                Receber cotações de 3 seguradoras
              </h2>
              <p style={{ color: 'var(--color-muted)' }}>
                Preencha seus dados para receber orçamentos personalizados
              </p>
            </div>

            {!brand && formVisible && (
              <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'var(--color-warning-soft)', border: '1px solid #fcd34d', color: '#92400e' }}>
                ⚠️ Preencha os dados do veículo acima para receber cotações mais precisas.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lp-name" className="field-label">Nome Completo *</label>
                <input id="lp-name" type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Seu nome completo" className="input-field w-full" disabled={loading} />
              </div>
              <div>
                <label htmlFor="lp-phone" className="field-label">Telefone (WhatsApp) *</label>
                <input id="lp-phone" type="tel" value={phone} onChange={e => setPhone(formatPhone(e.target.value))}
                  placeholder="(11) 99999-9999" className="input-field w-full" disabled={loading} maxLength={16} />
              </div>
              <div>
                <label htmlFor="lp-email" className="field-label">Email *</label>
                <input id="lp-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com" className="input-field w-full" disabled={loading} />
              </div>

              {error && (
                <div className="rounded-lg p-3 text-sm" style={{ background: 'var(--color-danger-soft)', border: '1px solid #fecaca', color: 'var(--color-danger)' }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="btn-primary w-full text-base py-3.5">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : 'Receber Cotações Grátis'}
              </button>

              <p className="text-xs text-center" style={{ color: 'var(--color-muted-soft)' }}>
                Seus dados estão protegidos e serão compartilhados apenas com os corretores parceiros.
              </p>
            </form>
          </div>
        )}
      </section>

      {/* ═══ Trust section ═══ */}
      <section className="max-w-4xl mx-auto px-4 pb-14">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: '🛡️', title: '+10 Seguradoras', desc: 'Parceiras verificadas com as melhores taxas do mercado' },
            { icon: '🔒', title: 'Dados Protegidos', desc: 'LGPD compliant. Seus dados nunca serão vendidos.' },
            { icon: '⚡', title: 'Cotação em Minutos', desc: 'Corretores entram em contato rapidamente com as melhores ofertas' },
          ].map((t, i) => (
            <div key={i} className="card p-5 text-center">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-bold mb-1" style={{ color: 'var(--brand-navy)' }}>{t.title}</h3>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Footer (bare minimum) ═══ */}
      <footer className="text-center py-6 px-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-muted-soft)' }}>
          © {new Date().getFullYear()} Calcula Seguro. Simulações educacionais — consulte um corretor.
        </p>
      </footer>
    </div>
  );
}

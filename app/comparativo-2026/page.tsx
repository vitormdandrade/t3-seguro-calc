import { Metadata } from 'next';
import Link from 'next/link';
import ComparativoBuyBox from '@/components/ComparativoBuyBox';

export const metadata: Metadata = {
  title: 'Comparativo de Seguros 2026 — Guia de Preços e Seguradoras (PDF) | Calcula Seguro',
  description:
    'Guia completo em PDF com preços típicos de 10 tipos de seguro, ranking de seguradoras, seguro auto por modelo, índices dos 27 estados e 10 dicas para economizar. R$ 14,90, pagamento único.',
  alternates: { canonical: '/comparativo-2026' },
};

const included = [
  {
    icon: '📊',
    title: 'Panorama dos 10 tipos de seguro',
    desc: 'Faixas de preço mensais típicas de auto, vida, residencial, saúde, viagem e mais — com coberturas essenciais e obrigatoriedade legal.',
  },
  {
    icon: '🏆',
    title: 'Ranking de seguradoras',
    desc: 'Mais de 25 seguradoras ordenadas por avaliação dos consumidores, com produtos oferecidos e principais destaques de cada uma.',
  },
  {
    icon: '🚗',
    title: 'Seguro auto por modelo',
    desc: 'Prêmio médio mensal de mais de 100 modelos de veículos, agrupados por perfil de risco (baixo, médio e alto).',
  },
  {
    icon: '🗺️',
    title: 'Variação de preço por estado',
    desc: 'Índices de auto, vida, residencial e viagem nos 27 estados brasileiros, com observações sobre o risco de cada região.',
  },
  {
    icon: '💰',
    title: 'Como economizar',
    desc: '10 recomendações práticas — franquia, rastreador, classe de bônus, forma de pagamento — para reduzir o valor da sua apólice.',
  },
];

const faq = [
  {
    q: 'Como recebo o comparativo?',
    a: 'Logo após a confirmação do pagamento, o PDF é enviado para o email informado e você também pode baixá-lo imediatamente na página de confirmação. Não há prazo de espera.',
  },
  {
    q: 'Os preços do guia são cotações oficiais?',
    a: 'Não. Os valores são estimativas informativas baseadas em dados de mercado, pensadas para você chegar preparado à negociação. A cotação oficial deve ser feita com um corretor licenciado pela SUSEP.',
  },
  {
    q: 'O pagamento é seguro? Há alguma assinatura?',
    a: 'O pagamento é processado pela Stripe, uma das maiores plataformas de pagamento do mundo, com criptografia de ponta a ponta. É um pagamento único de R$ 14,90 — sem assinatura, sem renovação automática e sem cobranças futuras.',
  },
  {
    q: 'Para quem este comparativo é indicado?',
    a: 'Para quem vai contratar ou renovar qualquer seguro em 2026 e quer saber quanto é razoável pagar, quais seguradoras são mais bem avaliadas e como negociar desconto — tudo em um único documento de referência.',
  },
];

export default function Comparativo2026Page() {
  return (
    <div className="flex-1" style={{ background: 'var(--color-background)' }}>
      {/* ── Hero + compra ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 80% at 85% -10%, rgba(15,118,110,0.10), transparent 60%), radial-gradient(50% 60% at 0% 110%, rgba(232,93,58,0.06), transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-16 sm:pt-20 sm:pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <span className="eyebrow mb-5">Produto digital · PDF · Edição 2026</span>
            <h1
              className="font-bold tracking-tight text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--brand-navy)',
              }}
            >
              Comparativo de Seguros 2026{' '}
              <span style={{ color: 'var(--brand-teal)' }}>
                — Guia de Preços e Seguradoras no Brasil
              </span>
            </h1>
            <p
              className="mt-6 text-lg sm:text-xl max-w-xl"
              style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}
            >
              Saiba quanto é razoável pagar antes de falar com o corretor. Um único
              PDF reúne faixas de preço, ranking de seguradoras, valores por modelo
              de carro, índices por estado e dicas concretas de economia.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              <span className="trust-chip">
                <span style={{ color: 'var(--brand-teal)' }}>✓</span> Pagamento único
              </span>
              <span className="trust-chip">
                <span style={{ color: 'var(--brand-teal)' }}>✓</span> Entrega imediata
              </span>
              <span className="trust-chip">
                <span style={{ color: 'var(--brand-teal)' }}>✓</span> Dados de 27 estados
              </span>
            </div>
          </div>

          <div className="relative lg:justify-self-end w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] -z-10"
              style={{ background: 'var(--brand-sand-warm)' }}
            />
            <ComparativoBuyBox />
          </div>
        </div>
      </section>

      {/* ── O que está incluído ───────────────────────────────────── */}
      <section style={{ background: 'var(--brand-sand-warm)' }}>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl mb-10">
            <span className="eyebrow mb-3">Conteúdo do guia</span>
            <h2
              className="text-heading"
              style={{ color: 'var(--brand-navy)', fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}
            >
              O que está incluído
            </h2>
            <p className="text-body mt-4" style={{ color: 'var(--color-muted)' }}>
              Cinco seções organizadas para consulta rápida — o mesmo material que
              você levaria semanas para reunir pesquisando por conta própria.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {included.map(({ icon, title, desc }) => (
              <div key={title} className="card p-6">
                <span className="icon-chip mb-4">{icon}</span>
                <h3 className="font-bold text-lg mb-1.5" style={{ color: 'var(--brand-navy)' }}>
                  {title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
            <div
              className="card p-6 flex flex-col justify-center"
              style={{ background: 'var(--brand-teal)', border: 'none' }}
            >
              <p className="text-3xl font-extrabold text-white mb-1">R$ 14,90</p>
              <p className="text-sm text-white/85 mb-4" style={{ lineHeight: 1.6 }}>
                Menos que uma franquia de streaming, pagamento único — e uma referência
                de preços que vale para o ano inteiro.
              </p>
              <a href="#comprar" className="font-semibold text-white underline">
                Quero o meu guia →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bloco de compra âncora ────────────────────────────────── */}
      <section id="comprar" className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="eyebrow mb-3">Garanta o seu</span>
            <h2
              className="text-heading"
              style={{ color: 'var(--brand-navy)', fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}
            >
              Chegue à cotação sabendo os números
            </h2>
            <p className="text-body mt-4 mb-6" style={{ color: 'var(--color-muted)' }}>
              Quem conhece a faixa de preço justa negocia melhor. Informe seu email,
              conclua o pagamento seguro via Stripe e receba o PDF na hora — no email
              e com download imediato.
            </p>
            <ul className="space-y-2.5">
              {[
                'PDF completo com as 5 seções do guia',
                'Enviado por email + download imediato',
                'Sem assinatura e sem cobranças recorrentes',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  <span style={{ color: 'var(--brand-teal)' }} className="mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md lg:justify-self-end">
            <ComparativoBuyBox />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--brand-sand-warm)' }}>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl mb-10">
            <span className="eyebrow mb-3">Dúvidas frequentes</span>
            <h2
              className="text-heading"
              style={{ color: 'var(--brand-navy)', fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}
            >
              Perguntas e respostas
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {faq.map(({ q, a }) => (
              <div key={q} className="card p-6">
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--brand-navy)' }}>
                  {q}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="rounded-2xl px-6 py-6 text-center"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-xs max-w-3xl mx-auto" style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
            Aviso: os valores, índices e rankings do Comparativo de Seguros 2026 são
            estimativas informativas baseadas em dados de mercado e não constituem
            cotação oficial, oferta ou recomendação de contratação. Antes de contratar
            qualquer seguro, consulte um corretor licenciado pela SUSEP. Em caso de
            dúvidas sobre a compra, fale conosco pelo email de contato do site.
          </p>
          <p className="mt-3 text-xs">
            <Link href="/" className="underline" style={{ color: 'var(--brand-teal)' }}>
              ← Voltar para a página inicial
            </Link>
          </p>
        </div>
      </section>

      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

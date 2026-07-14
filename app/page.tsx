import Link from "next/link";

const categories = [
  {
    href: "/calculadora/seguro-auto",
    icon: "🚗",
    title: "Seguro Auto",
    desc: "Cotação para seu veículo em segundos.",
  },
  {
    href: "/calculadora/seguro-vida",
    icon: "❤️",
    title: "Seguro de Vida",
    desc: "Proteção financeira para sua família.",
  },
  {
    href: "/calculadora/seguro-residencial",
    icon: "🏠",
    title: "Residencial",
    desc: "Cobertura completa para a sua casa.",
  },
  {
    href: "/calculadora/seguro-saude",
    icon: "🏥",
    title: "Plano de Saúde",
    desc: "Compare planos e operadoras.",
  },
  {
    href: "/calculadora/seguro-viagem",
    icon: "✈️",
    title: "Seguro Viagem",
    desc: "Viaje protegido, dentro e fora do país.",
  },
];

const states = [
  "SP", "RJ", "MG", "BA", "PR", "RS", "PE", "CE", "DF", "SC",
  "GO", "AM", "ES", "PA", "MT", "MS", "RN", "PB", "AL", "MA",
  "PI", "SE", "RO", "AC", "RR", "AP", "TO",
];

export default function Home() {
  return (
    <div className="flex-1" style={{ background: "var(--color-background)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 85% -10%, rgba(15,118,110,0.10), transparent 60%), radial-gradient(50% 60% at 0% 110%, rgba(232,93,58,0.06), transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-16 sm:pt-20 sm:pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <span className="eyebrow mb-5">Comparador de seguros · Brasil</span>
            <h1
              className="font-bold tracking-tight text-balance"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--brand-navy)",
              }}
            >
              Quanto custa o seu seguro?{" "}
              <span style={{ color: "var(--brand-teal)" }}>
                Descubra em 1 minuto.
              </span>
            </h1>
            <p
              className="mt-6 text-lg sm:text-xl max-w-xl"
              style={{ color: "var(--color-muted)", lineHeight: 1.6 }}
            >
              Calcule estimativas de auto, vida, residencial, saúde e viagem —
              e compare as seguradoras mais bem avaliadas do Brasil. Grátis e
              sem cadastro.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/calculadora/seguro-auto" className="btn-primary no-underline">
                Calcular meu seguro
              </Link>
              <Link href="/estado" className="btn-secondary no-underline">
                Ver preços por estado
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              <span className="trust-chip">
                <span style={{ color: "var(--brand-teal)" }}>✓</span> 100% grátis
              </span>
              <span className="trust-chip">
                <span style={{ color: "var(--brand-teal)" }}>✓</span> Sem cadastro
              </span>
              <span className="trust-chip">
                <span style={{ color: "var(--brand-teal)" }}>✓</span> 27 estados cobertos
              </span>
            </div>
          </div>

          {/* Product-credible preview: a realistic estimate card. */}
          <div className="relative lg:justify-self-end w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] -z-10"
              style={{ background: "var(--brand-sand-warm)" }}
            />
            <div className="result-panel p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="pill pill-teal">🚗 Seguro Auto · SP</span>
                <span className="text-caption">Estimativa</span>
              </div>
              <p className="text-caption mt-5 mb-1">Mensalidade estimada</p>
              <p className="price-figure" style={{ fontSize: "2.5rem" }}>
                R$ 89
                <span
                  style={{ color: "var(--color-muted)", fontWeight: 600, fontSize: "1.25rem" }}
                >
                  {" "}– 127 / mês
                </span>
              </p>

              <div className="divider my-6" />

              <div className="space-y-3">
                {[
                  ["Porto Seguro", "★ 4.6", "R$ 94"],
                  ["Azul Seguros", "★ 4.4", "R$ 102"],
                  ["SulAmérica", "★ 4.5", "R$ 118"],
                ].map(([name, rating, price]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: "var(--brand-navy)" }}>{name}</span>
                      <span className="text-caption" style={{ color: "var(--brand-gold)" }}>{rating}</span>
                    </div>
                    <span className="font-bold" style={{ color: "var(--brand-teal)" }}>{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow mb-3">Calculadoras</span>
          <h2
            className="text-heading"
            style={{ color: "var(--brand-navy)", fontSize: "clamp(1.6rem, 3vw, 2rem)" }}
          >
            Escolha o que você quer proteger
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.map(({ href, icon, title, desc }) => (
            <Link key={href} href={href} className="category-tile no-underline group">
              <span className="icon-chip mb-4">{icon}</span>
              <h3 className="font-bold text-lg" style={{ color: "var(--brand-navy)" }}>
                {title}
              </h3>
              <p className="text-sm mt-1.5 flex-1" style={{ color: "var(--color-muted)" }}>
                {desc}
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: "var(--brand-teal)" }}
              >
                Calcular
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────────────── */}
      <section style={{ background: "var(--brand-sand-warm)" }}>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <div>
              <span className="eyebrow mb-3">Por que a Calcula Seguro</span>
              <h2
                className="text-heading"
                style={{ color: "var(--brand-navy)", fontSize: "clamp(1.6rem, 3vw, 2rem)" }}
              >
                Clareza antes de contratar
              </h2>
              <p className="text-body mt-4" style={{ color: "var(--color-muted)" }}>
                Estimativas honestas para você chegar na seguradora sabendo o que
                esperar — sem letras miúdas e sem pressão de vendas.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                ["01", "Cotações grátis", "Estimativas de preço sem custo e sem compromisso."],
                ["02", "Comparação rápida", "Veja as seguradoras mais bem avaliadas em segundos."],
                ["03", "100% transparente", "Critérios claros, sem surpresas no final."],
              ].map(([n, title, desc]) => (
                <div key={n}>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--brand-teal)" }}
                  >
                    {n}
                  </span>
                  <h3 className="font-bold text-lg mt-2 mb-1.5" style={{ color: "var(--brand-navy)" }}>
                    {title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-muted)", lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solutions ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow mb-3">Para cada perfil</span>
          <h2
            className="text-heading"
            style={{ color: "var(--brand-navy)", fontSize: "clamp(1.6rem, 3vw, 2rem)" }}
          >
            Soluções para todos
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Pessoas físicas", ["Seguro auto obrigatório", "Proteção de vida para dependentes", "Cobertura residencial", "Seguro viagem internacional"]],
            ["Autônomos e MEI", ["Seguro vida sem burocracia", "Proteção patrimonial", "Responsabilidade civil", "Cobertura de saúde"]],
            ["Pequenas empresas", ["Proteção do patrimônio", "Responsabilidade civil", "Cobertura de funcionários", "Seguro de frotas"]],
          ].map(([title, items]) => (
            <div key={title as string} className="card p-6">
              <h3 className="font-bold text-lg mb-4" style={{ color: "var(--brand-navy)" }}>
                {title as string}
              </h3>
              <ul className="space-y-2.5">
                {(items as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-muted)" }}>
                    <span style={{ color: "var(--brand-teal)" }} className="mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── By state ─────────────────────────────────────────────────── */}
      <section style={{ background: "var(--brand-sand-warm)" }}>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4 mb-3 flex-wrap">
            <div>
              <span className="eyebrow mb-3">Cobertura nacional</span>
              <h2
                className="text-heading"
                style={{ color: "var(--brand-navy)", fontSize: "clamp(1.6rem, 3vw, 2rem)" }}
              >
                Seguro por estado
              </h2>
            </div>
            <Link href="/estado" className="text-sm font-semibold no-underline" style={{ color: "var(--brand-teal)" }}>
              Ver todos os 27 estados →
            </Link>
          </div>
          <p className="text-body mb-7 max-w-2xl" style={{ color: "var(--color-muted)" }}>
            O preço do seguro varia conforme a região. Selecione o seu estado
            para ver índices locais e estimativas ajustadas.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2.5">
            {states.map((uf) => (
              <Link
                key={uf}
                href={`/estado/${uf.toLowerCase()}`}
                className="text-center py-3 rounded-xl text-sm font-bold no-underline transition-all"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--brand-navy)",
                }}
              >
                {uf}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Life insurance silo ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 flex items-center justify-between gap-8 flex-wrap"
          style={{
            background: "linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-teal-dark) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-16 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,93,58,0.22), transparent 70%)" }}
          />
          <div className="relative max-w-xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff" }}
            >
              ❤️ 12 guias especializados
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
              Tudo sobre Seguro de Vida
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              Quanto custa por idade, como calcular o capital segurado ideal e
              quais seguradoras pagam sinistros mais rápido — explicado sem
              juridiquês.
            </p>
          </div>
          <Link
            href="/seguro-vida"
            className="relative btn-primary no-underline whitespace-nowrap"
          >
            Ver guias completos →
          </Link>
        </div>
      </section>

      {/* ── Comparativo 2026 (produto digital) ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:pb-20">
        <div
          className="rounded-3xl p-8 sm:p-10 flex items-center justify-between gap-8 flex-wrap"
          style={{
            background: "var(--color-surface)",
            border: "2px solid var(--brand-gold)",
          }}
        >
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: "var(--brand-gold-soft)", color: "var(--brand-gold)" }}
            >
              📊 Novo · PDF Edição 2026
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ color: "var(--brand-navy)", letterSpacing: "-0.02em" }}
            >
              Comparativo de Seguros 2026
            </h2>
            <p style={{ color: "var(--color-muted)", lineHeight: 1.6 }}>
              Guia completo em PDF: faixas de preço de 10 tipos de seguro, ranking
              de seguradoras, valores por modelo de carro, índices dos 27 estados e
              10 dicas para pagar menos.
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold mb-3" style={{ color: "var(--brand-navy)" }}>
              R$ 14,90
              <span className="block text-sm font-normal" style={{ color: "var(--color-muted)" }}>
                pagamento único
              </span>
            </p>
            <Link href="/comparativo-2026" className="btn-primary no-underline whitespace-nowrap">
              Conhecer o guia →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social Proof ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="rounded-2xl px-6 py-8 text-center" style={{ background: "var(--brand-sand-warm)" }}>
          <p className="text-lg font-bold mb-1" style={{ color: "var(--brand-navy)" }}>
            🔥 Mais de 5.000 brasileiros já compararam seguros este mês
          </p>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Junte-se a eles e descubra o melhor custo-benefício para o seu perfil — grátis e em menos de 1 minuto.
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div
          className="rounded-3xl px-6 py-14 sm:py-16 text-center"
          style={{ background: "var(--brand-teal)" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
            Pronto para comparar seguros?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
            Escolha o tipo de seguro e receba estimativas personalizadas em
            segundos.
          </p>
          <Link href="/calculadora/seguro-auto" className="btn-primary no-underline">
            Começar agora →
          </Link>
        </div>
      </section>

      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Calcula Seguro',
            url: 'https://calculaseguro.com.br',
            description: 'Comparador gratuito de seguros no Brasil. Calcule e compare preços de seguro auto, vida, residencial, saúde e viagem com as melhores seguradoras.',
            sameAs: [
              'https://calculaseguro.com.br',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: ['Portuguese'],
            },
          }),
        }}
      />
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
                name: 'Como fazer cotação de seguro auto grátis?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use nossa calculadora de seguro auto gratuita. Informe marca, modelo, ano do veículo, estado e idade do condutor para receber uma estimativa de preço em segundos, sem cadastro.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qual a melhor seguradora do Brasil?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'As seguradoras mais bem avaliadas no Brasil incluem Porto Seguro (4.6★), SulAmérica (4.5★), Bradesco Seguros (4.4★) e Azul Seguros (4.4★). A melhor escolha depende do tipo de seguro, perfil e região. Compare usando nossas calculadoras.',
                },
              },
              {
                '@type': 'Question',
                name: 'Quanto custa um seguro auto em 2026?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'O seguro auto no Brasil custa em média R$ 89 a R$ 127 por mês para um veículo popular em SP, variando conforme modelo, ano, estado, idade do condutor e perfil de uso. Use nossa calculadora gratuita para uma estimativa personalizada.',
                },
              },
              {
                '@type': 'Question',
                name: 'Preciso fazer cadastro para usar a calculadora?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Não. Todas as calculadoras da Calcula Seguro são 100% gratuitas e não exigem cadastro. Você recebe a estimativa instantaneamente, sem informar e-mail ou telefone.',
                },
              },
              {
                '@type': 'Question',
                name: 'O seguro cobre todo o Brasil?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sim. Nossas calculadoras cobrem os 27 estados brasileiros. O valor do seguro varia por estado devido a índices de sinistralidade — SP, RJ e MG tendem a ter valores mais altos que estados do Norte e Nordeste.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

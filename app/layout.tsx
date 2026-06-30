import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Calculadora de Seguros Brasil | Seguro Auto, Vida, Saúde, Residencial e Viagem Online",
  description:
    "Compare seguros no Brasil com nossas calculadoras online grátis. Seguro auto, vida, saúde, residencial e viagem com cotações personalizadas e recomendações de seguradoras.",
  keywords:
    "seguro auto, seguro de vida, plano de saúde, seguro residencial, seguro viagem, calculadora, cotação, Brasil",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://calculaseguro.com.br'),
  verification: {
    google: 'jLNnr1oqTk7wonr7qSttLsXNoCjMGjO4U8DZLlOiYCQ',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Calculadora de Seguros Brasil | Cotações Online Grátis",
    description:
      "Calcule e compare seguros no Brasil. Seguro auto, vida, saúde, residencial e mais.",
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://calculaseguro.com.br',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <style>{`
          :root {
            --site-accent: #d97706;
            --site-accent-hover: #b45309;
            --site-accent-soft: #fffbeb;
            --site-accent-dark: #f59e0b;
            --site-accent-hover-dark: #fbbf24;
            --site-accent-soft-dark: rgba(245, 158, 11, 0.12);
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <header className="sticky top-0 z-50" style={{
          background: 'rgba(15, 118, 110, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}>
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 no-underline">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold tracking-tight text-white">Calcula Seguro</span>
            </a>
            <div className="flex gap-1 flex-wrap text-sm font-medium">
              <a href="/" className="btn-ghost text-white no-underline text-sm py-1.5 px-3">Início</a>
              <a href="/calculadora/seguro-auto" className="btn-ghost text-white no-underline text-sm py-1.5 px-3">Auto</a>
              <a href="/calculadora/seguro-vida" className="btn-ghost text-white no-underline text-sm py-1.5 px-3">Vida</a>
              <a href="/calculadora/seguro-residencial" className="btn-ghost text-white no-underline text-sm py-1.5 px-3">Residencial</a>
              <a href="/calculadora/seguro-saude" className="btn-ghost text-white no-underline text-sm py-1.5 px-3">Saúde</a>
              <a href="/calculadora/seguro-viagem" className="btn-ghost text-white no-underline text-sm py-1.5 px-3">Viagem</a>
              <a href="/estado" className="btn-ghost text-white no-underline text-sm py-1.5 px-3">Por Estado</a>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer style={{ background: 'var(--brand-navy)', color: '#94a3b8' }}>
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--brand-teal-light)' }}>Calculadoras</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    ['/calculadora/seguro-auto', 'Seguro Auto'],
                    ['/calculadora/seguro-vida', 'Seguro Vida'],
                    ['/calculadora/seguro-residencial', 'Residencial'],
                    ['/calculadora/seguro-saude', 'Plano de Saúde'],
                    ['/calculadora/seguro-viagem', 'Viagem'],
                  ].map(([href, label]) => (
                    <li key={href}><a href={href} className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>{label}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--brand-coral)' }}>Guias</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/guias/seguro-auto-obrigatorio-brasil" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Seguro Obrigatório</a></li>
                  <li><a href="/guias/como-acionar-seguro" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Como Acionar</a></li>
                  <li><a href="/guias/seguro-vida-autonomo" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Seguro Autônomo</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>Parceiros</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://oraculodomei.com.br" rel="noopener" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Oráculo do MEI</a></li>
                  <li><a href="https://compararsaas.com.br" rel="noopener" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Comparador SaaS</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: '#ffffff' }}>Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><span className="opacity-50 cursor-default">Privacidade (em breve)</span></li>
                  <li><span className="opacity-50 cursor-default">Termos (em breve)</span></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 text-center text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p>&copy; 2026 Calcula Seguro. Simulações educacionais — consulte um corretor.</p>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

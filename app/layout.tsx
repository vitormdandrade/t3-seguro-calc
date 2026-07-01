import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import MobileNav from "./components/MobileNav";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#0f766e",
};

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
  alternates: {
    languages: {
      'pt-BR': 'https://calculaseguro.com.br',
      'en': 'https://calculaseguro.com.br/en',
    },
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
      <body className="min-h-full flex flex-col antialiased">
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Calcula Seguro',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://calculaseguro.com.br',
              description: 'Compare e calcule seguros no Brasil com calculadoras online gratuitas. Seguro auto, vida, saúde, residencial e viagem.',
              foundingDate: '2025',
              sameAs: [
                'https://oraculodomei.com.br',
                'https://compararsaas.com.br',
              ],
            }),
          }}
        />
        <header className="sticky top-0 z-50" style={{
          background: 'var(--header-bg, rgba(15, 118, 110, 0.95))',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}>
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-y-3">
            <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold tracking-tight text-white">Calcula Seguro</span>
            </Link>
            <MobileNav />
          </nav>
        </header>

        <main className="flex-1" style={{ scrollPaddingTop: '80px' }}>{children}</main>

        <footer style={{ background: '#1e293b', color: '#94a3b8' }}>
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
                    <li key={href}><Link href={href} className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--brand-coral)' }}>Guias</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guias/seguro-auto-obrigatorio-brasil" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Seguro Obrigatório</Link></li>
                  <li><Link href="/guias/como-acionar-seguro" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Como Acionar</Link></li>
                  <li><Link href="/guias/seguro-vida-autonomo" className="no-underline hover:opacity-80" style={{ color: '#94a3b8' }}>Seguro Autônomo</Link></li>
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

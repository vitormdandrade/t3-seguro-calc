import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <header className="bg-blue-900 text-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo-white.svg" alt="SegoCalc" className="h-8 w-auto" />
            </a>
            <div className="flex gap-6 flex-wrap">
              <a href="/" className="hover:text-blue-200">
                Início
              </a>
              <a href="/calculadora/seguro-auto" className="hover:text-blue-200">
                Auto
              </a>
              <a href="/calculadora/seguro-vida" className="hover:text-blue-200">
                Vida
              </a>
              <a href="/calculadora/seguro-residencial" className="hover:text-blue-200">
                Residencial
              </a>
              <a href="/calculadora/seguro-saude" className="hover:text-blue-200">
                Saúde
              </a>
              <a href="/calculadora/seguro-viagem" className="hover:text-blue-200">
                Viagem
              </a>
              <a href="/estado" className="hover:text-blue-200 font-medium">
                Por Estado
              </a>
              <a href="/seguro-vida" className="hover:text-blue-200">
                Guias Vida
              </a>
              <a href="/guias" className="hover:text-blue-200">
                Guias
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1 bg-gray-50">{children}</main>

        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-bold mb-4">Calculadoras</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/calculadora/seguro-auto" className="hover:text-white transition">Seguro Auto</a>
                  </li>
                  <li>
                    <a href="/calculadora/seguro-vida" className="hover:text-white transition">Seguro Vida</a>
                  </li>
                  <li>
                    <a href="/calculadora/seguro-residencial" className="hover:text-white transition">Residencial</a>
                  </li>
                  <li>
                    <a href="/calculadora/seguro-saude" className="hover:text-white transition">Plano de Saúde</a>
                  </li>
                  <li>
                    <a href="/calculadora/seguro-viagem" className="hover:text-white transition">Viagem</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Guias</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/guias/seguro-auto-obrigatorio-brasil" className="hover:text-white transition">
                      Seguro Obrigatório
                    </a>
                  </li>
                  <li>
                    <a href="/guias/como-acionar-seguro" className="hover:text-white transition">Como Acionar</a>
                  </li>
                  <li>
                    <a href="/guias/seguro-vida-autonomo" className="hover:text-white transition">Seguro Autônomo</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Seguradoras</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/seguradoras/porto-seguro" className="hover:text-white transition">Porto Seguro</a>
                  </li>
                  <li>
                    <a href="/seguradoras/bradesco-seguros" className="hover:text-white transition">Bradesco</a>
                  </li>
                  <li>
                    <a href="/seguradoras/youse" className="hover:text-white transition">Youse</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <span className="text-gray-500 cursor-not-allowed">Privacidade (em breve)</span>
                  </li>
                  <li>
                    <span className="text-gray-500 cursor-not-allowed">Termos de Uso (em breve)</span>
                  </li>
                  <li>
                    <span className="text-gray-500 cursor-not-allowed">Disclaimer (em breve)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mb-4 text-sm">
                <span className="font-semibold text-gray-200">
                  Recursos parceiros:
                </span>
                <a
                  href="https://oraculodomei.com.br"
                  rel="noopener"
                  className="hover:text-white transition"
                >
                  Oráculo do MEI (calculadoras e guias)
                </a>
                <a
                  href="https://compararsaas.com.br"
                  rel="noopener"
                  className="hover:text-white transition"
                >
                  Comparador SaaS (softwares para empresa)
                </a>
              </div>
              <p className="text-center">
                &copy; 2026 SegoCalc. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

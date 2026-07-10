import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Shell } from "./components/Shell";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
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
        {/* Google Ads Global Site Tag (gtag.js) — só carrega com ID real configurado */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
                `,
              }}
            />
          </>
        )}
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
              areaServed: {
                '@type': 'Country',
                name: 'Brasil',
              },
              sameAs: [
                'https://oraculodomei.com.br',
                'https://compararsaas.com.br',
              ],
            }),
          }}
        />
        {/* WebSite Structured Data — enables Google Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Calcula Seguro',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://calculaseguro.com.br',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://calculaseguro.com.br'}/?s={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        <Shell>{children}</Shell>

        <AnalyticsTracker />
        <Analytics />
      </body>
    </html>
  );
}

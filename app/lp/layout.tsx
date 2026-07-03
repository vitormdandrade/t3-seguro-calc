import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotação de Seguro Auto em 30 segundos — Grátis | Calcula Seguro",
  description:
    "Compare cotações de seguro auto de +10 seguradoras parceiras. Preencha os dados do veículo e receba até 3 cotações grátis em minutos.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Minimal layout for landing pages.
 * The root layout's header/footer are hidden for /lp routes —
 * this layout just renders children directly.
 */
export default function LpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

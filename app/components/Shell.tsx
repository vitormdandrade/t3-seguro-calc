"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileNav from "./MobileNav";

/**
 * Client-shell wrapper that conditionally renders the site header
 * and footer. For /lp/* routes, both are hidden — the landing page
 * provides its own minimal shell to maximize conversion.
 */
export function Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname.startsWith("/lp/");

  return (
    <>
      {!isLanding && (
        <header
          className="sticky top-0 z-50"
          style={{
            background: "var(--header-bg, rgba(15, 118, 110, 0.95))",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-y-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline shrink-0"
            >
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold tracking-tight text-white">
                Calcula Seguro
              </span>
            </Link>
            <MobileNav />
          </nav>
        </header>
      )}

      <main
        className="flex-1"
        style={{ scrollPaddingTop: isLanding ? "0px" : "80px" }}
      >
        {children}
      </main>

      {!isLanding && (
        <footer style={{ background: "#1e293b", color: "#94a3b8" }}>
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
              <div>
                <h4
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: "var(--brand-teal-light)" }}
                >
                  Calculadoras
                </h4>
                <ul className="space-y-2 text-sm">
                  {[
                    ["/calculadora/seguro-auto", "Seguro Auto"],
                    ["/calculadora/seguro-vida", "Seguro Vida"],
                    ["/calculadora/seguro-residencial", "Residencial"],
                    ["/calculadora/seguro-saude", "Plano de Saúde"],
                    ["/calculadora/seguro-viagem", "Viagem"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="no-underline hover:opacity-80"
                        style={{ color: "#94a3b8" }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: "var(--brand-coral)" }}
                >
                  Guias
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/guias/seguro-auto-obrigatorio-brasil"
                      className="no-underline hover:opacity-80"
                      style={{ color: "#94a3b8" }}
                    >
                      Seguro Obrigatório
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guias/como-acionar-seguro"
                      className="no-underline hover:opacity-80"
                      style={{ color: "#94a3b8" }}
                    >
                      Como Acionar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guias/seguro-vida-autonomo"
                      className="no-underline hover:opacity-80"
                      style={{ color: "#94a3b8" }}
                    >
                      Seguro Autônomo
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: "#ffffff" }}
                >
                  Parceiros
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://oraculodomei.com.br"
                      rel="noopener"
                      className="no-underline hover:opacity-80"
                      style={{ color: "#94a3b8" }}
                    >
                      Oráculo do MEI
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://compararsaas.com.br"
                      rel="noopener"
                      className="no-underline hover:opacity-80"
                      style={{ color: "#94a3b8" }}
                    >
                      Comparador SaaS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: "#ffffff" }}
                >
                  Legal
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="opacity-50 cursor-default">
                      Privacidade (em breve)
                    </span>
                  </li>
                  <li>
                    <span className="opacity-50 cursor-default">
                      Termos (em breve)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="pt-8 text-center text-xs"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p>
                &copy; 2026 Calcula Seguro. Simulações educacionais — consulte
                um corretor.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

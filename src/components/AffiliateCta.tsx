'use client';

import { track } from '@vercel/analytics';

interface Props {
  href: string;
  partner: string;
  page: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateCta({ href, partner, page, className, children }: Props) {
  if (href === '#') {
    return (
      <span
        className={`${className} opacity-50 cursor-not-allowed`}
        title="Link de afiliado em breve"
      >
        {children}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className={className}
        onClick={() => track('affiliate_click', { partner, page })}
      >
        {children}
      </a>
      {/* Trust + urgency micro-strip */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
          🔒 Link seguro
        </span>
        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">
          ⚡ Cotação rápida
        </span>
        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
          ✓ Parceiro verificado
        </span>
      </div>
    </div>
  );
}

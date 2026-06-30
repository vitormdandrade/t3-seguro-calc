'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/calculadora/seguro-auto', label: 'Auto' },
  { href: '/calculadora/seguro-vida', label: 'Vida' },
  { href: '/calculadora/seguro-residencial', label: 'Residencial' },
  { href: '/calculadora/seguro-saude', label: 'Saúde' },
  { href: '/calculadora/seguro-viagem', label: 'Viagem' },
  { href: '/estado', label: 'Por Estado' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll while the mobile menu overlay is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg"
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#ffffff',
          fontSize: '1.25rem',
          cursor: 'pointer',
        }}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? '✕' : '☰'}
      </button>

      <div className="hidden md:flex gap-1 flex-wrap text-sm font-medium">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="btn-ghost text-white no-underline text-sm py-1.5 px-3">{label}</Link>
        ))}
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50" style={{ top: '60px' }}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setOpen(false)} />
          <nav id="mobile-menu" className="absolute top-0 left-0 right-0 py-4 px-4" style={{ background: 'var(--brand-teal-dark)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block py-3 px-4 rounded-lg text-base font-medium text-white no-underline transition-colors hover:bg-white/10 active:bg-white/20"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

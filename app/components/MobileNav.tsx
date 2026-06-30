'use client';

import { useState } from 'react';

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

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg"
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#ffffff',
          fontSize: '1.25rem',
          cursor: 'pointer',
        }}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        {open ? '✕' : '☰'}
      </button>

      <div className="hidden md:flex gap-1 flex-wrap text-sm font-medium">
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} className="btn-ghost text-white no-underline text-sm py-1.5 px-3">{label}</a>
        ))}
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50" style={{ top: '60px' }}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setOpen(false)} />
          <nav className="absolute top-0 left-0 right-0 py-4 px-4" style={{ background: 'var(--brand-teal-dark)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="block py-3 px-4 rounded-lg text-base font-medium text-white no-underline" onClick={() => setOpen(false)}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

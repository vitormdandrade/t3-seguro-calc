import Link from "next/link";

const popular = [
  { href: "/calculadora/seguro-auto", label: "🚗 Seguro Auto" },
  { href: "/calculadora/seguro-vida", label: "❤️ Seguro Vida" },
  { href: "/calculadora/seguro-residencial", label: "🏠 Residencial" },
  { href: "/calculadora/seguro-saude", label: "🏥 Plano de Saúde" },
  { href: "/calculadora/seguro-viagem", label: "✈️ Viagem" },
  { href: "/estado", label: "🗺️ Por Estado" },
];

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-20 sm:py-28 text-center">
        <div className="text-6xl mb-4" aria-hidden="true">
          🧭
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-2">
          Erro 404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          A página que você procura pode ter sido movida ou não existe mais.
          Que tal começar por uma das nossas calculadoras gratuitas?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {popular.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block bg-teal-700 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-800 transition"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}

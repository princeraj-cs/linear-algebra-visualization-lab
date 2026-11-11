import { ArrowRight, BookOpen, Grid2X2, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const foundations = [
  {
    icon: LineChart,
    title: 'Visual intuition',
    description: 'Build understanding through interactive representations, not memorization.',
  },
  {
    icon: Grid2X2,
    title: 'Structured practice',
    description: 'Work from core concepts toward the problem-solving skills your course needs.',
  },
  {
    icon: BookOpen,
    title: 'Clear explanations',
    description: 'Connect notation, geometry, and computation at every step.',
  },
];

export function HomePage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent-600">
              Linear algebra, made visible
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Explore the structures behind the equations.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Linear Algebra Visual Lab is a focused learning space for understanding vectors,
              matrices, and the transformations they describe.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-3 font-semibold text-white transition hover:bg-accent-700"
              to="/"
            >
              Start exploring
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {foundations.map(({ description, icon: Icon, title }) => (
            <article className="rounded-xl border border-slate-200 bg-white p-6" key={title}>
              <Icon aria-hidden="true" className="text-accent-600" size={24} />
              <h2 className="mt-5 text-lg font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

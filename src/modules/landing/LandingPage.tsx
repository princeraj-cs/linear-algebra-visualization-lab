import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  Compass,
  Layers3,
  MousePointer2,
  Play,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';

const axioms = [
  { name: 'Axiom 1 · See it', subtitle: 'Interactive visuals that reveal the structure.' },
  { name: 'Axiom 2 · Move it', subtitle: 'Clear explanations for every transformation.' },
  { name: 'Axiom 3 · Prove it', subtitle: 'Focused practice that makes ideas stick.' },
];

const modules = [
  { icon: Compass, title: 'Vectors', description: 'See magnitude, direction, and linear combinations in action.', color: 'blue' },
  { icon: Layers3, title: 'Matrices', description: 'Understand matrices as structures and transformations.', color: 'violet' },
  { icon: BarChart3, title: 'Linear systems', description: 'Connect equations, geometry, and solution spaces.', color: 'amber' },
];

const features = [
  { icon: MousePointer2, title: 'Learn by interacting', description: 'Adjust parameters and observe how the mathematics responds.' },
  { icon: BookOpen, title: 'Follow a clear path', description: 'Move from core definitions to guided examples at your pace.' },
  { icon: Sparkles, title: 'Build lasting intuition', description: 'Link symbolic notation to geometric and visual meaning.' },
];

const faqs = [
  { question: 'Who is Linear Algebra Visual Lab for?', answer: 'It is designed for undergraduate learners, especially students building foundations for data science, computing, and related courses.' },
  { question: 'Do I need prior linear algebra experience?', answer: 'No. The learning path starts with fundamental ideas and gradually connects them to more formal notation.' },
  { question: 'Are the visualizations interactive?', answer: 'The application is being built around interactive visualizations. Each playground will let you explore concepts rather than only read about them.' },
];

export function LandingPage() {
  const [heroExpressionIndex, setHeroExpressionIndex] = useState(0);
  const heroExpressions = [
    { latex: 'Ax = b' },
    { latex: '\\det(A)' },
    { latex: '\\lambda' },
    { latex: '\\Sigma' },
    { latex: 'A^{-1}' },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setHeroExpressionIndex(mediaQuery.matches ? heroExpressions.length : 0);
    };
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    if (mediaQuery.matches) return () => mediaQuery.removeEventListener('change', updatePreference);

    const interval = window.setInterval(() => {
      setHeroExpressionIndex((current) => (current + 1) % (heroExpressions.length + 1));
    }, 3000);

    return () => {
      window.clearInterval(interval);
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, [heroExpressions.length]);

  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">§1 · LINEAR ALGEBRA, MADE VISIBLE</p>
            <h1 className="mt-5 max-w-[660px] text-5xl leading-[1.02] font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-[64px]">
              <span className="block">Explore the structures</span>
              <span className="block">behind</span>
              <span className="hero-expression-slot mt-1 block">
                {heroExpressionIndex === heroExpressions.length ? (
                  <span key="equations" className="hero-static-word text-slate-950">equations.</span>
                ) : (
                  <span
                    key={heroExpressionIndex}
                    aria-live="polite"
                    className="hero-math-expression block"
                    dangerouslySetInnerHTML={{
                      __html: katex.renderToString(heroExpressions[heroExpressionIndex].latex, {
                        throwOnError: false,
                        displayMode: false,
                      }),
                    }}
                  />
                )}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Build intuition for vectors, matrices, and transformations through clear lessons and interactive visual experiences.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-700" to="/dashboard">
                Enter the lab <span aria-hidden="true" className="lab-number text-base">∎</span>
              </Link>
              <span className="lab-number text-sm text-slate-500">34 MIT lectures · 6 playgrounds · ∞ matrices</span>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {axioms.map((axiom) => (
                <div className="border-l border-[color:var(--lab-border)] pl-3" key={axiom.name}>
                  <p className="lab-number text-xs font-bold text-slate-800">{axiom.name}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{axiom.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
          <MathPreview />
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionIntro eyebrow="A better way to study" title="From symbols to understanding" description="Linear algebra becomes easier when you can connect the formal steps to a picture, an operation, and an explanation." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Choose a concept', 'Start with a focused lesson or jump into a playground.'],
              ['02', 'Explore the structure', 'Change values and inspect how the visual model responds.'],
              ['03', 'Practice the idea', 'Check your understanding with targeted exercises.'],
            ].map(([number, title, description]) => (
              <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950" key={number}>
                <span className="font-mono text-sm font-semibold text-accent-600 dark:text-accent-400">{number}</span>
                <h3 className="mt-6 text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-2 leading-7 text-slate-500 dark:text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionIntro eyebrow="Explore the curriculum" title="A foundation you can see" description="Move through the ideas that make undergraduate linear algebra coherent, one visual connection at a time." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {modules.map(({ color, description, icon: Icon, title }) => (
              <Link className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700" key={title} to="/dashboard">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${moduleColors[color]}`}><Icon size={21} /></div>
                <h3 className="mt-6 text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-2 leading-7 text-slate-500 dark:text-slate-400">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-400">View module <ArrowRight className="transition group-hover:translate-x-1" size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionIntro eyebrow="Made for active learning" title="More than a collection of formulas" description="Every part of the lab is shaped to help you ask better questions and make your own observations." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map(({ description, icon: Icon, title }) => (
              <div className="rounded-2xl bg-white p-6 dark:bg-slate-950" key={title}>
                <Icon className="text-accent-600 dark:text-accent-400" size={23} />
                <h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-2 leading-7 text-slate-500 dark:text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400">For your learning journey</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Study with confidence, not guesswork.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-500 dark:text-slate-400">Whether you are revising for a course or strengthening your data science foundations, the lab keeps the next step clear.</p>
            <Link className="mt-7 inline-flex items-center gap-2 font-semibold text-accent-600 dark:text-accent-400" to="/dashboard">See your learning space <ArrowRight size={16} /></Link>
          </div>
          <div className="space-y-3">
            {faqs.map(({ answer, question }) => (
              <details className="group rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" key={question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white">
                  {question}<ChevronDown className="shrink-0 transition group-open:rotate-180" size={18} />
                </summary>
                <p className="mt-3 pr-6 text-sm leading-6 text-slate-500 dark:text-slate-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-5 py-16 text-center dark:bg-slate-800">
        <Play className="mx-auto text-accent-300" size={25} />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Ready to make linear algebra visible?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">Open the lab and start with the concept that matters most to you today.</p>
        <Link className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-accent-50" to="/dashboard">Enter the lab <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}

function MathPreview() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute h-56 w-px rotate-45 bg-accent-400/50" />
      <div className="absolute h-56 w-px -rotate-45 bg-violet-400/50" />
      <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <BookOpen className="text-accent-600" size={28} />
        <p className="mt-6 font-mono text-3xl font-semibold text-slate-950">v = (3, 2)</p>
        <div className="my-5 h-px w-full bg-accent-500" />
        <p className="max-w-xs text-sm leading-6 text-slate-500">Connect notation, geometry, and computation.</p>
      </div>
    </div>
  );
}

function SectionIntro({ description, eyebrow, title }: { description: string; eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}

const moduleColors: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
};

import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type LessonLayoutProps = {
  title: string;
  description: string;
  sections: string[];
};

export function LessonLayout({ description, sections, title }: LessonLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-accent-600 dark:text-accent-400">Learn · Foundations</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h1>
        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <BookOpen size={15} /> Contents
          </p>
          <nav className="mt-3 space-y-1">
            {sections.map((section, index) => (
              <a className={`block rounded-lg px-2 py-2 text-sm ${index === 0 ? 'bg-accent-50 font-medium text-accent-700 dark:bg-accent-500/15 dark:text-accent-300' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`} href={`#section-${index + 1}`} key={section}>
                {index + 1}. {section}
              </a>
            ))}
          </nav>
        </aside>
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="max-w-3xl space-y-8">
            {sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section}>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">Section {index + 1}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{section}</h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  This learning section will connect the notation to visual intuition and guided examples. Interactive mathematical content will be added in a later development phase.
                </p>
              </section>
            ))}
          </div>
          <div className="mt-10 flex justify-between border-t border-slate-200 pt-5 dark:border-slate-800">
            <Link className="inline-flex items-center gap-2 text-sm font-medium text-slate-500" to="/dashboard">
              <ChevronLeft size={16} /> Dashboard
            </Link>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-400" to="/vector-playground">
              Next lesson <ChevronRight size={16} />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

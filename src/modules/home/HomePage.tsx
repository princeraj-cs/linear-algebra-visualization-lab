import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  Play,
  TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  { title: 'Vectors', detail: 'Magnitude, direction, and operations', progress: 68, icon: Compass, tone: 'blue' },
  { title: 'Matrices', detail: 'Structure, operations, and transformations', progress: 32, icon: TrendingUp, tone: 'violet' },
  { title: 'Linear systems', detail: 'Equations, solutions, and elimination', progress: 12, icon: BookOpen, tone: 'amber' },
];

const recentTopics = ['Vector addition', 'Linear combinations', 'Reading matrix notation'];

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
      <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-accent-600 dark:text-accent-400">Wednesday, November 11</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Welcome back, learner.
          </h1>
          <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">
            Keep building your linear algebra intuition. You are making steady progress.
          </p>
        </div>
        <Link
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-700"
          to="/learn"
        >
          Continue learning <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Overall progress" value="34%" detail="+8% this week" icon={TrendingUp} />
        <StatCard label="Topics explored" value="12" detail="3 this week" icon={BookOpen} />
        <StatCard label="Practice streak" value="4 days" detail="Best: 7 days" icon={Clock3} />
      </section>

      <section className="mt-10">
        <SectionHeading title="Continue learning" action="View all lessons" to="/learn" />
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-accent-50 p-3 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
                <Play aria-hidden="true" size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">Up next</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">Understanding linear combinations</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Vectors · Lesson 3 of 8 · 18 min</p>
              </div>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400" to="/learn">
              Resume lesson <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ProgressBar value={68} />
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading title="Your modules" action="See curriculum" to="/learn" />
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {modules.map(({ detail, icon: Icon, progress, title, tone }) => (
            <Link
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              key={title}
              to="/learn"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
                <Icon aria-hidden="true" size={20} />
              </div>
              <h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
              <div className="mt-5 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>{progress}% complete</span>
                <ArrowRight aria-hidden="true" className="text-slate-400 transition group-hover:translate-x-1" size={15} />
              </div>
              <ProgressBar value={progress} />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <SectionHeading title="Recently explored" action="Open history" to="/progress" />
          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            {recentTopics.map((topic) => (
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0" key={topic}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={17} />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{topic}</span>
                </div>
                <span className="text-xs text-slate-400">Recently</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900 p-6 text-white dark:bg-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-300">A small step today</p>
          <h2 className="mt-3 text-xl font-semibold">Practice makes the structure stick.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Try a few focused questions to reinforce what you explored this week.</p>
          <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-200" to="/practice">
            Go to practice <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ action, title, to }: { action: string; title: string; to: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h2>
      <Link className="text-sm font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400" to={to}>
        {action}
      </Link>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div aria-label={`${value}% complete`} className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <div className="h-full rounded-full bg-accent-500" style={{ width: `${value}%` }} />
    </div>
  );
}

function StatCard({ detail, icon: Icon, label, value }: { detail: string; icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
        <Icon className="text-accent-500" size={18} />
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{detail}</p>
    </div>
  );
}

const toneClasses: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
};

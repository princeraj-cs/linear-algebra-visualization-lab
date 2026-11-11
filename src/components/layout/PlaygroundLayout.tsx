import { SlidersHorizontal } from 'lucide-react';

type PlaygroundLayoutProps = {
  title: string;
  description: string;
};

export function PlaygroundLayout({ description, title }: PlaygroundLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
      <p className="text-sm font-medium text-accent-600 dark:text-accent-400">Interactive workspace</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h1>
      <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">{description}</p>
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="flex min-h-[440px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
              <SlidersHorizontal size={28} />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">Visualization canvas</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              The interactive visualization and mathematical engine will be introduced in a later chunk.
            </p>
          </div>
        </section>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-950 dark:text-white">Controls</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Controls for this playground will appear here once its mathematical model is implemented.</p>
          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">No parameters configured yet.</div>
        </aside>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-950 dark:text-white">What you are seeing</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">An explanation panel will provide context, definitions, and guided observations for each interactive state.</p>
      </div>
    </div>
  );
}

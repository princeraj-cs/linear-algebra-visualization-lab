import { BookOpen } from 'lucide-react';

type ModulePageProps = {
  title: string;
  description: string;
};

export function ModulePage({ description, title }: ModulePageProps) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
        <BookOpen size={24} />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h1>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500 dark:text-slate-400">{description}</p>
      <p className="mt-8 text-sm font-medium text-accent-600 dark:text-accent-400">This module is ready for its next learning chunk.</p>
    </div>
  );
}

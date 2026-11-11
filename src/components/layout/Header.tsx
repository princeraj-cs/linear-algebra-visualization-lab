import { Menu, Moon, Sun } from 'lucide-react';

type HeaderProps = {
  isDark: boolean;
  onMenuClick: () => void;
  onThemeToggle: () => void;
};

export function Header({ isDark, onMenuClick, onThemeToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:px-8">
      <button
        aria-label="Open navigation"
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        onClick={onMenuClick}
        type="button"
      >
        <Menu aria-hidden="true" size={21} />
      </button>
      <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
        <span className="font-medium text-slate-900 dark:text-slate-100">Workspace</span>
        <span>/</span>
        <span>Learning studio</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 md:inline">IIT Madras BS Data Science</span>
        <button
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          onClick={onThemeToggle}
          type="button"
        >
          {isDark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-100 text-xs font-bold text-accent-700 dark:bg-accent-500/20 dark:text-accent-300">
          PR
        </div>
      </div>
    </header>
  );
}

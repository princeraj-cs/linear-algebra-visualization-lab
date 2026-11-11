import { X, Sigma } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from './navigation';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          type="button"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-950 lg:static lg:z-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <NavLink className="flex items-center gap-3" onClick={onClose} to="/dashboard">
            <span className="rounded-lg bg-accent-600 p-2 text-white">
              <Sigma aria-hidden="true" size={20} />
            </span>
            <span className="text-sm font-bold tracking-tight text-slate-950 dark:text-white">
              Linear Algebra
              <span className="block font-medium text-slate-500">Visual Lab</span>
            </span>
          </NavLink>
          <button
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={19} />
          </button>
        </div>
        <nav aria-label="Sidebar navigation" className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Explore
          </p>
          {navigationItems.map(({ icon: Icon, label, to }) => (
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`
              }
              end={to === '/'}
              key={to}
              onClick={onClose}
              to={to}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="m-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your workspace</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">Build intuition one concept at a time.</p>
        </div>
      </aside>
    </>
  );
}

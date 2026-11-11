import { Sigma } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [{ label: 'Home', to: '/' }];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink className="flex items-center gap-3" to="/">
          <span className="rounded-lg bg-accent-600 p-2 text-white">
            <Sigma aria-hidden="true" size={22} />
          </span>
          <span className="text-lg font-bold tracking-tight">Linear Algebra Visual Lab</span>
        </NavLink>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-accent-50 text-accent-700' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

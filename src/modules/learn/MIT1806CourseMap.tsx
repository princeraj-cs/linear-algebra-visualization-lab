import { useMemo, useState } from 'react';
import {
  ChevronDown,
  Clock3,
  Flag,
  Search,
  Shapes,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  mit1806Lectures,
  mit1806Units,
  type LectureUnit,
  type MIT1806Lecture,
  type PlaygroundType,
} from '../../data/mit1806';

const unitAccents: Record<LectureUnit, string> = {
  Foundations: 'var(--unit-foundations)',
  Spaces: 'var(--unit-spaces)',
  Orthogonality: 'var(--unit-orthogonality)',
  Determinants: 'var(--unit-determinants)',
  Eigen: 'var(--unit-eigen)',
  'Symmetric & Beyond': 'var(--unit-symmetric)',
  'Transformations & Applications': 'var(--unit-transformations)',
};

const unitDescriptions: Record<LectureUnit, string> = {
  Foundations: 'Equations, elimination, and matrix structure',
  Spaces: 'Subspaces, bases, and the fundamental spaces',
  Orthogonality: 'Projections, orthogonality, and least squares',
  Determinants: 'Volume, cofactors, and inverse formulas',
  Eigen: 'Eigenvalues, powers, and dynamical systems',
  'Symmetric & Beyond': 'Definite matrices, similarity, and SVD',
  'Transformations & Applications': 'Transformations, bases, and inverse theory',
};

export function MIT1806CourseMap() {
  const [query, setQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState<'All' | LectureUnit>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Not started'>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'lecture' | 'quiz-review'>('All');
  const [expandedUnits, setExpandedUnits] = useState<Set<LectureUnit>>(
    () => new Set(['Foundations']),
  );

  const filteredLectures = useMemo(() => {
    // Filtering is derived from the static course data; no course or progress state is mutated here.
    const normalizedQuery = query.trim().toLowerCase();
    return mit1806Lectures.filter((lecture) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        lecture.title.toLowerCase().includes(normalizedQuery) ||
        lecture.number.toLowerCase().includes(normalizedQuery);
      const matchesUnit = unitFilter === 'All' || lecture.unit === unitFilter;
      const matchesStatus = statusFilter === 'All';
      const matchesType = typeFilter === 'All' || lecture.type === typeFilter;
      return matchesQuery && matchesUnit && matchesStatus && matchesType;
    });
  }, [query, statusFilter, typeFilter, unitFilter]);

  const toggleUnit = (unit: LectureUnit) => {
    setExpandedUnits((current) => {
      const next = new Set(current);
      if (next.has(unit)) next.delete(unit);
      else next.add(unit);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-5">
        <p className="text-sm font-semibold text-accent-600 dark:text-accent-400">Learn · MIT OpenCourseWare</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">MIT 18.06 Linear Algebra</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Gilbert Strang's complete lecture sequence, organized as a visual learning roadmap.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">34 lectures</span>
        </div>
      </header>

      <section className="lab-surface rounded-2xl border p-4" aria-label="Course controls">
        <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_auto_auto_auto]">
          <label className="relative block">
            <span className="sr-only">Search lectures</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3 text-slate-400" size={17} />
            <input
              className="lab-number h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-accent-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lectures..."
              type="search"
              value={query}
            />
          </label>
          <FilterSelect
            label="Unit"
            onChange={(value) => setUnitFilter(value as 'All' | LectureUnit)}
            options={['All', ...mit1806Units]}
            value={unitFilter}
          />
          <FilterSelect
            label="Status"
            onChange={(value) => setStatusFilter(value as 'All' | 'Not started')}
            options={['All', 'Not started']}
            value={statusFilter}
          />
          <FilterSelect
            label="Type"
            onChange={(value) => setTypeFilter(value as 'All' | 'lecture' | 'quiz-review')}
            options={['All', 'lecture', 'quiz-review']}
            value={typeFilter}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Continue where you left off</p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">Lecture 1 · The Geometry of Linear Equations</p>
          </div>
          <button className="shrink-0 rounded-lg bg-accent-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-accent-700" type="button">Continue · 12:40</button>
        </div>
      </section>

      <section className="mt-7" aria-label="MIT 18.06 course map">
        <div className="relative">
          {mit1806Units.map((unit, unitIndex) => {
            const unitLectures = filteredLectures.filter((lecture) => lecture.unit === unit);
            if (unitLectures.length === 0) return null;
            const isExpanded = expandedUnits.has(unit) || query.trim().length > 0 || unitFilter !== 'All' || typeFilter !== 'All';
            const lectureCount = mit1806Lectures.filter((lecture) => lecture.unit === unit).length;

            return (
              <article className="relative grid grid-cols-[44px_minmax(0,1fr)]" key={unit}>
                <div className="relative flex justify-center">
                  {unitIndex < mit1806Units.length - 1 && (
                    <span className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-slate-200 dark:bg-slate-800" />
                  )}
                  <button
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${unit}`}
                    className="relative z-10 mt-5 flex h-11 w-11 items-center justify-center rounded-full border-4 border-canvas bg-slate-900 text-white shadow-lg dark:border-slate-950"
                    onClick={() => toggleUnit(unit)}
                    style={{ borderColor: 'var(--lab-bg)', boxShadow: `0 0 18px ${unitAccents[unit]}55` }}
                    type="button"
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: unitAccents[unit] }} />
                  </button>
                </div>

                <div className="min-w-0 pb-5">
                  <button
                    aria-expanded={isExpanded}
                    className="group mt-3 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    onClick={() => toggleUnit(unit)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full" style={{ background: `conic-gradient(${unitAccents[unit]} 0deg, var(--lab-border) 0deg)` }}>
                        <div className="m-[5px] flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-500 dark:bg-slate-900 dark:text-slate-300">0%</div>
                      </div>
                      <div>
                        <h2 className="font-semibold text-slate-950 dark:text-white">{unit}</h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{unitDescriptions[unit]} · {lectureCount} lectures</p>
                      </div>
                    </div>
                    <ChevronDown aria-hidden="true" className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={18} />
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="grid gap-3 pt-3 md:grid-cols-2 xl:grid-cols-3">
                        {unitLectures.map((lecture) => (
                          <LectureCard accent={unitAccents[unit]} key={lecture.id} lecture={lecture} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="mt-8 border-t border-slate-200 py-6 text-center text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Lectures by Prof. Gilbert Strang, MIT OpenCourseWare 18.06{' '}
        <a className="underline underline-offset-2 hover:text-accent-600" href="https://web.mit.edu/18.06/www/" rel="noreferrer" target="_blank">(CC BY-NC-SA)</a>
      </footer>
    </div>
  );
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
      <span>{label}</span>
      <select className="max-w-36 bg-transparent text-sm text-slate-700 outline-none dark:text-slate-200" onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function LectureCard({ accent, lecture }: { accent: string; lecture: MIT1806Lecture }) {
  const badge = badgeForPlayground(lecture.playgroundType);

  return (
    <article
      className={`lab-surface relative overflow-hidden rounded-2xl border p-4 ${lecture.type === 'quiz-review' ? 'border-amber-400/50' : ''}`}
      style={{ '--lecture-accent': accent } as React.CSSProperties}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: `${accent}55`, backgroundColor: `${accent}12`, color: accent }}>
          {lecture.type === 'quiz-review' ? <Flag aria-hidden="true" size={20} /> : <Shapes aria-hidden="true" size={20} />}
        </div>
        <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">Not started</span>
      </div>
      <div className="mt-4">
        <p className="lab-number text-xs font-bold" style={{ color: accent }}>Lecture {lecture.number}</p>
        <h3 className="mt-1 min-h-12 font-semibold leading-6 text-slate-950 dark:text-white">
          <Link className="hover:text-accent-600 focus-visible:rounded-sm dark:hover:text-accent-400" to={`/learn/${lecture.id}`}>
            {lecture.title}
          </Link>
        </h3>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><Clock3 size={13} />{lecture.duration ?? 'Duration TBD'}</span>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{badge}</span>
      </div>
      {lecture.playgroundLink && (
        <Link
          aria-label={`Open ${badge.toLowerCase()} playground for lecture ${lecture.number}`}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400"
          to={lecture.playgroundLink}
        >
          <Sparkles size={13} /> {lecture.playgroundType === 'direct' ? 'Try it' : 'Related playground'}
        </Link>
      )}
    </article>
  );
}

function badgeForPlayground(type: PlaygroundType) {
  if (type === 'direct') return 'Interactive';
  if (type === 'related') return 'Related';
  return 'Video only';
}

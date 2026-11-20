import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { mit1806Lectures, mit1806Units, type LectureUnit } from '../../data/mit1806';
import { LecturePreviewCard, unitSlug } from './MIT1806CourseMap';

const unitAccents: Record<LectureUnit, string> = {
  Foundations: 'var(--unit-foundations)',
  Spaces: 'var(--unit-spaces)',
  Orthogonality: 'var(--unit-orthogonality)',
  Determinants: 'var(--unit-determinants)',
  Eigen: 'var(--unit-eigen)',
  'Symmetric & Beyond': 'var(--unit-symmetric)',
  'Transformations & Applications': 'var(--unit-transformations)',
};

export function MIT1806UnitPage() {
  const { unitSlug: routeSlug } = useParams();
  const unit = mit1806Units.find((item) => unitSlug(item) === routeSlug);

  if (!unit) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Unit not found</h1>
        <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-600" to="/learn">
          <ArrowLeft size={16} /> Back to course map
        </Link>
      </div>
    );
  }

  const lectures = mit1806Lectures.filter((lecture) => lecture.unit === unit);
  const accent = unitAccents[unit];

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:py-10">
      <Link
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 dark:text-slate-400"
        to="/learn"
      >
        <ArrowLeft size={16} /> Course map
      </Link>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="lab-number text-xs font-bold" style={{ color: accent }}>{lectures.length} lectures</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{unit}</h1>
        </div>
        <button
          aria-label="Unit details"
          className="lab-surface flex h-11 w-11 items-center justify-center rounded-xl border text-slate-500"
          type="button"
        >
          <ChevronDown aria-hidden="true" size={18} />
        </button>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label={`${unit} lectures`}>
        {lectures.map((lecture) => (
          <LecturePreviewCard accent={accent} key={lecture.id} lecture={lecture} />
        ))}
      </section>

      <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Lectures by Prof. Gilbert Strang, MIT OpenCourseWare 18.06{' '}
        <a className="underline underline-offset-2 hover:text-accent-600" href="https://web.mit.edu/18.06/www/" rel="noreferrer" target="_blank">(CC BY-NC-SA)</a>
      </footer>
    </div>
  );
}

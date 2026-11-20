import { useMemo, useState } from 'react';
import { ChevronDown, Clock3, Flag, Shapes, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  mit1806Lectures,
  mit1806Units,
  type LectureUnit,
  type MIT1806Lecture,
} from '../../data/mit1806';

// Mock-only status values for this shell pass. They are intentionally local and
// will be replaced by useLectureProgress in a later pass.
const mockDoneLectureIds = new Set([
  'lecture-1',
  'lecture-2',
  'lecture-3',
]);

const unitAccents: Record<LectureUnit, string> = {
  Foundations: 'var(--unit-foundations)',
  Spaces: 'var(--unit-spaces)',
  Orthogonality: 'var(--unit-orthogonality)',
  Determinants: 'var(--unit-determinants)',
  Eigen: 'var(--unit-eigen)',
  'Symmetric & Beyond': 'var(--unit-symmetric)',
  'Transformations & Applications': 'var(--unit-transformations)',
};

export function MIT1806CourseMap() {
  const unitGroups = useMemo(
    () =>
      mit1806Units.map((unit) => ({
        unit,
        lectures: mit1806Lectures.filter((lecture) => lecture.unit === unit),
      })),
    [],
  );

  const completedCount = useMemo(
    () => mit1806Lectures.filter((lecture) => mockDoneLectureIds.has(lecture.id)).length,
    [],
  );

  // The roadmap opens collapsed so the seven unit levels stay compact.
  // A unit preview is mounted only while that unit is expanded.
  const [expandedUnit, setExpandedUnit] = useState<LectureUnit | null>(null);

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:py-10">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-sm font-semibold text-accent-600 dark:text-accent-400">
            Learn · MIT OpenCourseWare
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            MIT 18.06 Linear Algebra
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Lectures by Prof. Gilbert Strang
          </p>
        </div>
        <div
          aria-label={`${completedCount} of ${mit1806Lectures.length} lectures done`}
          className="lab-surface rounded-xl border px-4 py-3"
        >
          <p className="lab-number text-sm font-semibold text-slate-700 dark:text-slate-200">
            {completedCount} of {mit1806Lectures.length} lectures done
          </p>
        </div>
      </header>

      <section className="relative" aria-label="MIT 18.06 course roadmap">
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-slate-700/35 lg:block"
        />

        <div className="space-y-7 lg:space-y-10">
          {unitGroups.map(({ lectures: unitLectures, unit }, index) => {
            const doneCount = unitLectures.filter((lecture) =>
              mockDoneLectureIds.has(lecture.id),
            ).length;
            const progress = unitLectures.length
              ? Math.round((doneCount / unitLectures.length) * 100)
              : 0;
            const isExpanded = expandedUnit === unit;
            const accent = unitAccents[unit];

            return (
              <article
                className="relative grid items-center gap-4 lg:grid-cols-[1fr_56px_1fr]"
                key={unit}
              >
                {index % 2 === 0 ? (
                  <UnitBlock
                    accent={accent}
                    doneCount={doneCount}
                    isExpanded={isExpanded}
                    lectureCount={unitLectures.length}
                    progress={progress}
                    onToggle={() => setExpandedUnit(isExpanded ? null : unit)}
                    unit={unit}
                    unitLectures={unitLectures}
                  />
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <RoadmapNode accent={accent} />
                    <UnitBlock
                      accent={accent}
                      doneCount={doneCount}
                      isExpanded={isExpanded}
                      lectureCount={unitLectures.length}
                      progress={progress}
                      onToggle={() => setExpandedUnit(isExpanded ? null : unit)}
                      unit={unit}
                      unitLectures={unitLectures}
                    />
                  </>
                )}

                {index % 2 === 0 && (
                  <>
                    <RoadmapNode accent={accent} />
                    <div className="hidden lg:block" />
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Lectures by Prof. Gilbert Strang, MIT OpenCourseWare 18.06{' '}
        <a
          className="underline underline-offset-2 hover:text-accent-600"
          href="https://web.mit.edu/18.06/www/"
          rel="noreferrer"
          target="_blank"
        >
          (CC BY-NC-SA)
        </a>
      </footer>
    </div>
  );
}

type UnitBlockProps = {
  accent: string;
  doneCount: number;
  isExpanded: boolean;
  lectureCount: number;
  progress: number;
  onToggle: () => void;
  unit: LectureUnit;
  unitLectures: MIT1806Lecture[];
};

function UnitBlock({
  accent,
  doneCount,
  isExpanded,
  lectureCount,
  progress,
  onToggle,
  unit,
  unitLectures,
}: UnitBlockProps) {
  return (
    <div className="min-w-0">
      <div className="lab-surface group flex w-full overflow-hidden rounded-2xl border shadow-sm transition-[border-color,box-shadow,transform] duration-200 will-change-[transform] hover:border-[color:var(--lab-input-space)] hover:shadow-[0_0_24px_var(--lab-input-space-glow)]">
        <Link
          aria-label={`Open ${unit} lectures`}
          className="flex min-w-0 flex-1 items-center gap-4 p-5 text-left"
          to={`/learn/mit-18-06/unit/${unitSlug(unit)}`}
        >
          <ProgressRing accent={accent} progress={progress} />
          <div className="min-w-0">
            <p className="lab-number text-xs font-bold" style={{ color: accent }}>
              {doneCount} / {lectureCount} done
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">
              {unit}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {lectureCount} lectures · Open unit
            </p>
          </div>
        </Link>
        <button
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${unit} preview`}
          className="flex w-14 items-center justify-center border-l border-slate-200 text-slate-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
          onClick={onToggle}
          type="button"
        >
          <ChevronDown
            aria-hidden="true"
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            size={20}
          />
        </button>
      </div>

      <div className={`grid transition-[grid-template-rows] duration-300 ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          {isExpanded && (
            <div className="grid gap-3 pt-3 md:grid-cols-2">
              {unitLectures.slice(0, 4).map((lecture) => (
                <LecturePreviewCard accent={accent} key={lecture.id} lecture={lecture} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RoadmapNode({ accent }: { accent: string }) {
  return (
    <div className="z-10 mx-auto hidden h-12 w-12 items-center justify-center rounded-full border-4 border-canvas bg-slate-950 lg:flex dark:border-slate-950">
      <span
        className="h-3.5 w-3.5 rounded-full"
        style={{
          backgroundColor: accent,
          boxShadow: `0 0 14px ${accent}`,
        }}
      />
    </div>
  );
}

function ProgressRing({ accent, progress }: { accent: string; progress: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      aria-label={`${progress}% complete`}
      className="relative h-14 w-14 shrink-0"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <svg className="-rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="var(--lab-border)"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={accent}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
      <span className="lab-number absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200">
        {progress}%
      </span>
    </div>
  );
}

export function LecturePreviewCard({
  accent,
  lecture,
}: {
  accent: string;
  lecture: MIT1806Lecture;
}) {
  const badge =
    lecture.playgroundType === 'direct'
      ? 'Interactive'
      : lecture.playgroundType === 'related'
        ? 'Related'
        : 'Video only';

  const cardContent = (
    <>
      <div className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} />
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
          style={{ borderColor: `${accent}55`, backgroundColor: `${accent}12`, color: accent }}
        >
          {lecture.type === 'quiz-review'
            ? <Flag aria-hidden="true" size={18} />
            : <Shapes aria-hidden="true" size={18} />}
        </div>
        <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Not started
        </span>
      </div>
      <p className="lab-number mt-4 text-xs font-bold" style={{ color: accent }}>
        Lecture {lecture.number}
      </p>
      <h3 className="mt-1 min-h-12 font-semibold leading-6 text-slate-950 dark:text-white">
        {lecture.title}
      </h3>
      <div className="mt-4 flex items-center justify-between gap-2">
        {lecture.duration ? (
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock3 size={13} /> {lecture.duration}
          </span>
        ) : (
          <span />
        )}
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {badge}
        </span>
      </div>
      {lecture.youtubeId ? null : (
        <p className="mt-3 text-xs font-semibold text-slate-400">Video coming soon</p>
      )}
      {lecture.playgroundLink && (
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
          <Sparkles size={13} /> {lecture.playgroundType === 'direct' ? 'Try it' : 'Related playground'}
        </span>
      )}
    </>
  );

  return lecture.youtubeId ? (
    <Link
      aria-label={`Open lecture ${lecture.number}: ${lecture.title}`}
      className="lab-surface relative overflow-hidden rounded-2xl border p-4 transition hover:border-[color:var(--lab-input-space)] hover:shadow-[0_0_20px_var(--lab-input-space-glow)] focus-visible:outline focus-visible:outline-2"
      to={`/learn/mit-18-06/${lecture.id}`}
    >
      {cardContent}
    </Link>
  ) : (
    <article
      aria-label={`Lecture ${lecture.number}: video coming soon`}
      className="lab-surface relative overflow-hidden rounded-2xl border p-4 opacity-65"
    >
      {cardContent}
    </article>
  );
}

export function unitSlug(unit: LectureUnit) {
  return unit
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

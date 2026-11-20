import { useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { mit1806Lectures } from '../../data/mit1806';

type YouTubePlayer = {
  loadVideoById: (videoId: string) => void;
  destroy?: () => void;
};

type YouTubePlayerConstructor = new (
  elementId: string,
  options: {
    width?: string | number;
    height?: string | number;
    videoId?: string;
    host?: string;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: (event: { target: YouTubePlayer }) => void;
    };
  },
) => YouTubePlayer;

type YouTubeWindow = Window & {
  YT?: { Player: YouTubePlayerConstructor };
  onYouTubeIframeAPIReady?: () => void;
};

export function MIT1806LecturePage() {
  const { id, lectureId } = useParams();
  const routeLectureId = id ?? lectureId;
  const lecture = mit1806Lectures.find((item) => item.id === routeLectureId);
  const lectureIndex = mit1806Lectures.findIndex((item) => item.id === routeLectureId);
  const previousLecture = lectureIndex > 0 ? mit1806Lectures[lectureIndex - 1] : null;
  const nextLecture =
    lectureIndex >= 0 && lectureIndex < mit1806Lectures.length - 1
      ? mit1806Lectures[lectureIndex + 1]
      : null;

  if (!lecture) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Lecture not found</h1>
        <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-600" to="/learn">
          <ArrowLeft size={16} /> Back to course map
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 dark:text-slate-400" to="/learn">
        <ArrowLeft size={16} /> Course map
      </Link>
      <header className="mt-5">
        <p className="lab-number text-xs font-bold text-accent-600 dark:text-accent-400">Lecture {lecture.number} · {lecture.unit}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{lecture.title}</h1>
      </header>

      <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <YouTubeLecturePlayer lectureId={lecture.youtubeId} title={lecture.title} />
        <aside className="lab-surface h-fit rounded-2xl border p-5">
          <h2 className="font-semibold text-slate-950 dark:text-white">Lecture details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-slate-500 dark:text-slate-400">Unit</dt><dd className="text-right font-semibold text-slate-800 dark:text-slate-200">{lecture.unit}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-slate-500 dark:text-slate-400">Duration</dt><dd className="lab-number text-slate-800 dark:text-slate-200">{lecture.duration ?? 'TBD'}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-slate-500 dark:text-slate-400">Type</dt><dd className="text-right font-semibold text-slate-800 dark:text-slate-200">{lecture.type === 'quiz-review' ? 'Quiz review' : 'Lecture'}</dd></div>
          </dl>
        </aside>
      </section>

      <nav
        aria-label="Lecture navigation"
        className="mt-6 grid gap-3 sm:grid-cols-2"
      >
        {previousLecture ? (
          <Link
            aria-label={`Previous lecture: Lecture ${previousLecture.number}, ${previousLecture.title}`}
            className="lab-surface group flex min-h-24 items-center gap-3 rounded-2xl border p-4 transition hover:border-[color:var(--lab-input-space)] hover:shadow-[0_0_20px_var(--lab-input-space-glow)]"
            to={`/learn/mit-18-06/${previousLecture.id}`}
          >
            <ChevronLeft
              aria-hidden="true"
              className="shrink-0 text-slate-400 transition-transform group-hover:-translate-x-1 group-hover:text-accent-500"
              size={20}
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Previous</p>
              <p className="lab-number mt-1 text-xs text-accent-600 dark:text-accent-400">
                Lecture {previousLecture.number}
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                {previousLecture.title}
              </p>
            </div>
          </Link>
        ) : (
          <div
            aria-disabled="true"
            className="lab-surface flex min-h-24 items-center gap-3 rounded-2xl border p-4 opacity-45"
          >
            <ChevronLeft aria-hidden="true" className="shrink-0" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Previous</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Beginning of course</p>
            </div>
          </div>
        )}

        {nextLecture ? (
          <Link
            aria-label={`Next lecture: Lecture ${nextLecture.number}, ${nextLecture.title}`}
            className="lab-surface group flex min-h-24 items-center justify-end gap-3 rounded-2xl border p-4 text-right transition hover:border-[color:var(--lab-input-space)] hover:shadow-[0_0_20px_var(--lab-input-space-glow)]"
            to={`/learn/mit-18-06/${nextLecture.id}`}
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Next</p>
              <p className="lab-number mt-1 text-xs text-accent-600 dark:text-accent-400">
                Lecture {nextLecture.number}
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                {nextLecture.title}
              </p>
            </div>
            <ChevronRight
              aria-hidden="true"
              className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-accent-500"
              size={20}
            />
          </Link>
        ) : (
          <div
            aria-disabled="true"
            className="lab-surface flex min-h-24 items-center justify-end gap-3 rounded-2xl border p-4 text-right opacity-45"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Next</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">End of course</p>
            </div>
            <ChevronRight aria-hidden="true" className="shrink-0" size={20} />
          </div>
        )}
      </nav>

      <footer className="mt-8 border-t border-slate-200 py-6 text-center text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Lectures by Prof. Gilbert Strang, MIT OpenCourseWare 18.06{' '}
        <a className="underline underline-offset-2 hover:text-accent-600" href="https://web.mit.edu/18.06/www/" rel="noreferrer" target="_blank">(CC BY-NC-SA)</a>
      </footer>
    </div>
  );
}

function YouTubeLecturePlayer({ lectureId, title }: { lectureId: string; title: string }) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerId = `mit1806-player-${lectureId || 'coming-soon'}`;

  useEffect(() => {
    // Empty IDs intentionally show the UI placeholder instead of attempting to load a broken player.
    if (!lectureId) return;

    const youtubeWindow = window as YouTubeWindow;
    let isMounted = true;

    const createPlayer = () => {
      // The IFrame API loads asynchronously, so guard until both the mounted component and YT.Player exist.
      if (!isMounted || !youtubeWindow.YT?.Player) return;
      playerRef.current = new youtubeWindow.YT.Player(containerId, {
        width: '100%',
        height: '100%',
        // Supplying videoId in the constructor avoids a blank player if onReady fires after navigation.
        videoId: lectureId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => event.target.loadVideoById(lectureId),
        },
      });
    };

    if (youtubeWindow.YT?.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
      youtubeWindow.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      isMounted = false;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [containerId, lectureId]);

  if (!lectureId) {
    return (
      <div className="lab-surface flex aspect-video min-h-[280px] flex-col items-center justify-center rounded-2xl border p-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 text-slate-400 dark:border-slate-700">
          <Play aria-hidden="true" size={24} />
        </span>
        <h2 className="mt-4 font-semibold text-slate-950 dark:text-white">Video coming soon</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{title} will play here once its YouTube ID is added.</p>
        <a
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400"
          href="https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8"
          rel="noreferrer"
          target="_blank"
        >
          Open on YouTube <ExternalLink size={15} />
        </a>
      </div>
    );
  }

  return (
    <div className="lab-surface overflow-hidden rounded-2xl border">
      <div className="aspect-video w-full bg-black">
        <div className="h-full w-full" id={containerId} />
      </div>
      <a
        className="flex items-center justify-center gap-2 border-t border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 hover:text-accent-600 dark:border-slate-800 dark:text-slate-400"
        href={`https://www.youtube.com/watch?v=${lectureId}`}
        rel="noreferrer"
        target="_blank"
      >
        Open on YouTube <ExternalLink size={15} />
      </a>
    </div>
  );
}

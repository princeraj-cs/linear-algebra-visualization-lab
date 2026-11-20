import { useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from 'react';
import {
  ChevronDown,
  Plus,
  RotateCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  dotProduct,
  scalarMultiply,
  vectorAdd,
  vectorAngle,
  vectorLinearCombination,
  vectorMagnitude,
  vectorSubtract,
} from '../../lib/math';

type VectorItem = {
  id: number;
  name: string;
  color: string;
  components: [number, number];
};

type Operation = 'addition' | 'subtraction' | 'scalar' | 'dot' | 'angle' | 'combination';

const COLORS = ['#2563eb', '#e11d48', '#7c3aed', '#059669', '#ea580c', '#0891b2'];
const WIDTH = 760;
const HEIGHT = 520;
const DEFAULT_EPSILON = 1e-9;

const formatNumber = (value: number, digits = 2) =>
  Object.is(value, -0) ? '0' : Number(value.toFixed(digits)).toString();

export function VectorPlayground() {
  const [vectors, setVectors] = useState<VectorItem[]>([
    { id: 1, name: 'u', color: COLORS[0], components: [3, 2] },
    { id: 2, name: 'v', color: COLORS[1], components: [-1, 4] },
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [operation, setOperation] = useState<Operation>('addition');
  const [scalar, setScalar] = useState(1.5);
  const [coefficients, setCoefficients] = useState<[number, number]>([1, 1]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ pointerId: number; x: number; y: number; panX: number; panY: number } | null>(null);

  const scale = 40 * zoom;
  const origin = { x: WIDTH / 2 + pan.x, y: HEIGHT / 2 + pan.y };

  const selectedVector = vectors.find((vector) => vector.id === selectedId) ?? vectors[0];
  const first = vectors[0]?.components ?? [0, 0];
  const second = vectors[1]?.components ?? [0, 0];

  const result = useMemo<[number, number]>(() => {
    if (vectors.length === 0) return [0, 0];
    if (operation === 'subtraction') return vectorSubtract(first, second) as [number, number];
    if (operation === 'scalar') return scalarMultiply(scalar, selectedVector?.components ?? [0, 0]) as [number, number];
    if (operation === 'combination') {
      if (vectors.length < 2) return scalarMultiply(coefficients[0], first) as [number, number];
      return vectorLinearCombination(coefficients, [first, second]) as [number, number];
    }
    return vectorAdd(first, second) as [number, number];
  }, [coefficients, first, operation, scalar, second, selectedVector, vectors]);

  const dot = vectors.length >= 2 ? dotProduct(first, second) : 0;
  const angle = useMemo(() => {
    if (vectors.length < 2) return null;
    try {
      return vectorAngle(first, second);
    } catch {
      return null;
    }
  }, [first, second, vectors.length]);

  const worldToScreen = (point: [number, number]) => ({
    x: origin.x + point[0] * scale,
    y: origin.y - point[1] * scale,
  });

  const updateComponent = (id: number, axis: 0 | 1, value: number) => {
    if (!Number.isFinite(value)) return;
    setVectors((current) =>
      current.map((vector) =>
        vector.id === id
          ? {
              ...vector,
              components: axis === 0
                ? [value, vector.components[1]]
                : [vector.components[0], value],
            }
          : vector,
      ),
    );
  };

  const addVector = () => {
    if (vectors.length >= COLORS.length) return;
    const id = Math.max(0, ...vectors.map((vector) => vector.id)) + 1;
    const names = ['u', 'v', 'w', 'p', 'q', 'r'];
    setVectors((current) => [
      ...current,
      {
        id,
        name: names[current.length] ?? `v${current.length + 1}`,
        color: COLORS[current.length],
        components: [1, 1],
      },
    ]);
    setSelectedId(id);
  };

  const removeVector = (id: number) => {
    setVectors((current) => {
      const next = current.filter((vector) => vector.id !== id);
      if (next.length > 0 && selectedId === id) setSelectedId(next[0].id);
      return next;
    });
  };

  const reset = () => {
    setVectors([
      { id: 1, name: 'u', color: COLORS[0], components: [3, 2] },
      { id: 2, name: 'v', color: COLORS[1], components: [-1, 4] },
    ]);
    setSelectedId(1);
    setOperation('addition');
    setScalar(1.5);
    setCoefficients([1, 1]);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (event: ReactWheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    setZoom((current) => Math.max(0.45, Math.min(3.5, current * (event.deltaY > 0 ? 0.9 : 1.1))));
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragging.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragging.current || dragging.current.pointerId !== event.pointerId) return;
    setPan({
      x: dragging.current.panX + event.clientX - dragging.current.x,
      y: dragging.current.panY + event.clientY - dragging.current.y,
    });
  };

  const stopDragging = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (dragging.current?.pointerId === event.pointerId) dragging.current = null;
  };

  const gridStep = useMemo(() => {
    const targetWorldStep = 40 / scale;
    const exponent = Math.floor(Math.log10(targetWorldStep));
    const fraction = targetWorldStep / 10 ** exponent;
    const niceFraction = fraction < 1.5 ? 1 : fraction < 3.5 ? 2 : fraction < 7.5 ? 5 : 10;
    return niceFraction * 10 ** exponent;
  }, [scale]);

  const xLines: number[] = [];
  const yLines: number[] = [];
  const minX = (-origin.x) / scale;
  const maxX = (WIDTH - origin.x) / scale;
  const minY = -(HEIGHT - origin.y) / scale;
  const maxY = origin.y / scale;
  for (let x = Math.ceil(minX / gridStep) * gridStep; x <= maxX; x += gridStep) xLines.push(x);
  for (let y = Math.ceil(minY / gridStep) * gridStep; y <= maxY; y += gridStep) yLines.push(y);

  const explanation = operation === 'addition'
    ? 'Place v at the tip of u. The resultant vector runs from the origin to the final tip.'
    : operation === 'subtraction'
      ? 'Vector subtraction creates u + (-v); the arrow points toward u minus v.'
      : operation === 'scalar'
        ? `Multiplying ${selectedVector?.name ?? 'u'} by ${formatNumber(scalar)} changes its length${scalar < 0 ? ' and reverses its direction' : ''}.`
        : operation === 'dot'
          ? 'The dot product measures alignment: positive means similar directions, negative means opposing directions.'
          : operation === 'angle'
            ? 'The angle is measured from u to v between 0° and 180°. A zero vector has no direction.'
            : 'A linear combination scales and adds vectors to produce a new position in the plane.';

  const resultScreen = worldToScreen(result);
  const firstScreen = worldToScreen(first);
  const secondScreen = worldToScreen(second);
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-accent-600 dark:text-accent-400">Interactive workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Vector Playground</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300" onClick={reset} type="button">
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(540px,1fr)_330px]">
        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> 2D coordinate plane
            </div>
            <div className="flex items-center gap-1">
              <button aria-label="Zoom out" className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setZoom((value) => Math.max(0.45, value - 0.15))} type="button"><ZoomOut size={17} /></button>
              <span className="w-12 text-center text-xs font-semibold text-slate-500">{Math.round(zoom * 100)}%</span>
              <button aria-label="Zoom in" className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setZoom((value) => Math.min(3.5, value + 0.15))} type="button"><ZoomIn size={17} /></button>
              <button aria-label="Center plane" className="ml-1 rounded-md px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setPan({ x: 0, y: 0 })} type="button">Center</button>
            </div>
          </div>

          <svg
            aria-label="Interactive two-dimensional vector coordinate plane"
            className="block h-[520px] w-full cursor-grab touch-none active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onWheel={handleWheel}
            role="img"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          >
            <defs>
              {vectors.map((vector) => (
                <marker key={vector.id} id={`arrow-${vector.id}`} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                  <path d="M 0 0 L 8 4 L 0 8 z" fill={vector.color} />
                </marker>
              ))}
              <marker id="arrow-result" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
              </marker>
            </defs>
            <rect width={WIDTH} height={HEIGHT} fill="currentColor" className="text-slate-50 dark:text-slate-950" />

            {xLines.map((x) => {
              const point = worldToScreen([x, 0]);
              return <line key={`x-${x}`} x1={point.x} x2={point.x} y1={0} y2={HEIGHT} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth={Math.abs(x) < gridStep / 2 ? 1.5 : 1} />;
            })}
            {yLines.map((y) => {
              const point = worldToScreen([0, y]);
              return <line key={`y-${y}`} x1={0} x2={WIDTH} y1={point.y} y2={point.y} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth={Math.abs(y) < gridStep / 2 ? 1.5 : 1} />;
            })}

            <line x1={0} x2={WIDTH} y1={origin.y} y2={origin.y} stroke="#64748b" strokeWidth="1.5" />
            <line x1={origin.x} x2={origin.x} y1={0} y2={HEIGHT} stroke="#64748b" strokeWidth="1.5" />
            <circle cx={origin.x} cy={origin.y} r="3.5" fill="#334155" />
            <text x={origin.x + 7} y={origin.y + 17} className="fill-slate-500 text-[11px]">0</text>

            {xLines.filter((value) => Math.abs(value) > gridStep / 2).map((x) => (
              <text key={`xl-${x}`} x={worldToScreen([x, 0]).x} y={origin.y + 17} textAnchor="middle" className="fill-slate-400 text-[10px]">{formatNumber(x, 1)}</text>
            ))}
            {yLines.filter((value) => Math.abs(value) > gridStep / 2).map((y) => (
              <text key={`yl-${y}`} x={origin.x + 7} y={worldToScreen([0, y]).y + 4} className="fill-slate-400 text-[10px]">{formatNumber(y, 1)}</text>
            ))}

            {vectors.map((vector) => {
              const end = worldToScreen(vector.components);
              const isZero = vectorMagnitude(vector.components) <= DEFAULT_EPSILON;
              return (
                <g key={vector.id} onPointerDown={(event) => event.stopPropagation()}>
                  {isZero ? (
                    <circle cx={origin.x} cy={origin.y} r="7" fill="white" stroke={vector.color} strokeWidth="3" />
                  ) : (
                    <line x1={origin.x} y1={origin.y} x2={end.x} y2={end.y} stroke={vector.color} strokeWidth={selectedId === vector.id ? 4 : 3} markerEnd={`url(#arrow-${vector.id})`} />
                  )}
                  <text x={end.x + (end.x >= origin.x ? 10 : -10)} y={end.y + (end.y <= origin.y ? -8 : 18)} textAnchor={end.x >= origin.x ? 'start' : 'end'} fill={vector.color} fontWeight="700" fontSize="14">
                    {vector.name} ({formatNumber(vector.components[0])}, {formatNumber(vector.components[1])})
                  </text>
                  {selectedId === vector.id && <circle cx={end.x} cy={end.y} r="5" fill="white" stroke={vector.color} strokeWidth="2" />}
                </g>
              );
            })}

            {operation === 'addition' && vectors.length >= 2 && (
              <>
                <line x1={firstScreen.x} y1={firstScreen.y} x2={secondScreen.x + (firstScreen.x - origin.x)} y2={secondScreen.y + (firstScreen.y - origin.y)} stroke={vectors[1].color} strokeWidth="2.5" strokeDasharray="7 5" markerEnd={`url(#arrow-${vectors[1].id})`} opacity="0.75" />
                <text x={(firstScreen.x + resultScreen.x) / 2} y={(firstScreen.y + resultScreen.y) / 2 - 10} fill={vectors[1].color} fontSize="12" fontWeight="700">head-to-tail</text>
              </>
            )}

            {operation === 'subtraction' && vectors.length >= 2 && (
              <>
                <line
                  x1={firstScreen.x}
                  y1={firstScreen.y}
                  x2={resultScreen.x}
                  y2={resultScreen.y}
                  stroke={vectors[1].color}
                  strokeWidth="2.5"
                  strokeDasharray="7 5"
                  markerEnd={`url(#arrow-${vectors[1].id})`}
                  opacity="0.75"
                />
                <text x={(firstScreen.x + resultScreen.x) / 2} y={(firstScreen.y + resultScreen.y) / 2 - 10} fill={vectors[1].color} fontSize="12" fontWeight="700">u + (-v)</text>
              </>
            )}

            {(operation === 'addition' || operation === 'subtraction' || operation === 'combination') && resultScreen && (
              <line x1={origin.x} y1={origin.y} x2={resultScreen.x} y2={resultScreen.y} stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow-result)" />
            )}

            {operation === 'scalar' && resultScreen && (
              <line x1={origin.x} y1={origin.y} x2={resultScreen.x} y2={resultScreen.y} stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow-result)" />
            )}

            {operation === 'angle' && vectors.length >= 2 && angle !== null && (
              <AngleArc angle={angle} origin={origin} scale={scale} first={first} second={second} />
            )}

            {operation === 'addition' || operation === 'subtraction' || operation === 'scalar' || operation === 'combination' ? (
              <text x={resultScreen.x + 9} y={resultScreen.y - 9} fill="#059669" fontSize="13" fontWeight="800">
                R ({formatNumber(result[0])}, {formatNumber(result[1])})
              </text>
            ) : null}
          </svg>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-950 dark:text-white">Vectors</h2>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-accent-50 px-2.5 py-2 text-xs font-bold text-accent-700 transition hover:bg-accent-100 dark:bg-accent-500/15 dark:text-accent-300" onClick={addVector} disabled={vectors.length >= COLORS.length} type="button"><Plus size={15} /> Add</button>
            </div>
            <div className="mt-3 space-y-3">
              {vectors.map((vector) => (
                <div className={`rounded-xl border p-3 ${selectedId === vector.id ? 'border-accent-300 bg-accent-50/40 dark:border-accent-500/50 dark:bg-accent-500/5' : 'border-slate-200 dark:border-slate-800'}`} key={vector.id}>
                  <button className="mb-2 flex w-full items-center justify-between text-left" onClick={() => setSelectedId(vector.id)} type="button">
                    <span className="flex items-center gap-2 text-sm font-bold" style={{ color: vector.color }}><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: vector.color }} /> {vector.name}</span>
                    {vectors.length > 1 && <Trash2 aria-label={`Remove ${vector.name}`} className="text-slate-400 hover:text-rose-500" onClick={(event) => { event.stopPropagation(); removeVector(vector.id); }} size={15} />}
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    {(['x', 'y'] as const).map((axis, axisIndex) => (
                      <label className="text-[11px] font-semibold uppercase text-slate-400" key={axis}>
                        {axis}
                        <input className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm font-semibold normal-case text-slate-800 outline-none focus:border-accent-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white" max="10" min="-10" onChange={(event) => updateComponent(vector.id, axisIndex as 0 | 1, Number(event.target.value))} step="0.25" type="number" value={vector.components[axisIndex]} />
                      </label>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <label className="text-[10px] font-semibold uppercase text-slate-400">
                      x slider
                      <input aria-label={`${vector.name} x component slider`} className="mt-1 h-1.5 w-full accent-blue-600" max="10" min="-10" onChange={(event) => updateComponent(vector.id, 0, Number(event.target.value))} step="0.25" type="range" value={vector.components[0]} />
                    </label>
                    <label className="text-[10px] font-semibold uppercase text-slate-400">
                      y slider
                      <input aria-label={`${vector.name} y component slider`} className="mt-1 h-1.5 w-full accent-violet-600" max="10" min="-10" onChange={(event) => updateComponent(vector.id, 1, Number(event.target.value))} step="0.25" type="range" value={vector.components[1]} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="operation">Operation</label>
            <div className="relative mt-2">
              <select id="operation" className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-accent-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" onChange={(event) => setOperation(event.target.value as Operation)} value={operation}>
                <option value="addition">Addition: u + v</option>
                <option value="subtraction">Subtraction: u - v</option>
                <option value="scalar">Scalar multiplication</option>
                <option value="dot">Dot product</option>
                <option value="angle">Angle between u and v</option>
                <option value="combination">Linear combination</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 text-slate-400" size={16} />
            </div>
            {operation === 'scalar' && (
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-slate-500"><span>Scalar on {selectedVector?.name ?? 'u'}</span><span>{formatNumber(scalar)}</span></div>
                <input aria-label="Scalar multiplier" className="mt-2 h-1.5 w-full accent-violet-600" max="3" min="-3" onChange={(event) => setScalar(Number(event.target.value))} step="0.1" type="range" value={scalar} />
              </div>
            )}
            {operation === 'combination' && vectors.length >= 2 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-xs font-semibold text-slate-500">a · {vectors[0].name}<input className="mt-1 h-1.5 w-full accent-blue-600" max="3" min="-3" onChange={(event) => setCoefficients([Number(event.target.value), coefficients[1]])} step="0.1" type="range" value={coefficients[0]} /></label>
                <label className="text-xs font-semibold text-slate-500">b · {vectors[1].name}<input className="mt-1 h-1.5 w-full accent-rose-600" max="3" min="-3" onChange={(event) => setCoefficients([coefficients[0], Number(event.target.value)])} step="0.1" type="range" value={coefficients[1]} /></label>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white dark:border-slate-800">
            <h2 className="text-sm font-semibold">Mathematical information</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {vectors.map((vector) => (
                <div className="flex justify-between gap-3" key={vector.id}><dt style={{ color: vector.color }}>{vector.name}</dt><dd className="font-mono text-slate-200">({formatNumber(vector.components[0])}, {formatNumber(vector.components[1])}) · |{vector.name}| = {formatNumber(vectorMagnitude(vector.components))}</dd></div>
              ))}
              {vectors.length >= 2 && <div className="flex justify-between border-t border-slate-800 pt-2"><dt className="text-slate-400">Dot product</dt><dd className="font-mono">{formatNumber(dot)}</dd></div>}
              {vectors.length >= 2 && <div className="flex justify-between"><dt className="text-slate-400">Angle</dt><dd className="font-mono">{angle === null ? 'Undefined' : `${formatNumber(angle * 180 / Math.PI, 1)}°`}</dd></div>}
              <div className="flex justify-between border-t border-slate-800 pt-2"><dt className="text-emerald-400">Resultant</dt><dd className="font-mono">({formatNumber(result[0])}, {formatNumber(result[1])})</dd></div>
            </dl>
          </div>
        </aside>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-500" />
          <div><h2 className="font-semibold text-slate-950 dark:text-white">What changes?</h2><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{explanation}</p></div>
        </div>
      </section>
    </div>
  );
}

function AngleArc({ angle, origin, scale, first, second }: { angle: number; origin: { x: number; y: number }; scale: number; first: [number, number]; second: [number, number] }) {
  const radius = 34;
  const firstAngle = -Math.atan2(first[1], first[0]);
  const secondAngle = -Math.atan2(second[1], second[0]);
  let difference = secondAngle - firstAngle;
  if (difference > Math.PI) difference -= 2 * Math.PI;
  if (difference < -Math.PI) difference += 2 * Math.PI;
  const start = { x: origin.x + radius * Math.cos(firstAngle), y: origin.y + radius * Math.sin(firstAngle) };
  const end = { x: origin.x + radius * Math.cos(secondAngle), y: origin.y + radius * Math.sin(secondAngle) };
  const largeArc = Math.abs(difference) > Math.PI ? 1 : 0;
  const sweep = difference > 0 ? 1 : 0;
  return (
    <g>
      <path d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`} fill="none" stroke="#f59e0b" strokeWidth="3" />
      <text x={origin.x + Math.cos(firstAngle + difference / 2) * (radius + 14)} y={origin.y + Math.sin(firstAngle + difference / 2) * (radius + 14)} textAnchor="middle" className="fill-amber-600 text-xs font-bold">{formatNumber(angle * 180 / Math.PI, 1)}°</text>
    </g>
  );
}

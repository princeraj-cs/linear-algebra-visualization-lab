import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LessonLayout } from './components/layout/LessonLayout';
import { PlaygroundLayout } from './components/layout/PlaygroundLayout';
import { HomePage } from './modules/home/HomePage';
import { ModulePage } from './modules/shared/ModulePage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="learn"
          element={
            <LessonLayout
              description="Start with the visual language of vectors and build toward the structures behind linear algebra."
              sections={['What is a vector?', 'Visualizing direction and magnitude', 'Combining vectors']}
              title="Vectors: the building blocks"
            />
          }
        />
        <Route
          path="vector-playground"
          element={
            <PlaygroundLayout
              description="Experiment with vector direction, magnitude, and operations in a focused workspace."
              title="Vector Playground"
            />
          }
        />
        <Route
          path="matrix-playground"
          element={
            <PlaygroundLayout
              description="Explore how matrices describe structure and transformations."
              title="Matrix Playground"
            />
          }
        />
        <Route path="linear-systems" element={<ModulePage description="Learn to read and reason about systems of linear equations." title="Linear Systems" />} />
        <Route path="vector-spaces" element={<ModulePage description="Build a precise understanding of spans, bases, and dimension." title="Vector Spaces" />} />
        <Route path="orthogonality" element={<ModulePage description="Explore perpendicularity, projections, and orthogonal structure." title="Orthogonality" />} />
        <Route path="practice" element={<ModulePage description="Reinforce your understanding with focused practice sets." title="Practice" />} />
        <Route path="progress" element={<ModulePage description="Review your learning history and see how your understanding is growing." title="Progress" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

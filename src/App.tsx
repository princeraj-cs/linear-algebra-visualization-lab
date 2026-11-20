import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { PlaygroundLayout } from './components/layout/PlaygroundLayout';
import { HomePage } from './modules/home/HomePage';
import { ModulePage } from './modules/shared/ModulePage';
import { LandingPage } from './modules/landing/LandingPage';
import { VectorPlayground } from './modules/vectors/VectorPlayground';
import { MIT1806CourseMap } from './modules/learn/MIT1806CourseMap';
import { MIT1806LecturePage } from './modules/learn/MIT1806LecturePage';

function App() {
  return (
    <Routes>
      {/* The public landing page has no application sidebar. */}
      <Route index element={<LandingPage />} />

      {/* The remaining routes share one responsive sidebar/header layout. */}
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<HomePage />} />
        <Route
          path="learn"
          element={<MIT1806CourseMap />}
        />
        <Route path="learn/:lectureId" element={<MIT1806LecturePage />} />
        <Route
          path="vector-playground"
          element={<VectorPlayground />}
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

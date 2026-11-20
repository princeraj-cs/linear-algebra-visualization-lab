import videoIds from './mit1806-videos.json';

// Types define the shape shared by the course map and lecture view.
// Keep playlistIndex out of this model: lecture playback now uses verified per-video IDs.
export type LectureUnit =
  | 'Foundations'
  | 'Spaces'
  | 'Orthogonality'
  | 'Determinants'
  | 'Eigen'
  | 'Symmetric & Beyond'
  | 'Transformations & Applications';

export type PlaygroundType = 'direct' | 'related' | 'none';

export type MIT1806Lecture = {
  id: string;
  number: string;
  title: string;
  unit: LectureUnit;
  type: 'lecture' | 'quiz-review';
  youtubeId: string;
  duration?: string;
  playgroundLink?: string;
  playgroundType: PlaygroundType;
};

const lecture = (
  number: number,
  title: string,
  unit: LectureUnit,
  playgroundType: PlaygroundType = 'none',
  playgroundLink?: string,
  duration?: string,
): MIT1806Lecture => ({
  id: `lecture-${number}`,
  number: String(number),
  title,
  unit,
  type: 'lecture',
  youtubeId: videoIds[String(number) as keyof typeof videoIds] ?? '',
  playgroundType,
  playgroundLink,
  duration,
});

export const mit1806Lectures: MIT1806Lecture[] = [
  lecture(1, 'The Geometry of Linear Equations', 'Foundations', 'direct', '/vector-playground', '49 min'),
  lecture(2, 'Elimination with Matrices', 'Foundations', 'direct', '/linear-systems', '52 min'),
  lecture(3, 'Multiplication and Inverse Matrices', 'Foundations', 'direct', '/matrix-playground', '47 min'),
  lecture(4, 'Factorization into A = LU', 'Foundations', 'related', '/linear-systems', '50 min'),
  lecture(5, 'Transposes, Permutations, Spaces R^n', 'Spaces', 'direct', '/vector-spaces', '48 min'),
  lecture(6, 'Column Space and Nullspace', 'Spaces', 'direct', '/vector-spaces', '47 min'),
  lecture(7, 'Solving Ax = 0: Pivot Variables, Special Solutions', 'Spaces', 'direct', '/linear-systems', '50 min'),
  lecture(8, 'Solving Ax = b: Row Reduced Form R', 'Spaces', 'direct', '/linear-systems', '49 min'),
  lecture(9, 'Independence, Basis, and Dimension', 'Spaces', 'direct', '/vector-spaces', '49 min'),
  lecture(10, 'The Four Fundamental Subspaces', 'Spaces', 'direct', '/vector-spaces', '50 min'),
  lecture(11, 'Matrix Spaces; Rank 1; Small World Graphs', 'Spaces', 'related', '/vector-spaces', '50 min'),
  lecture(12, 'Graphs, Networks, Incidence Matrices', 'Spaces', 'related', '/linear-systems', '48 min'),
  {
    id: 'lecture-13',
    number: '13',
    title: 'Quiz 1 Review',
    unit: 'Spaces',
    type: 'quiz-review',
    youtubeId: videoIds['13'],
    playgroundType: 'none',
    duration: '51 min',
  },
  lecture(14, 'Orthogonal Vectors and Subspaces', 'Orthogonality', 'direct', '/orthogonality', '51 min'),
  lecture(15, 'Projections onto Subspaces', 'Orthogonality', 'direct', '/orthogonality', '48 min'),
  lecture(16, 'Projection Matrices and Least Squares', 'Orthogonality', 'direct', '/orthogonality', '49 min'),
  lecture(17, 'Orthogonal Matrices and Gram-Schmidt', 'Orthogonality', 'direct', '/orthogonality', '50 min'),
  lecture(18, 'Properties of Determinants', 'Determinants'),
  lecture(19, 'Determinant Formulas and Cofactors', 'Determinants'),
  lecture(20, "Cramer's Rule, Inverse Matrix, and Volume", 'Determinants'),
  lecture(21, 'Eigenvalues and Eigenvectors', 'Eigen', 'related', '/vector-playground', '51 min'),
  lecture(22, 'Diagonalization and Powers of A', 'Eigen', 'related', '/matrix-playground', '47 min'),
  lecture(23, 'Differential Equations and exp(At)', 'Eigen'),
  lecture(24, 'Markov Matrices; Fourier Series', 'Eigen'),
  {
    id: 'lecture-24b',
    number: '24b',
    title: 'Quiz 2 Review',
    unit: 'Eigen',
    type: 'quiz-review',
    youtubeId: videoIds['24b'],
    playgroundType: 'none',
    duration: '50 min',
  },
  lecture(25, 'Symmetric Matrices and Positive Definiteness', 'Symmetric & Beyond', 'related', '/orthogonality', '50 min'),
  lecture(26, 'Complex Matrices; Fast Fourier Transform', 'Symmetric & Beyond'),
  lecture(27, 'Positive Definite Matrices and Minima', 'Symmetric & Beyond'),
  lecture(28, 'Similar Matrices and Jordan Form', 'Symmetric & Beyond', 'related', '/matrix-playground', '50 min'),
  lecture(29, 'Singular Value Decomposition', 'Symmetric & Beyond'),
  lecture(30, 'Linear Transformations and Their Matrices', 'Transformations & Applications', 'direct', '/matrix-playground', '51 min'),
  lecture(31, 'Change of Basis; Image Compression', 'Transformations & Applications', 'related', '/matrix-playground', '50 min'),
  {
    id: 'lecture-32',
    number: '32',
    title: 'Quiz 3 Review',
    unit: 'Transformations & Applications',
    type: 'quiz-review',
    youtubeId: videoIds['32'],
    playgroundType: 'none',
    duration: '52 min',
  },
  lecture(33, 'Left and Right Inverses; Pseudoinverse', 'Transformations & Applications', 'related', '/orthogonality', '49 min'),
  lecture(34, 'Final Course Review', 'Transformations & Applications'),
];

export const mit1806Units: LectureUnit[] = [
  'Foundations',
  'Spaces',
  'Orthogonality',
  'Determinants',
  'Eigen',
  'Symmetric & Beyond',
  'Transformations & Applications',
];


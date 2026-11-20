export type { Matrix, Vector } from './types';
export { DEFAULT_EPSILON } from './constants';
export {
  dotProduct,
  scalarMultiply,
  vectorAdd,
  vectorAngle,
  vectorLinearCombination,
  vectorMagnitude,
  vectorNormalize,
  vectorProjection,
  vectorSubtract,
} from './vector';
export {
  identityMatrix,
  matrixAdd,
  matrixDeterminant,
  matrixInverse,
  matrixMultiply,
  matrixSubtract,
  matrixTranspose,
  matrixVectorMultiply,
} from './matrix';

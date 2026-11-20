import { DEFAULT_EPSILON } from './constants';
import {
  matrixDimensions,
  validateSameVectorDimensions,
  validateSquareMatrix,
  validateVector,
} from './validation';
import type { Matrix, Vector } from './types';

/** Adds two matrices with identical dimensions. */
export function matrixAdd(first: Matrix, second: Matrix): number[][] {
  const firstDimensions = matrixDimensions(first);
  const secondDimensions = matrixDimensions(second);
  if (
    firstDimensions.rows !== secondDimensions.rows ||
    firstDimensions.columns !== secondDimensions.columns
  ) {
    throw new RangeError('Matrix addition requires equal dimensions.');
  }
  return first.map((row, rowIndex) =>
    row.map((value, columnIndex) => value + second[rowIndex][columnIndex]),
  );
}

/** Subtracts the second matrix from the first with identical dimensions. */
export function matrixSubtract(first: Matrix, second: Matrix): number[][] {
  const firstDimensions = matrixDimensions(first);
  const secondDimensions = matrixDimensions(second);
  if (
    firstDimensions.rows !== secondDimensions.rows ||
    firstDimensions.columns !== secondDimensions.columns
  ) {
    throw new RangeError('Matrix subtraction requires equal dimensions.');
  }
  return first.map((row, rowIndex) =>
    row.map((value, columnIndex) => value - second[rowIndex][columnIndex]),
  );
}

/** Multiplies matrices when the first column count equals the second row count. */
export function matrixMultiply(first: Matrix, second: Matrix): number[][] {
  const firstDimensions = matrixDimensions(first);
  const secondDimensions = matrixDimensions(second);
  if (firstDimensions.columns !== secondDimensions.rows) {
    throw new RangeError(
      'Matrix multiplication requires the first matrix columns to equal the second matrix rows.',
    );
  }

  return Array.from({ length: firstDimensions.rows }, (_, row) =>
    Array.from({ length: secondDimensions.columns }, (_, column) =>
      first[row].reduce(
        (sum, value, index) => sum + value * second[index][column],
        0,
      ),
    ),
  );
}

/** Returns a new matrix with rows and columns exchanged. */
export function matrixTranspose(matrix: Matrix): number[][] {
  const { rows, columns } = matrixDimensions(matrix);
  return Array.from({ length: columns }, (_, column) =>
    Array.from({ length: rows }, (_, row) => matrix[row][column]),
  );
}

/** Computes a square matrix determinant using pivoted elimination. */
export function matrixDeterminant(
  matrix: Matrix,
  epsilon = DEFAULT_EPSILON,
): number {
  validateSquareMatrix(matrix, 'Matrix determinant');
  const size = matrix.length;
  const working = matrix.map((row) => [...row]);
  let determinant = 1;

  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(working[row][column]) > Math.abs(working[pivot][column])) {
        pivot = row;
      }
    }
    if (Math.abs(working[pivot][column]) <= epsilon) {
      return 0;
    }
    if (pivot !== column) {
      [working[pivot], working[column]] = [working[column], working[pivot]];
      determinant *= -1;
    }
    const pivotValue = working[column][column];
    determinant *= pivotValue;
    for (let row = column + 1; row < size; row += 1) {
      const factor = working[row][column] / pivotValue;
      for (let current = column + 1; current < size; current += 1) {
        working[row][current] -= factor * working[column][current];
      }
    }
  }
  return determinant;
}

/** Computes the inverse of a non-singular square matrix. */
export function matrixInverse(
  matrix: Matrix,
  epsilon = DEFAULT_EPSILON,
): number[][] {
  validateSquareMatrix(matrix, 'Matrix inverse');
  const size = matrix.length;
  const augmented = matrix.map((row, rowIndex) => [
    ...row,
    ...Array.from({ length: size }, (_, column) => (rowIndex === column ? 1 : 0)),
  ]);

  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) {
        pivot = row;
      }
    }
    if (Math.abs(augmented[pivot][column]) <= epsilon) {
      throw new RangeError('Matrix is singular and cannot be inverted.');
    }
    [augmented[pivot], augmented[column]] = [augmented[column], augmented[pivot]];

    const pivotValue = augmented[column][column];
    augmented[column] = augmented[column].map((value) => value / pivotValue);
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((value, current) =>
        value - factor * augmented[column][current],
      );
    }
  }
  return augmented.map((row) => row.slice(size));
}

/** Multiplies a matrix by a vector. */
export function matrixVectorMultiply(matrix: Matrix, vector: Vector): number[] {
  const { columns } = matrixDimensions(matrix);
  validateVector(vector);
  validateSameVectorDimensions(
    Array<number>(columns).fill(0),
    vector,
    'Matrix-vector multiplication',
  );
  return matrix.map((row) =>
    row.reduce((sum, value, index) => sum + value * vector[index], 0),
  );
}

/** Creates an n by n identity matrix. */
export function identityMatrix(size: number): number[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError('Identity matrix size must be a positive integer.');
  }
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, column) => (row === column ? 1 : 0)),
  );
}

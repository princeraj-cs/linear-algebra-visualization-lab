import type { Matrix, Vector } from './types';

export function validateVector(vector: Vector, name = 'Vector'): void {
  if (!Array.isArray(vector) || vector.length === 0) {
    throw new TypeError(`${name} must be a non-empty array.`);
  }

  if (!vector.every((value) => Number.isFinite(value))) {
    throw new TypeError(`${name} must contain only finite numbers.`);
  }
}

export function validateSameVectorDimensions(
  first: Vector,
  second: Vector,
  operation: string,
): void {
  if (first.length !== second.length) {
    throw new RangeError(`${operation} requires vectors with equal dimensions.`);
  }
}

export function validateMatrix(matrix: Matrix, name = 'Matrix'): void {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError(`${name} must be a non-empty array.`);
  }

  if (
    !matrix.every(
      (row) =>
        Array.isArray(row) &&
        row.length > 0 &&
        row.every((value) => Number.isFinite(value)),
    )
  ) {
    throw new TypeError(
      `${name} must be a non-empty rectangular array of finite numbers.`,
    );
  }

  const columnCount = matrix[0].length;
  if (!matrix.every((row) => row.length === columnCount)) {
    throw new RangeError(`${name} must be rectangular.`);
  }
}

export function matrixDimensions(matrix: Matrix): {
  rows: number;
  columns: number;
} {
  validateMatrix(matrix);
  return { rows: matrix.length, columns: matrix[0].length };
}

export function validateSquareMatrix(matrix: Matrix, operation: string): void {
  const { rows, columns } = matrixDimensions(matrix);
  if (rows !== columns) {
    throw new RangeError(`${operation} requires a square matrix.`);
  }
}

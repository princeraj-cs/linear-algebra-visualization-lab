import { describe, expect, it } from 'vitest';
import {
  identityMatrix,
  matrixAdd,
  matrixDeterminant,
  matrixInverse,
  matrixMultiply,
  matrixSubtract,
  matrixTranspose,
  matrixVectorMultiply,
} from './matrix';

describe('matrix operations', () => {
  it('adds and subtracts matrices without mutating inputs', () => {
    const first = [[1, -2], [3, 4]];
    const second = [[5, 6], [-7, 8]];
    expect(matrixAdd(first, second)).toEqual([[6, 4], [-4, 12]]);
    expect(matrixSubtract(first, second)).toEqual([[-4, -8], [10, -4]]);
    expect(first).toEqual([[1, -2], [3, 4]]);
  });

  it('multiplies compatible rectangular matrices', () => {
    expect(matrixMultiply([[1, 2, 3]], [[4], [5], [6]])).toEqual([[32]]);
    expect(matrixMultiply([[1, 2], [3, 4]], [[5, 6, 7], [8, 9, 10]])).toEqual([
      [21, 24, 27],
      [47, 54, 61],
    ]);
  });

  it('transposes matrices and multiplies them by vectors', () => {
    expect(matrixTranspose([[1, 2, 3], [4, 5, 6]])).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
    expect(matrixVectorMultiply([[1, 2], [3, 4]], [5, 6])).toEqual([17, 39]);
  });

  it('calculates determinants with pivoting and floating-point tolerance', () => {
    expect(matrixDeterminant([[4, 7], [2, 6]])).toBeCloseTo(10);
    expect(matrixDeterminant([[0, 1], [2, 3]])).toBeCloseTo(-2);
    expect(matrixDeterminant([[1, 2], [2, 4]])).toBe(0);
  });

  it('inverts non-singular matrices', () => {
    const inverse = matrixInverse([[4, 7], [2, 6]]);
    expect(inverse[0][0]).toBeCloseTo(0.6);
    expect(inverse[0][1]).toBeCloseTo(-0.7);
    expect(inverse[1][0]).toBeCloseTo(-0.2);
    expect(inverse[1][1]).toBeCloseTo(0.4);
    const product = matrixMultiply([[4, 7], [2, 6]], inverse);
    expect(product[0][0]).toBeCloseTo(1);
    expect(product[0][1]).toBeCloseTo(0);
    expect(product[1][0]).toBeCloseTo(0);
    expect(product[1][1]).toBeCloseTo(1);
  });

  it('creates identity matrices', () => {
    expect(identityMatrix(3)).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it('rejects invalid, non-square, singular, and incompatible matrices', () => {
    expect(() => matrixAdd([[1]], [[1, 2]])).toThrow(RangeError);
    expect(() => matrixMultiply([[1, 2]], [[1, 2]])).toThrow(RangeError);
    expect(() => matrixVectorMultiply([[1, 2]], [1])).toThrow(RangeError);
    expect(() => matrixDeterminant([[1, 2, 3], [4, 5, 6]])).toThrow(RangeError);
    expect(() => matrixInverse([[1, 2], [2, 4]])).toThrow(RangeError);
    expect(() => matrixTranspose([[1, 2], [3]])).toThrow(RangeError);
    expect(() => identityMatrix(0)).toThrow(RangeError);
    expect(() => matrixAdd([[1, Infinity]], [[1, 2]])).toThrow(TypeError);
  });
});

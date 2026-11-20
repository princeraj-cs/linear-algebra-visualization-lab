import { describe, expect, it } from 'vitest';
import {
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

describe('vector operations', () => {
  it('adds and subtracts vectors without mutating inputs', () => {
    const first = [1, -2, 3];
    const second = [4, 5, -6];
    expect(vectorAdd(first, second)).toEqual([5, 3, -3]);
    expect(vectorSubtract(first, second)).toEqual([-3, -7, 9]);
    expect(first).toEqual([1, -2, 3]);
    expect(second).toEqual([4, 5, -6]);
  });

  it('scales vectors and calculates dot products', () => {
    expect(scalarMultiply(-2, [1, -3])).toEqual([-2, 6]);
    expect(dotProduct([1, -2, 3], [4, 5, -6])).toBe(-24);
  });

  it('calculates magnitudes and normalizes vectors', () => {
    expect(vectorMagnitude([3, 4])).toBe(5);
    expect(vectorNormalize([3, 4])).toEqual([0.6, 0.8]);
  });

  it('calculates angles with floating-point clamping', () => {
    expect(vectorAngle([1, 0], [0, 1])).toBeCloseTo(Math.PI / 2);
    expect(vectorAngle([1, 0], [1, 1e-12])).toBeCloseTo(0);
  });

  it('projects one vector onto another', () => {
    expect(vectorProjection([3, 4], [1, 0])).toEqual([3, 0]);
  });

  it('calculates linear combinations', () => {
    expect(vectorLinearCombination([2, -1], [[1, 2], [3, 4]])).toEqual([-1, 0]);
  });

  it('rejects invalid dimensions and undefined zero-vector operations', () => {
    expect(() => vectorAdd([1], [1, 2])).toThrow(RangeError);
    expect(() => vectorNormalize([0, 0])).toThrow(RangeError);
    expect(() => vectorAngle([0], [1])).toThrow(RangeError);
    expect(() => vectorProjection([1], [0])).toThrow(RangeError);
    expect(() => vectorLinearCombination([1], [[1], [2]])).toThrow(RangeError);
    expect(() => vectorAdd([1, Number.NaN], [1, 2])).toThrow(TypeError);
  });
});

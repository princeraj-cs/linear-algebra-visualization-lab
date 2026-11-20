import { DEFAULT_EPSILON } from './constants';
import {
  validateSameVectorDimensions,
  validateVector,
} from './validation';
import type { Vector } from './types';

/** Adds two vectors component by component. */
export function vectorAdd(first: Vector, second: Vector): number[] {
  // UI components and SVG coordinates must import these validated calculations instead of reimplementing them.
  validateVector(first, 'First vector');
  validateVector(second, 'Second vector');
  validateSameVectorDimensions(first, second, 'Vector addition');
  return first.map((value, index) => value + second[index]);
}

/** Subtracts the second vector from the first component by component. */
export function vectorSubtract(first: Vector, second: Vector): number[] {
  validateVector(first, 'First vector');
  validateVector(second, 'Second vector');
  validateSameVectorDimensions(first, second, 'Vector subtraction');
  return first.map((value, index) => value - second[index]);
}

/** Multiplies every vector component by a scalar. */
export function scalarMultiply(scalar: number, vector: Vector): number[] {
  if (!Number.isFinite(scalar)) {
    throw new TypeError('Scalar must be a finite number.');
  }
  validateVector(vector);
  return vector.map((value) => scalar * value);
}

/** Returns the Euclidean inner product of two vectors. */
export function dotProduct(first: Vector, second: Vector): number {
  validateVector(first, 'First vector');
  validateVector(second, 'Second vector');
  validateSameVectorDimensions(first, second, 'Dot product');
  return first.reduce((sum, value, index) => sum + value * second[index], 0);
}

/** Returns the Euclidean length of a vector. */
export function vectorMagnitude(vector: Vector): number {
  validateVector(vector);
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

/**
 * Returns a unit vector in the same direction.
 * A zero vector has no direction and therefore raises a RangeError.
 */
export function vectorNormalize(vector: Vector, epsilon = DEFAULT_EPSILON): number[] {
  validateVector(vector);
  const magnitude = vectorMagnitude(vector);
  if (magnitude <= epsilon) {
    throw new RangeError('A zero vector cannot be normalized.');
  }
  return vector.map((value) => value / magnitude);
}

/**
 * Returns the angle between two vectors in radians, in the range [0, pi].
 * Angles involving a zero vector are undefined and raise a RangeError.
 */
export function vectorAngle(
  first: Vector,
  second: Vector,
  epsilon = DEFAULT_EPSILON,
): number {
  const firstMagnitude = vectorMagnitude(first);
  const secondMagnitude = vectorMagnitude(second);
  validateSameVectorDimensions(first, second, 'Vector angle');
  if (firstMagnitude <= epsilon || secondMagnitude <= epsilon) {
    throw new RangeError('The angle involving a zero vector is undefined.');
  }

  const cosine = dotProduct(first, second) / (firstMagnitude * secondMagnitude);
  return Math.acos(Math.max(-1, Math.min(1, cosine)));
}

/** Projects a vector onto a non-zero direction vector. */
export function vectorProjection(
  vector: Vector,
  onto: Vector,
  epsilon = DEFAULT_EPSILON,
): number[] {
  const denominator = dotProduct(onto, onto);
  validateSameVectorDimensions(vector, onto, 'Vector projection');
  if (denominator <= epsilon * epsilon) {
    throw new RangeError('Cannot project onto a zero vector.');
  }
  return scalarMultiply(dotProduct(vector, onto) / denominator, onto);
}

/**
 * Computes c1*v1 + c2*v2 + ... for a shared vector dimension.
 */
export function vectorLinearCombination(
  coefficients: readonly number[],
  vectors: readonly Vector[],
): number[] {
  if (
    !Array.isArray(coefficients) ||
    coefficients.length === 0 ||
    coefficients.length !== vectors.length ||
    !coefficients.every((value) => Number.isFinite(value))
  ) {
    throw new RangeError(
      'Linear combination requires one finite coefficient per vector.',
    );
  }
  vectors.forEach((vector, index) => validateVector(vector, `Vector ${index + 1}`));
  const dimension = vectors[0].length;
  if (!vectors.every((vector) => vector.length === dimension)) {
    throw new RangeError('Linear combination requires equal vector dimensions.');
  }

  return vectors.reduce<number[]>(
    (result, vector, index) =>
      result.map((value, component) => value + coefficients[index] * vector[component]),
    Array<number>(dimension).fill(0),
  );
}

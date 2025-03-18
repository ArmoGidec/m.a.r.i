import type { Position } from '@core';

const MULTIPLICATOR = 0.8; // just founded

const calcPoisitionValue = (old: number, next: number) =>
  next - Math.sign(next - old) * MULTIPLICATOR;

export const calcCollisionPosition = (
  oldPosition: Position,
  nextPosition: Position,
): Position => {  
  return {
    x: calcPoisitionValue(oldPosition.x, nextPosition.x),
    y: calcPoisitionValue(oldPosition.y, nextPosition.y),
  };
};

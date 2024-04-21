import { Direction } from '@core';

const DIRECTION_MAPPER = {
  [Direction.Down]: 0,
  [Direction.Left]: 90,
  [Direction.Right]: -90,
  [Direction.Up]: 180,
} as const;

type RotationValue = typeof DIRECTION_MAPPER[keyof typeof DIRECTION_MAPPER];

export const getRotate = (direction: Direction): `${RotationValue}deg` =>
  `${DIRECTION_MAPPER[direction]}deg`;

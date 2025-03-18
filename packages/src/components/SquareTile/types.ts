import type { Direction, Square } from '@core';

interface StartTileProps {
  type: 'start',
  direction: Direction,
}

interface CommonTileProps {
  type: Square,
  direction?: never,
}

export type SquareTileProps = CommonTileProps | StartTileProps;

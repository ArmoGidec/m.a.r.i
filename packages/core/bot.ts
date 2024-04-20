import { Direction } from './direction';

export interface Bot {
  position: {
    x: number,
    y: number,
  },
  direction: Direction,
}

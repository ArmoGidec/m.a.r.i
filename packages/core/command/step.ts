import type { BotPosition } from '../bot';
import { Direction } from '../direction';
import type { Position } from '../position';
import { Command } from './command';

const STEP_MAPPER: Record<Direction, (pos: Position, amount: number) => Position> = {
  [Direction.Down]: ({ x, y }, amount) => ({
    x,
    y: y + amount,
  }),

  [Direction.Left]: ({ x, y }, amount) => ({
    x: x - amount,
    y,
  }),

  [Direction.Right]: ({ x, y }, amount) => ({
    x: x + amount,
    y,
  }),

  [Direction.Up]: ({ x, y }, amount) => ({
    x,
    y: y - amount,
  }),
};

const makeStep = (dir: Direction, pos: Position, amount: number): Position => {
  const fn = STEP_MAPPER[dir];
  return fn(pos, amount);
};

export class Step extends Command {
  name = 'step';
  
  move({ direction, position }: BotPosition): BotPosition {
    return {
      direction,
      position: makeStep(direction, position, 1),
    };
  }
}

export class DoubleStep extends Command {
  name = 'doubleStep';

  move({ direction, position }: BotPosition): BotPosition {
    return {
      direction,
      position: makeStep(direction, position, 2),
    };
  }
}

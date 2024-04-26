import type { BotPosition } from './bot';
import type { Command } from './command';
import { Square } from './square';

export class Level {
  constructor(
    public readonly id: number,
    public readonly map: Square[][],
    public readonly commands: Command[],
    public readonly startPosition: BotPosition,
  ) {}

  getSquare(x: number, y: number) {
    return this.map[y - 1][x - 1];
  }
}

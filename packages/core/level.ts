import { Square } from './square';
import { Command } from './command';

export class Level {
  constructor(
    private readonly map: Square[][],
    private readonly commands: Command[],
  ) {}

  getCommands() {
    return this.commands;
  }

  getSquare(x: number, y: number) {
    return this.map[y][x];
  }
}

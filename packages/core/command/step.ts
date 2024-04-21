import type { BotPosition } from '../bot';
import type { Command } from './command';

export class Step implements Command {
  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

export class DoubleStep implements Command {
  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

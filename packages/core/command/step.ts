import type { BotPosition } from '../bot';
import type { Command } from './command';

export class Step implements Command {
  name = 'step';
  
  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

export class DoubleStep implements Command {
  name = 'doubleStep';

  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

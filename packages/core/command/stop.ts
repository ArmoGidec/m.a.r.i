import type { BotPosition } from '../bot';
import type { Command } from './command';

export class Stop implements Command {
  name = 'stop';
  
  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

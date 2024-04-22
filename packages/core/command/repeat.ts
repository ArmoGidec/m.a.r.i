import type { BotPosition } from '../bot';
import type { Command } from './command';

export class Repeat implements Command {
  name = 'repeat';
  
  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

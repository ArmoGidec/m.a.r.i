import type { BotPosition } from '../bot';
import { Command } from './command';

export class Repeat extends Command {
  name = 'repeat';
  
  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

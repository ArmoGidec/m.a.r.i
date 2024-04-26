import type { BotPosition } from '../bot';
import { Command } from './command';

export class Stop extends Command {
  name = 'stop';
  
  move(): BotPosition {
    throw new Error('Method not implemented.');
  }
}

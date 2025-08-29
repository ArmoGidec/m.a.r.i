import type { BotPosition } from '../bot';
import { Command } from './command';

export class Repeat extends Command {
  name = 'repeat';
  
  move(bot: BotPosition): BotPosition {
    return { ...bot };
  }
}

import type { BotPosition } from '../bot';
import { Command } from './command';

export class Repeat extends Command {
  name = 'repeat';
  
  exec(bot: BotPosition): BotPosition {
    return { ...bot };
  }
}
